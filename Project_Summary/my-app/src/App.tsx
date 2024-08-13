import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProjects, setCurrentPage } from './store/projectSlice';
import { RootState, AppDispatch } from './store/store';
import Pagination from './Components/Pagination';
import ProjectHeader from './Components/ProjectHeader';
import OverviewSection from './Components/OverviewSection';
import ProjectScopeGoalsSection from './Components/ProjectScopeGoalsSection';
import BusinessTeamSection from './Components/BusinessTeamSection';
import HubTeamSection from './Components/HubTeamSection';
import RiskSection from './Components/RiskSection';
import BudgetSection from './Components/BudgetSection';
import MilestonesSection from './Components/MilestonesSection';
import { Container, Typography, Button, Box, Grid, Backdrop, CircularProgress, Tooltip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import { StyledEqualContainer, StyledContainerBox, StyledMainGridItem, StyledMilestonesGridItem, StyledMainBox } from './Components/styledComponents/styledContainer';
import NewProjectForm from './Components/NewProjectForm';
import DeleteIcon from '@mui/icons-material/Delete';
import AddchartIcon from '@mui/icons-material/Addchart';
import EditIcon from '@mui/icons-material/Edit';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useReactToPrint } from 'react-to-print';
import './App.css';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentPage = useSelector((state: RootState) => state.projects.currentPage);
  const isLoading = useSelector((state: RootState) => state.projects.isLoading);
  const error = useSelector((state: RootState) => state.projects.error);
  const projects = useSelector((state: RootState) => state.projects.projects);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [printMode, setPrintMode] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<number | null>(null);

  const printRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    dispatch(loadProjects());
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
    setIsAddingProject(true);
    setIsEditing(false);
  };

  const handleCancelAddProject = () => {
    setIsAddingProject(false);
    setIsEditing(false);
  };

  const handleDoneAddProject = async (newProject: any) => {
    console.log('New Project:', newProject);
    setIsAddingProject(false);
    setIsEditing(false);
    await dispatch(loadProjects());
  };

  const handleDoneEditProject = async () => {
    setIsAddingProject(false);
    setIsEditing(false);
    await dispatch(loadProjects());
  };

  const handleEditProject = () => {
    setIsEditing(true);
    setIsAddingProject(true);
  };

  const handleDeleteProject = async (projectId: number) => {
    setIsDeleting(true);
    // Implement delete logic here
    dispatch(setCurrentPage(1));
    await dispatch(loadProjects());
    setIsDeleting(false);
    setDeleteDialogOpen(false);
  };

  const openDeleteDialog = (projectId: number) => {
    setProjectToDelete(projectId);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setProjectToDelete(null);
  };

  const confirmDeleteProject = () => {
    if (projectToDelete !== null) {
      handleDeleteProject(projectToDelete);
    }
  };

  const renderProject = (project: any, index?: number) => {
    if (!project) return null;
    return (
      <div key={index} className="pdf-page">
        <StyledMainBox>
          <ProjectHeader 
            name={project.name} 
            code={project.code} 
            status={project.status}
            mode="view" 
          />
          <StyledContainerBox>
            <Grid container spacing={2}>
              <StyledMainGridItem item xs={12} md={8}>
                <StyledMainBox>
                  <OverviewSection overview={project.description} mode="view" />
                  <Box mt={4} />
                  <ProjectScopeGoalsSection scopeDescription={project.scope} goals={project.goals} mode="view" />
                  <StyledEqualContainer>
                    <BusinessTeamSection businessTeam={project.businessTeam} mode="view" />
                    <HubTeamSection hubTeam={project.hubTeam} mode="view" />
                    <RiskSection risks={project.risks} mode="view" />
                    <BudgetSection budget={project.budget} mode="view" />
                  </StyledEqualContainer>
                </StyledMainBox>
              </StyledMainGridItem>
              <StyledMilestonesGridItem item xs={12} md={4}>
                <StyledMainBox>
                  <MilestonesSection
                    milestones={project.milestones}
                    startDate={project.startDate}
                    endDate={project.endDate}
                  />
                </StyledMainBox>
              </StyledMilestonesGridItem>
            </Grid>
          </StyledContainerBox>
        </StyledMainBox>
      </div>
    );
  };

  const currentProject = projects[currentPage - 1];
  console.log('Current Project:', currentProject);

  let content;

  if (isLoading) {
    content = <Typography>Loading...</Typography>;
  } else if (error) {
    content = <Typography>{error}</Typography>;
  } else if (projects.length > 0) {
    if (isAddingProject) {
      content = (
        <NewProjectForm 
          onCancel={handleCancelAddProject} 
          onDone={handleDoneAddProject} 
          onEdit={handleDoneEditProject}
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
        <Pagination />
      </div>
    );
  }

  return (
    <Container>
      <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2}>
      <Tooltip title="Add New Project">
          <IconButton
            color="primary"
            onClick={handleAddProject}
            disabled={isAddingProject || isEditing}
            sx={{ '&:hover svg': { transform: 'scale(1.2)' }, transition: 'transform 0.3s',color: 'rgba(4, 36, 106, 1)' }}
          >
            <AddchartIcon />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Edit Project">
          <IconButton
            color="primary"
            onClick={handleEditProject}
            disabled={isAddingProject || isEditing}
            sx={{ '&:hover svg': { transform: 'scale(1.2)' }, transition: 'transform 0.3s',color: 'rgba(4, 36, 106, 1)' }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Print">
          <IconButton
            color="primary"
            onClick={handlePrintClick}
            disabled={isAddingProject || isEditing}
            sx={{ '&:hover svg': { transform: 'scale(1.2)' }, transition: 'transform 0.3s',color: 'rgba(4, 36, 106, 1)' }}
          >
            <PictureAsPdfIcon />
          </IconButton>
        </Tooltip>
      </Box>
      
      {isDeleting && (
        <Backdrop open>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <div ref={printRef}>
        {printMode ? (
          <div>
            {projects.map((project, index) => (
              <div key={index}>
                {renderProject(project)}
                <div className="page-break" />
              </div>
            ))}
          </div>
        ) : (
          content
        )}
      </div>

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

export default App;