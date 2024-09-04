import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, setCurrentPage, deleteProject } from './features/projectSlice';
import { RootState, AppDispatch } from './store';
import Pagination from './Components/Pagination';
import ProjectScopeGoalsSection from './Components/ProjectDetails/ProjectScopeGoalsSection';
import { BusinessTeamSection, HubTeamSection, RiskSection, BudgetSection } from './Components/ProjectDetails/CategoriesSection';
import MilestonesSection from './Components/Timeline/MilestonesSection';
import { Container, Typography, Box, Grid, Backdrop, CircularProgress, Tooltip, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { StyledEqualContainer } from './Components/styledComponents/styledContainer';
import NewProjectForm from './Components/NewProjectForm';
import AddchartIcon from '@mui/icons-material/Addchart';
import EditIcon from '@mui/icons-material/Edit';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteIcon from '@mui/icons-material/Delete';
import { useReactToPrint } from 'react-to-print';
import './App.css';
import { images } from './Components/Assets/DummyData';
import ProjectHeader from './Components/ProjectDetails/ProjectHeader';
import OverviewSection from './Components/ProjectDetails/OverviewSection';
import NamesMenu from './Components/NamesMenu';

const MainApp: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentPage = useSelector((state: RootState) => state.projects.currentPage);
  const isLoading = useSelector((state: RootState) => state.projects.isLoading);
  const error = useSelector((state: RootState) => state.projects.error);
  const projects = useSelector((state: RootState) => state.projects.projects);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [printMode, setPrintMode] = useState(false);
  const printRef = useRef<HTMLDivElement | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    onAfterPrint: () => setPrintMode(false)
  });

  const handlePrintClick = () => {
    setPrintMode(true);
    setTimeout(() => {
      handlePrint();
    }, 0);
  };

  const handleAddProject = () => {
    setIsEditing(false);
    setIsAddingProject(true);
  };

  const handleCancelAddProject = () => {
    setIsAddingProject(false);
    setIsEditing(false);
  };

  const handleDoneAddProject = async (newProject: any) => {
    console.log('New Project:', newProject);
    setIsAddingProject(false);
    setIsEditing(false);
    await dispatch(fetchProjects());
  };

  const handleDoneEditProject = async () => {
    setIsAddingProject(false);
    setIsEditing(false);
    await dispatch(fetchProjects());
  };

  const handleEditProject = () => {
    setIsEditing(true);
    setIsAddingProject(true);
  };

  const openDeleteDialog = (projectId: number) => {
    setProjectToDelete(projectId);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setProjectToDelete(null);
  };

  const handleDeleteProject = async (projectId: number) => {
    try {
      setIsDeleting(true);
      await dispatch(deleteProject(projectId));
      const updatedProjects = await dispatch(fetchProjects()).unwrap();
      if (updatedProjects.length === 0) {
        dispatch(setCurrentPage(0));
      } else if (currentPage > updatedProjects.length) {
        dispatch(setCurrentPage(updatedProjects.length));
      }
    } catch (error) {
      console.error("Failed to delete the project:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const confirmDeleteProject = () => {
    if (projectToDelete !== null) {
      handleDeleteProject(projectToDelete);
      closeDeleteDialog();
    }
  };

  const convertProjectDatesToString = (project: any) => ({
    ...project,
    startDate: typeof project.startDate === 'string' ? project.startDate : project.startDate.toISOString(),
    endDate: typeof project.endDate === 'string' ? project.endDate : project.endDate.toISOString(),
  });

  const renderProject = (project: any, index?: number) => {
    if (!project) return null;
    return (
      <div key={index} className="pdf-page">
        <Grid>
          <ProjectHeader
            name={project.name}
            code={project.code}
            status={project.status}
            mode="view"
          />

          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Grid>
                <OverviewSection description={project.description} mode="view" />
                <Box />
                <ProjectScopeGoalsSection scopeDescription={project.scope} goals={project.goals} mode="view" />
                <StyledEqualContainer>
                  <BusinessTeamSection
                    sponsor={project.sponsor}
                    businessOwner={project.businessOwner}
                    productOwner={project.productOwner}
                    mode="view" />
                  <HubTeamSection
                    pm={project.pm}
                    deliveryTeam={project.deliveryTeam} mode="view" />
                  <RiskSection risks={project.risks} mode="view" />
                  <BudgetSection 
                  actualBudget={project.actualBudget}
                  allocatedBudget={project.allocatedBudget}
                   roi={project.roi} mode="view" />
                </StyledEqualContainer>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid>
                <MilestonesSection
                  milestones={project.milestones}
                  startDate={project.startDate}
                  endDate={project.endDate}
                />
              </Grid>
            </Grid>
          </Grid>

        </Grid>
        <div className="page-break"></div>
      </div>
    );
  };

  // Render all projects for printing
  const renderAllProjects = () => {
    return projects.map((project, index) => renderProject(project, index));
  };

  const currentProject = projects[currentPage - 1];
  console.log('Current Project:', currentProject);

  let content;

  if (isLoading) {
    content = (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>Loading...</div>
        <CircularProgress />
      </Box>
    );
  } else if (error) {
    content = <Typography>{error}</Typography>;
  } else if (projects.length > 0) {
    if (isAddingProject) {
      content = (
        <NewProjectForm
          onCancel={handleCancelAddProject}
          onDone={handleDoneAddProject}
          onEdit={handleDoneEditProject}
          project={isEditing ? convertProjectDatesToString(currentProject) : undefined}
        />
      );
    } else {
      content = currentProject ? (
        <>
          {renderProject(currentProject)}
          <Box mt={2}>
            <Pagination />
          </Box>
        </>
      ) : (
        <Typography>No projects available</Typography>
      );
    }
  } else {
    content = (
      <div>
        <Typography>No projects available</Typography>
      </div>
    );
  }

  return (
    <Container style={{ minWidth: "100%" }}>
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          top: 10,
          width: '12%',
          height: '8vh',
          backgroundImage: `url(${images[0].imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2}>
        <Tooltip title="Add New Project" arrow>
          <IconButton
            color="primary"
            onClick={handleAddProject}
            disabled={isAddingProject || isEditing}
            size="large"
            sx={{ '&:hover svg': { transform: 'scale(1.2)' }, transition: 'transform 0.3s', color: 'rgba(4, 36, 106, 1)' }}
          >
            <AddchartIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Edit Project" arrow>
          <IconButton
            color="primary"
            onClick={handleEditProject}
            disabled={isAddingProject || isEditing}
            sx={{ '&:hover svg': { transform: 'scale(1.2)' }, transition: 'transform 0.3s', color: 'rgba(4, 36, 106, 1)' }}
            size="large"
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        
        {currentProject && (
          <Tooltip title="Delete Project" arrow>
            <IconButton
              color="error"
              onClick={() => openDeleteDialog(currentProject.id)}
              disabled={isAddingProject || isEditing || isDeleting}
              size="large"
              sx={{ '&:hover svg': { transform: 'scale(1.2)' }, transition: 'transform 0.3s', color: 'rgba(4, 36, 106, 1)' }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="Print" arrow>
          <IconButton
            color="primary"
            onClick={handlePrintClick}
            disabled={isAddingProject || isEditing}
            sx={{ '&:hover svg': { transform: 'scale(1.2)' }, transition: 'transform 0.3s', color: 'rgba(4, 36, 106, 1)' }}
            size="large"
          >
            <PictureAsPdfIcon />
          </IconButton>
        </Tooltip>
        <NamesMenu />
      </Box>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isDeleting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <div ref={printRef} style={{ display: printMode ? 'block' : 'none' }}>
        {renderAllProjects()}
      </div>

      <Box>
        {content}
      </Box>
      <Dialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this project? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDeleteProject} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

    </Container>
  );
};

export default MainApp;