import React, { useState } from "react";
import { Button, TextField, Box, FormControlLabel, Grid, FormControl, InputLabel, CircularProgress, Backdrop, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { addNewProjectService, updateProjectService, deleteProjectGoalService, deleteProjectRiskService, deleteProjectMilestoneService } from "./projectService";
import ProjectHeader from "./ProjectHeader";
import OverviewSection from "./OverviewSection";
import ProjectScopeGoalsSection from "./ProjectScopeGoalsSection";
import { StyledEqualContainer, StyledMilestoneContainer } from "./styledComponents/styledContainer";
import { BusinessTeamSection, HubTeamSection, RiskSection, BudgetSection } from "./BusinessTeamSection";
import { FieldArray } from "react-final-form-arrays";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import validateProjectForm from './Validation/projectValidator';
import { Project } from './Validation/Type';

interface NewProjectFormProps {
  onCancel: () => void;
  onDone: (newProject: Project) => void;
  onEdit: () => void;
  project?: Project;
}

const NewProjectForm: React.FC<NewProjectFormProps> = ({
  onCancel,
  onDone,
  onEdit,
  project,
}) => {
  const initialValues: Project = project || {
    id: 0,
    name: "",
    code: "",
    description: "",
    status: "",
    scope: "",
    goals: [""],
    businessTeam: {
      sponsor: "",
      businessOwner: "",
      productOwner: "",
    },
    hubTeam: {
      pm: "",
      dev: "",
    },
    risks: [""],
    roi: "",
    budget: {
      actual: 0,
      planned: 0,
    },
    startDate: new Date(),
    endDate: new Date(),
    milestones: [],
  };

  const [goalsToRemove, setGoalsToRemove] = useState<number[]>([]);
  const [risksToRemove, setRisksToRemove] = useState<number[]>([]);
  const [milestonesToRemove, setMilestonesToRemove] = useState<number[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSubmit = async (values: Project) => {
    console.log('values', values);
    
    try {
      if (!project) {
        // Create a new project
        const newProject = await addNewProjectService(values);
        onDone(newProject);
      } else {
        // Update an existing project
        await updateProjectService(values.id, values);
        for (const goalId of goalsToRemove) {
          await deleteProjectGoalService(values.id, goalId);
        }
        for (const riskId of risksToRemove) {
          await deleteProjectRiskService(values.id, riskId);
        }
        for (const milestoneId of milestonesToRemove) {
          await deleteProjectMilestoneService(values.id, milestoneId);
        }
        onEdit();
      }
    } catch (error) {
      console.error("Error handling project data:", error);
    } 
  };

  const handleOpenDialog = (isUpdate: boolean) => {
    setIsUpdating(isUpdate);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirm = async (values: Project) => {
    await handleSubmit(values);
    handleCloseDialog();
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validate={validateProjectForm}
        mutators={{ ...arrayMutators }}
        render={({ handleSubmit, submitting, pristine, values }) => {
          console.log('pristine', pristine);
          const isFormValid = Object.values(values).every(value => value !== "" && value !== undefined);
          return (
            <form onSubmit={(e) => {
              e.preventDefault();
              handleOpenDialog(!!project); // Open dialog for update if project exists
            }}>
              <Grid>
                <ProjectHeader
                  name={initialValues.name}
                  code={initialValues.code}
                  status={initialValues.status}
                  mode="edit"
                />
                <Grid container spacing={2}>
                  <Grid item xs={12} md={8}>
                    <Grid>
                      <OverviewSection
                        description={initialValues.description}
                        mode="edit"
                      />
                      <Box mt={4} />
                      <FieldArray name="goals">
                        {({ fields }) => (
                          <ProjectScopeGoalsSection
                            scopeDescription={initialValues.scope}
                            goals={fields.value}
                            mode="edit"
                            addGoalField={() => fields.push("")}
                            removeGoalField={(index) => {
                              const goalId = fields.value[index].id;
                              if (goalId)
                                setGoalsToRemove([...goalsToRemove, goalId]);
                              fields.remove(index);
                            }}
                          />
                        )}
                      </FieldArray>

                      <StyledEqualContainer>
                        <BusinessTeamSection
                          businessTeam={initialValues.businessTeam}
                          mode="edit"
                        />
                        <HubTeamSection
                          hubTeam={initialValues.hubTeam}
                          mode="edit"
                        />
                        <FieldArray name="risks">
                          {({ fields }) => (
                            <RiskSection
                              risks={fields.value}
                              mode="edit"
                              addRiskField={() => fields.push("")}
                              removeRisk={(index) => {
                                const riskId = fields.value[index].id;
                                if (riskId)
                                  setRisksToRemove([...risksToRemove, riskId]);
                                fields.remove(index);
                              }}
                            />
                          )}
                        </FieldArray>

                        <BudgetSection
                          budget={initialValues.budget}
                          roi={initialValues.roi}
                          mode="edit"
                        />
                      </StyledEqualContainer>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <StyledMilestoneContainer>
                      <Field name="startDate">
                        {({ input, meta }) => (
                          <FormControl fullWidth margin="normal">
                            <InputLabel shrink htmlFor="startDate">
                              Start Date
                            </InputLabel>
                            <TextField
                              {...input}
                              type="date"
                              fullWidth
                              error={meta.touched && meta.error}
                              helperText={meta.touched && meta.error}
                            />
                          </FormControl>
                        )}
                      </Field>
                      <Field name="endDate">
                        {({ input, meta }) => (
                          <FormControl fullWidth margin="normal">
                            <InputLabel shrink htmlFor="endDate">
                              End Date
                            </InputLabel>
                            <TextField
                              {...input}
                              type="date"
                              fullWidth
                              error={meta.touched && meta.error}
                              helperText={meta.touched && meta.error}
                            />
                          </FormControl>
                        )}
                      </Field>
                      <FieldArray name="milestones">
                        {({ fields }) => (
                          <>
                            {fields.map((name, index) => (
                              <Box key={index} mt={2} >
                                <Field name={`${name}.title`}>
                                  {({ input, meta }) => (
                                    <FormControl fullWidth margin="normal">
                                      <TextField
                                        {...input}
                                        label="Title"
                                        fullWidth
                                        error={meta.touched && meta.error}
                                        helperText={meta.touched && meta.error}
                                      />
                                    </FormControl>
                                  )}
                                </Field>
                                <Field name={`${name}.description`}>
                                  {({ input, meta }) => (
                                    <FormControl fullWidth margin="normal">
                                      <TextField
                                        {...input}
                                        label="Description"
                                        fullWidth
                                        error={meta.touched && meta.error}
                                        helperText={meta.touched && meta.error}
                                      />
                                    </FormControl>
                                  )}
                                </Field>
                                <Field name={`${name}.date`}>
                                  {({ input, meta }) => (
                                    <FormControl fullWidth margin="normal">
                                      <TextField
                                        {...input}
                                        type="date"
                                        label="Date"
                                        fullWidth
                                        error={meta.touched && meta.error}
                                        helperText={meta.touched && meta.error}
                                      />
                                    </FormControl>
                                  )}
                                </Field>
                                <FormControlLabel
                                  control={
                                    <Field
                                      name={`${name}.currentFlag`}
                                      component="input"
                                      type="checkbox"
                                    />
                                  }
                                  label="Current State"
                                />
                                <Button
                                  variant="contained"
                                  color='error'
                                  sx={{
                                    '&:hover': {
                                      backgroundColor: 'rgba(226, 1, 1, 1)',  
                                      boxShadow: '0 4px 8px rgba(4, 36, 106, 1)',  
                                    },
                                  }}
                                  onClick={() => {
                                    const milestoneId = fields.value[index].id;
                                    if (milestoneId)
                                      setMilestonesToRemove([
                                        ...milestonesToRemove,
                                        milestoneId,
                                      ]);
                                    fields.remove(index);
                                  }}
                                >
                                  Remove Milestone
                                </Button>
                              </Box>
                            ))}
                            <IconButton
                              color="primary"
                              onClick={() =>
                                fields.push({
                                  title: "",
                                  description: "",
                                  date: "",
                                  currentFlag: false,
                                })
                              }
                            >
                              <AddCircleOutlineIcon />
                            </IconButton>
                          </>
                        )}
                      </FieldArray>
                    </StyledMilestoneContainer>
                  </Grid>
                </Grid>
              </Grid>
              <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
                <div style={{ position: 'relative' }}>
                  <Button
                    color="primary"
                    onClick={onCancel}
                    sx={{
                      "&:hover": { transform: "scale(1.2)" },
                      transition: "transform 0.3s",
                    }}
                  >
                    Cancel
                  </Button>
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  type="button" // Change to button to prevent immediate submission
                  onClick={() => handleOpenDialog(!!project)} // Open dialog
                  disabled={submitting || pristine }
                >
                  {submitting ? "Submitting..." : project ? "Update Project" : "Add Project"}
                </Button>
              </Box>
              {submitting && (
                <Backdrop open={submitting}>
                  <CircularProgress color="inherit" />
                </Backdrop>
              )}
            </form>
          );
        }}
      />
      
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{isUpdating ? "Confirm Update" : "Confirm Addition"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isUpdating ? "Are you sure you want to update the project details?" : "Are you sure you want to add this project?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleConfirm(initialValues)} color="primary">
            {isUpdating ? "Submit" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NewProjectForm;