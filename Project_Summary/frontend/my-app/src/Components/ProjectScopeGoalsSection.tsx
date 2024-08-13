import React from 'react';
import { Field } from 'react-final-form';
import Section from './Section';
import {
  StyledIconGreenBackground,
  StyledIconNoBackground,
  StyledIconBox,
} from './styledComponents/StyledIconAvatar';
import {
  StyledBox,
  StyledGridItem,
  StyledVerticalDivider,
} from './styledComponents/styledContainer';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import { CalibriText12, BulletedList, CalibriText12P ,LabelValueItem} from './styledComponents/styledText';
import { Grid, TextField, Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

type Goal = {
  id: number;
  goal: string;
};

type ProjectScopeGoalsSectionProps = {
  scopeDescription: string;
  goals: Goal[];
  mode: 'view' | 'edit';
  addGoalField?: () => void;
  removeGoalField?: (index: number) => void;
};

const ProjectScopeGoalsSection: React.FC<ProjectScopeGoalsSectionProps> = ({
  scopeDescription,
  goals,
  mode,
  addGoalField,
  removeGoalField,
}) => {
  return (
    <StyledBox>
      <Grid container>
        <StyledGridItem item xs={12} md={6}>
          <Section
            icon={
              <StyledIconGreenBackground>
                <InsertChartIcon />
              </StyledIconGreenBackground>
            }
            title="Project Scope"
            content={
              mode === 'edit' ? (
                <Field name="scope_description" initialValue={scopeDescription}>
                  {({ input, meta }) => {
                    return (
                      <TextField
                        {...input}
                        placeholder="Project Scope"
                        fullWidth
                        multiline
                        variant="standard"
                        error={meta.touched && meta.error}
                        helperText={meta.touched && meta.error}
                        InputProps={{
                          disableUnderline: true,
                          style: { fontSize: 'inherit', fontWeight: 'inherit' },
                        }}
                      />
                    );
                  }}
                </Field>
              ) : (
                <CalibriText12P>{scopeDescription}</CalibriText12P>
              )
            }
          />
        </StyledGridItem>
        <StyledGridItem item xs={12} md={6}>
          <Section
            icon={
              <StyledIconBox>
                <StyledIconNoBackground>
                  <FlagCircleIcon />
                </StyledIconNoBackground>
              </StyledIconBox>
            }
            title="Project Goals"
            content={
              mode === 'edit' ? (
                <React.Fragment>
                  {goals.map((goal, index) => (
                    <div key={goal.id} style={{ display: 'flex', alignItems: 'center' }}>
                      <Field name={`goals[${index}].goal`}>
                        {({ input, meta }) => {
                          return (
                            <TextField
                              {...input}
                              placeholder={`Goal ${index + 1}`}
                              fullWidth
                              multiline
                              variant="standard"
                              error={meta.touched && meta.error}
                              helperText={meta.touched && meta.error}
                              InputProps={{
                                disableUnderline: true,
                                style: { fontSize: 'inherit', fontWeight: 'inherit' },
                              }}
                              margin="normal"
                            />
                          );
                        }}
                      </Field>
                      {removeGoalField && (
                        <Button
                          onClick={() => removeGoalField(index)}
                          variant="text"
                          color="error"
                          disabled={goals.length === 1}
                          style={{ marginLeft: '8px' }}
                        >
                          <RemoveCircleOutlineIcon />
                        </Button>
                      )}
                    </div>
                  ))}
                  {addGoalField && (
                    <Button onClick={addGoalField} variant="text" color="primary">
                      <AddCircleOutlineIcon />
                    </Button>
                  )}
                </React.Fragment>
              ) : goals && Array.isArray(goals) ? (
                <BulletedList>
                  {goals.map((goal, index) => (
                    <LabelValueItem key={index}>
                      <CalibriText12>{typeof goal === 'string' ? goal : goal.goal}</CalibriText12>
                    </LabelValueItem>
                  ))}
                </BulletedList>
              ) : (
                <CalibriText12>No goals available</CalibriText12>
              )
            }
          />
        </StyledGridItem>
      </Grid>
      <StyledVerticalDivider orientation="vertical" flexItem />
    </StyledBox>
  );
};

export default ProjectScopeGoalsSection;
