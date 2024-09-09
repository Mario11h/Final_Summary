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
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
import ProjectHeader from "./ProjectDetails/ProjectHeader";
import OverviewSection from "./ProjectDetails/OverviewSection";
import ProjectScopeGoalsSection from "./ProjectDetails/ProjectScopeGoalsSection";
import {
  StyledEqualContainer,
  StyledMilestoneContainer,
} from "./styledComponents/styledContainer";
import {
  BusinessTeamSection,
  HubTeamSection,
  RiskSection,
  BudgetSection,
} from "./ProjectDetails/CategoriesSection";
import { FieldArray } from "react-final-form-arrays";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import validateProjectForm from "./Validation/projectValidator";
import { Project } from "./Validation/Type";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { addProject, updateProject } from "../features/projectSlice"; // Import thunks

interface NewProjectFormProps {
  onCancel: () => void;
  onDone: (newProject: Project) => void;
  onEdit: (updatedProject: Project) => void;
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
    sponsor: "",
    businessOwner: "",
    productOwner: "",
    pm: "",
    deliveryTeam: "",
    risks: [""],
    roi: "",
    actualBudget: 0,
    allocatedBudget: 0,
    startDate: dayjs().format("YYYY-MM-DD"),
    endDate: dayjs().add(3, "month").format("YYYY-MM-DD"),
    milestones: [],
  };

  const dispatch = useDispatch<AppDispatch>();
  const [goalsToRemove, setGoalsToRemove] = useState<number[]>([]);
  const [risksToRemove, setRisksToRemove] = useState<number[]>([]);
  const [milestonesToRemove, setMilestonesToRemove] = useState<number[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formValues, setFormValues] = useState<Project | null>(null);
  const [alertOpen, setAlertOpen] = useState(false);

  const handleSubmit = async (values: Project) => {
    console.log("Submitting values:", values);

    try {
      if (!project) {
        const response = await dispatch(addProject(values)).unwrap();
        console.log("New project response:", response);
        onDone(response);
      } else {
        const response = await dispatch(updateProject(values)).unwrap();
        console.log("Updated project response:", response);
        onEdit(response);
      }
    } catch (error) {
      console.error("Error handling project data:", error);
    }
  };

  const handleOpenDialog = (isUpdate: boolean, values: Project) => {
    setIsUpdating(isUpdate);
    setFormValues(values);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirm = async () => {
    if (formValues) {
      await handleSubmit(formValues);
    }
    handleCloseDialog();
  };

  console.log("Alert Open State:", alertOpen);
  return (
    <>
      <Form
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validate={validateProjectForm}
        mutators={{ ...arrayMutators }}
        render={({ handleSubmit, submitting, pristine, values }) => {
          console.log("pristine", pristine);
          const isFormValid = Object.values(values).every(
            (value) => value !== "" && value !== undefined
          );
          return (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleOpenDialog(!!project, values);
              }}
            >
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
                          sponsor={initialValues.sponsor}
                          businessOwner={initialValues.businessOwner}
                          productOwner={initialValues.productOwner}
                          mode="edit"
                        />

                        <HubTeamSection
                          pm={initialValues.pm}
                          deliveryTeam={initialValues.pm}
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
                          actualBudget={initialValues.actualBudget}
                          allocatedBudget={initialValues.allocatedBudget}
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
                              value={dayjs(input.value).format("YYYY-MM-DD")}
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
                              value={dayjs(input.value).format("YYYY-MM-DD")}
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
                                <Field name={`${name}.deliveryDate`}>
                                  {({ input, meta }) => (
                                    <FormControl fullWidth margin="normal">
                                      <TextField
                                        {...input}
                                        type="date"
                                        label="Delivery Date"
                                        fullWidth
                                        error={meta.touched && meta.error}
                                        helperText={meta.touched && meta.error}
                                        value={dayjs(input.value).format(
                                          "YYYY-MM-DD"
                                        )}
                                      />
                                    </FormControl>
                                  )}
                                </Field>
                                <FormControlLabel
                                  control={
                                    <Field
                                      name={`${name}.status`}
                                      component="input"
                                      type="checkbox"
                                      checked={
                                        fields.value[index]?.status ===
                                        "ONGOING"
                                      }
                                      onChange={(
                                        event: React.ChangeEvent<HTMLInputElement>
                                      ) => {
                                        const isChecked = event.target.checked;

                                        if (isChecked) {
                                          fields.value.forEach((item, idx) => {
                                            if (idx !== index) {
                                              fields.update(idx, {
                                                ...item,
                                                status: "",
                                              });
                                            }
                                          });
                                        }

                                        const newStatus = isChecked
                                          ? "ONGOING"
                                          : "";
                                        fields.update(index, {
                                          ...fields.value[index],
                                          status: newStatus,
                                        });
                                      }}
                                    />
                                  }
                                  label="Current State"
                                />
                                <Button
                                  variant="contained"
                                  color="error"
                                  sx={{
                                    "&:hover": {
                                      backgroundColor: "rgba(226, 1, 1, 1)",
                                      boxShadow:
                                        "0 4px 8px rgba(4, 36, 106, 1)",
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
                                  deliveryDate: "",
                                  status: "",
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
              <Box
                mt={2}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <div style={{ position: "relative" }}>
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
                  type="submit"
                  disabled={submitting || pristine}
                >
                  {submitting
                    ? "Submitting..."
                    : project
                    ? "Update Project"
                    : "Add Project"}
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
        <DialogTitle>
          {isUpdating ? "Confirm Update" : "Confirm Addition"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isUpdating
              ? "Are you sure you want to update the project details?"
              : "Are you sure you want to add this project?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary">
            {isUpdating ? "Submit" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NewProjectForm;
