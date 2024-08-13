import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, deleteProject, setCurrentPage } from './store/projectSlice';
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
import { Container, Typography, Button, Box, Grid, Backdrop, CircularProgress, Tooltip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, IconButton,SelectChangeEvent } from '@mui/material';
import { 
  StyledEqualContainer, 
  StyledContainerBox, 
  StyledMainGridItem, 
  StyledMilestonesGridItem, 
  StyledMainBox 
} from './Components/styledComponents/styledContainer';
import NewProjectForm from './Components/NewProjectForm';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useReactToPrint } from 'react-to-print';
import { StyledSelect, StyledMenuItem } from './Components/styledComponents/styledControl';
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
    dispatch(fetchProjects());
  }, [dispatch]);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    onAfterPrint: () => setPrintMode(false)  });

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

  const handleDeleteProject = async (projectId: number) => {
    setIsDeleting(true);
    await dispatch(deleteProject(projectId));
    dispatch(setCurrentPage(1));
    await dispatch(fetchProjects());
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

  const handleProjectSelect = (event: SelectChangeEvent<unknown>) => {
    const selectedProjectId = event.target.value as number;
    const selectedProjectIndex = projects.findIndex(project => project.id === selectedProjectId);
    if (selectedProjectIndex !== -1) {
      dispatch(setCurrentPage(selectedProjectIndex + 1));
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
                  <OverviewSection overview={project.overview} mode="view" />
                  <Box mt={4} />
                  <ProjectScopeGoalsSection scopeDescription={project.scope_description} goals={project.goals} mode="view" />
                  <StyledEqualContainer>
                    <BusinessTeamSection businessTeams={project.business_teams} mode="view" />
                    <HubTeamSection hubTeams={project.hub_teams} mode="view" />
                    <RiskSection risks={project.risks} mode="view" />
                    <BudgetSection budgets={project.budgets} mode="view" />
                  </StyledEqualContainer>
                </StyledMainBox>
              </StyledMainGridItem>
              <StyledMilestonesGridItem item xs={12} md={4}>
                <StyledMainBox>
                  <MilestonesSection
                    milestones={project.milestones}
                    startDate={project.start_date}
                    endDate={project.end_date}
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
          project={isEditing ? currentProject : undefined}
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
      <FormControl variant="outlined" sx={{ minWidth: 240, mr: 2 }}>
      <InputLabel id="project-select-label">Go to Project</InputLabel>
          <StyledSelect
            labelId="project-select-label"
            id="project-select"
            value={currentProject?.id || ''}
            onChange={handleProjectSelect}
            label="Go to Project"
          >
            {projects.map((project) => (
              <StyledMenuItem 
                key={project.id} 
                value={project.id}
              >
                {project.name}
              </StyledMenuItem>
            ))}
          </StyledSelect>
        </FormControl>

        <Tooltip title="Print">
          <IconButton
            color="primary"
            onClick={handlePrintClick}
            disabled={isAddingProject || isEditing}
          >
            <PictureAsPdfIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit Project">
          <IconButton
            color="primary"
            onClick={handleEditProject}
            disabled={isAddingProject || isEditing}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Add New Project">
          <IconButton
            color="primary"
            onClick={handleAddProject}
            disabled={isAddingProject || isEditing}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Project">
          <IconButton
            color="error"
            onClick={() => openDeleteDialog(currentProject?.id)}
            disabled={isAddingProject || isEditing}
          >
            <DeleteIcon />
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