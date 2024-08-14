import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  FormControlLabel,
  Grid,
  FormControl,
  InputLabel,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
import {
  addNewProjectService,
  addProjectGoalsService,
  addProjectRisksService,
  addProjectBusinessTeamService,
  addProjectHubTeamService,
  addProjectBudgetService,
  addProjectMilestoneService,
  updateProjectService,
  updateProjectGoalsService,
  updateProjectRisksService,
  updateProjectBusinessTeamService,
  updateProjectHubTeamService,
  updateProjectBudgetService,
  updateProjectMilestoneService,
  deleteProjectGoalService,
  deleteProjectRiskService,
  deleteProjectMilestoneService,
} from "./projectService";
import ProjectHeader from "./ProjectHeader";
import OverviewSection from "./OverviewSection";
import ProjectScopeGoalsSection from "./ProjectScopeGoalsSection";
import BusinessTeamSection from "./BusinessTeamSection";
import RiskSection from "./RiskSection";
import BudgetSection from "./BudgetSection";
import {
  StyledEqualContainer,
  StyledContainerBox,
  StyledMainGridItem,
  StyledMilestonesGridItem,
  StyledMainBox,
  StyledMilestoneContainer,
} from "./styledComponents/styledContainer";
import HubTeamSection from "./HubTeamSection";
import { FieldArray } from "react-final-form-arrays";
// import validateProjectForm from "./Validation/ValidationProjectForm";

// Define the types according to your structure
type BusinessTeam = {
  sponsor: string;
  businessOwner: string;
  productOwner: string;
};

type HubTeam = {
  pm: string;
  dev: string;
  ba: string;
  qa?: string;
};

type Budget = {
  actual?: number;
  planned?: number;
};

type Milestone = {
  title: string;
  description: string;
  date: string;
  currentFlag: boolean;
};

type Project = {
  id: number;
  name: string;
  code: string;
  status: string;
  description: string;
  scope: string;
  goals: string[];
  businessTeam: BusinessTeam;
  hubTeam: HubTeam;
  risks: string[];
  roi: string;
  budget: Budget;
  startDate: string;
  endDate: string;
  milestones: Milestone[];
};

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const initialValues: Project = project || {
    id: 0,
    name: "",
    code: "",
    status: "",
    description: "",
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
      ba: "",
      qa: "",
    },
    risks: [""],
    roi: "",
    budget: {
      actual: 0,
      planned: 0,
    },
    startDate: "",
    endDate: "",
    milestones: [],
  };

  const [goalsToRemove, setGoalsToRemove] = useState<number[]>([]);
  const [risksToRemove, setRisksToRemove] = useState<number[]>([]);
  const [milestonesToRemove, setMilestonesToRemove] = useState<number[]>([]);

  const handleSubmit = async (values: Project) => {
    setIsSubmitting(true);
    try {
      console.log("Submitting project data:", values);

      if (!project) {
        // Create a new project
        const newProject = await addNewProjectService(values);
        // await addProjectGoalsService(newProject.id, values.goals);
        // await addProjectRisksService(newProject.id, values.risks);
        // await addProjectBusinessTeamService(newProject.id, values.businessTeam);
        // await addProjectHubTeamService(newProject.id, values.hubTeam);
        // await addProjectBudgetService(newProject.id, values.budget);
        // for (const milestone of values.milestones) {
        //   await addProjectMilestoneService(newProject.id, milestone);
        // }
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={initialValues}
      
      mutators={{ ...arrayMutators }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <StyledMainBox>
            <ProjectHeader
              name={initialValues.name}
              code={initialValues.code}
              status={initialValues.status}
              mode="edit"
            />
            <StyledContainerBox>
              <Grid container spacing={2}>
                <StyledMainGridItem item xs={12} md={8}>
                  <StyledMainBox>
                    <OverviewSection
                      overview={initialValues.description}
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
                  </StyledMainBox>
                </StyledMainGridItem>
                <StyledMilestonesGridItem item xs={12} md={4}>
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
                            <Box key={index} mt={2}>
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
                              <Button
                                variant="contained"
                                color="secondary"
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
                          <Button
                            variant="contained"
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
                            Add Milestone
                          </Button>
                        </>
                      )}
                    </FieldArray>
                  </StyledMilestoneContainer>
                </StyledMilestonesGridItem>
              </Grid>
              <Box mt={4} textAlign="center">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {project ? "Update Project" : "Add Project"}
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={onCancel}
                  style={{ marginLeft: "16px" }}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </Box>
            </StyledContainerBox>
          </StyledMainBox>
          {isSubmitting && (
            <Backdrop open={isSubmitting}>
              <CircularProgress color="inherit" />
            </Backdrop>
          )}
        </form>
      )}
    />
  );
};

export default NewProjectForm;