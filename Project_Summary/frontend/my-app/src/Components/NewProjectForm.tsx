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
import validateProjectForm from "./Validation/ValidationProjectForm";
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

interface NewProjectFormProps {
  onCancel: () => void;
  onDone: (newProject: Project) => void;
  onEdit: () => void;
  project?: Project;
}

export type Project = {
  id: number;
  name: string;
  code: string;
  overview: string;
  status: string;
  start_date: string;
  end_date: string;
  scope_description: string;
  goals: Array<{ id: number; goal: string }>;
  risks: { id: number; risk_issue: string }[];
  business_teams: BusinessTeam[];
  hub_teams: HubTeam[];
  budgets: Budget[];
  milestones: {
    id?: number;
    title: string;
    description: string;
    date: string;
    is_current_state: boolean;
  }[];
};

type BusinessTeam = {
  id: number;
  executive_sponsor: string;
  business_product: string;
  process_owner: string;
};

type HubTeam = {
  id: number;
  pm: string;
  dev_team: string[];
};

type Budget = {
  id: number;
  actual_budget: number;
  planned_budget: number;
};

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
    overview: "",
    status: "",
    start_date: "",
    end_date: "",
    scope_description: "",
    goals: [{ id: 0, goal: "" }],
    risks: [{ id: 0, risk_issue: "" }],
    business_teams: [
      { id: 0, executive_sponsor: "", business_product: "", process_owner: "" },
    ],
    hub_teams: [{ id: 0, pm: "", dev_team: [""] }],
    budgets: [{ id: 0, actual_budget: 0, planned_budget: 0 }],
    milestones: [],
  };
  const [goalsToRemove, setGoalsToRemove] = useState<number[]>([]);
  const [risksToRemove, setRisksToRemove] = useState<number[]>([]);
  const [milestonesToRemove, setMilestonesToRemove] = useState<number[]>([]);

  const handleSubmit = async (values: Project) => {
    setIsSubmitting(true);
    try {
      const goalStrings = values.goals.map((goal) =>
        typeof goal === "string" ? goal : goal.goal
      );
      const updatedValues = { ...values, goals: goalStrings };

      console.log("Submitting project data:", updatedValues);

      if (!project) {
        const newProject = await addNewProjectService(updatedValues);
        console.log("New project created:", newProject);

        await addProjectGoalsService(newProject.id, goalStrings);
        await addProjectRisksService(
          newProject.id,
          values.risks.map((risk) => risk.risk_issue)
        );

        for (const team of values.business_teams) {
          await addProjectBusinessTeamService(newProject.id, team);
        }

        for (const hubTeam of values.hub_teams) {
          await addProjectHubTeamService(newProject.id, hubTeam);
        }

        for (const budget of values.budgets) {
          await addProjectBudgetService(newProject.id, budget);
        }

        for (const milestone of values.milestones) {
          await addProjectMilestoneService(newProject.id, milestone);
        }

        console.log(
          "Project, goals, risks, teams, budgets, and milestones added successfully:",
          newProject
        );
        onDone(newProject);
      } else {
        // Updating an existing project
        await updateProjectService(updatedValues.id, updatedValues);

        console.log("Business teams to update:", updatedValues.business_teams);
        const existingGoalIds = project.goals.map((goal) => goal.id);
        const newGoals = values.goals.filter(
          (goal) => !existingGoalIds.includes(goal.id)
        );

        if (newGoals.length > 0) {
          await addProjectGoalsService(
            updatedValues.id,
            newGoals.map((goal) => goal.goal)
          );
        }
        for (const goal of values.goals) {
          await updateProjectGoalsService(values.id, goal.id, goal.goal);
        }

        for (const businessTeam of updatedValues.business_teams) {
          await updateProjectBusinessTeamService(
            updatedValues.id,
            businessTeam.id,
            {
              executive_sponsor: businessTeam.executive_sponsor,
              business_product: businessTeam.business_product,
              process_owner: businessTeam.process_owner,
            }
          );
        }
        for (const hubTeam of updatedValues.hub_teams) {
          await updateProjectHubTeamService(updatedValues.id, hubTeam.id, {
            pm: hubTeam.pm,
            dev_team: hubTeam.dev_team,
          });
        }

        console.log("Business teams updated successfully");

        for (const risk of updatedValues.risks) {
          await updateProjectRisksService(
            updatedValues.id,
            risk.id,
            risk.risk_issue
          );
        }

        const existingRiskIds = project.risks.map((risk) => risk.id);
        const newRisks = values.risks.filter(
          (risk) => !existingRiskIds.includes(risk.id)
        );
        if (newRisks.length > 0) {
          await addProjectRisksService(
            updatedValues.id,
            newRisks.map((risk) => risk.risk_issue)
          );
        }

        for (const budget of updatedValues.budgets) {
          await updateProjectBudgetService(updatedValues.id, budget.id, budget);
        }
        for (const milestone of values.milestones) {
          if (milestone.id) {
            await updateProjectMilestoneService(
              values.id,
              milestone.id,
              milestone
            ); // Update existing milestone
          } else {
            await addProjectMilestoneService(values.id, milestone); // Add new milestone
          }
        }
        for (const goalId of goalsToRemove) {
          await deleteProjectGoalService(values.id, goalId);
        }
        for (const riskId of risksToRemove) {
          await deleteProjectRiskService(values.id, riskId);
        }
        for (const milestoneId of milestonesToRemove) {
          await deleteProjectMilestoneService(values.id, milestoneId);
        }

        console.log("Updating existing project:", updatedValues);
        onEdit();
      }
    } catch (error) {
      console.error(
        "Error adding or updating project, goals, risks, teams, budgets, or milestones:",
        error
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddDevTeamMember = (fields: any, index: number) => {
    const newDevTeam = [...fields.value[index].dev_team, ""];
    fields.update(index, { ...fields.value[index], dev_team: newDevTeam });
  };
  console.log("Initial Values:", initialValues);

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validate={validateProjectForm}
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
                        overview={initialValues.overview}
                        mode="edit"
                      />
                      <Box mt={4} />
                      <FieldArray name="goals">
                        {({ fields }) => (
                          <ProjectScopeGoalsSection
                            scopeDescription={initialValues.scope_description}
                            goals={fields.value}
                            mode="edit"
                            addGoalField={() =>
                              fields.push({ id: fields.value.length, goal: "" })
                            }
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
                        <FieldArray name="business_teams">
                          {({ fields }) => (
                            <>
                              {fields.map((name, index) => (
                                <BusinessTeamSection
                                  key={index}
                                  businessTeams={fields.value}
                                  mode="edit"
                                />
                              ))}
                            </>
                          )}
                        </FieldArray>
                        <FieldArray name="hub_teams">
                          {({ fields }) => (
                            <>
                              {fields.map((name, index) => (
                                <HubTeamSection
                                  key={index}
                                  hubTeams={fields.value}
                                  mode="edit"
                                  addDevTeamMember={() =>
                                    handleAddDevTeamMember(fields, index)
                                  }
                                />
                              ))}
                            </>
                          )}
                        </FieldArray>
                        <FieldArray name="risks">
                          {({ fields }) => (
                            <RiskSection
                              risks={fields.value}
                              mode="edit"
                              addRiskField={() =>
                                fields.push({ id: 0, risk_issue: "" })
                              }
                              removeRisk={(index) => {
                                const riskId = fields.value[index].id;
                                if (riskId)
                                  setRisksToRemove([...risksToRemove, riskId]);
                                fields.remove(index);
                              }}
                            />
                          )}
                        </FieldArray>
                          
                        <FieldArray name="budgets">
                          {({ fields }) => (
                            <BudgetSection budgets={fields.value} mode="edit" />
                          )}
                        </FieldArray>
                      </StyledEqualContainer>
                    </StyledMainBox>
                  </StyledMainGridItem>
                  <StyledMilestonesGridItem item xs={12} md={4}>
                    <StyledMilestoneContainer>
                      <Field name="start_date">
                        {({ input, meta }: any) => (
                          <FormControl fullWidth margin="normal">
                            <br />
                            <InputLabel shrink htmlFor="start_date">
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
                      <Field name="end_date">
                        {({ input, meta }: any) => (
                          <FormControl fullWidth margin="normal">
                            <br />
                            <InputLabel shrink htmlFor="end_date">
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
                                  {({ input, meta }: any) => (
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
                                  {({ input, meta }: any) => (
                                    
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
                                  {({ input, meta }: any) => (
                                    <FormControl fullWidth margin="normal">
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
                                <FormControlLabel
                                  control={
                                    <Field
                                      name={`${name}.is_current_state`}
                                      component="input"
                                      type="checkbox"
                                    />
                                  }
                                  label="Current State"
                                />
                                <Box mt={2}>
                                  <Button
                                    color="error"
                                    fullWidth
                                    onClick={() => {
                                      const milestoneId =
                                        fields.value[index].id;
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
                              </Box>
                            ))}

                            <Box mt={2}>
                              <Button
                                onClick={() =>
                                  fields.push({
                                    title: "",
                                    description: "",
                                    date: "",
                                    is_current_state: false,
                                  })
                                }
                                fullWidth
                              >
                                Add Milestone
                              </Button>
                            </Box>
                          </>
                        )}
                      </FieldArray>
                    </StyledMilestoneContainer>
                  </StyledMilestonesGridItem>
                </Grid>
              </StyledContainerBox>
              <Box display="flex" justifyContent="flex-end" mt={4}>
                <Button onClick={onCancel} variant="contained" color="error">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={isSubmitting}
                  style={{ marginLeft: "10px" }}
                >
                  {isSubmitting ? <CircularProgress size={24} /> : "Submit"}
                </Button>
              </Box>
            </StyledMainBox>
          </form>
        )}
      />
      <Backdrop open={isSubmitting} style={{ zIndex: 1300 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default NewProjectForm;
