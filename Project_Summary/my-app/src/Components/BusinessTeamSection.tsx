import React from 'react';
import { Field } from 'react-final-form';
import GroupsIcon from '@mui/icons-material/Groups';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import LowerSection from './lowerSection';
import { BulletedList, Label, Value } from './styledComponents/styledText';
import { TextField, Button, Box } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { HubTeam, BusinessTeam, Budget } from './Validation/Type';
import { BudgetRow, BudgetContainer, ActualBudgetValueBox, PlannedBudgetValueBox } from './styledComponents/styledContainer';

type BusinessTeamSectionProps = {
  businessTeam: BusinessTeam;
  mode: 'view' | 'edit';
};

type HubTeamSectionProps = {
  hubTeam: HubTeam;
  mode: 'view' | 'edit';
};

type RiskSectionProps = {
  risks: string[];
  mode: 'view' | 'edit';
  addRiskField?: () => void;
  removeRisk?: (index: number) => void;
};

interface BudgetSectionProps {
  budget: Budget;
  roi?: string;
  mode: 'view' | 'edit';
}

const BusinessTeamSection: React.FC<BusinessTeamSectionProps> = ({ businessTeam, mode }) => {
  return (
    <LowerSection
      title="Business Team"
      icon={GroupsIcon}
      data={[businessTeam]}
      renderItem={(team: BusinessTeam) =>
        mode === 'edit' ? (
          <BulletedList>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <Label><li>Sponsor:</li></Label>
              <Field name="businessTeam.sponsor" initialValue={team.sponsor}>
                {({ input, meta }) => (
                  <TextField
                    {...input}
                    variant="standard"
                    fullWidth
                    style={{ marginLeft: '8px' }}
                    error={meta.touched && meta.error}
                    helperText={meta.touched && meta.error}
                  />
                )}
              </Field>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <Label><li>Business Owner:</li></Label>
              <Field name="businessTeam.businessOwner" initialValue={team.businessOwner}>
                {({ input, meta }) => (
                  <TextField
                    {...input}
                    variant="standard"
                    fullWidth
                    style={{ marginLeft: '8px' }}
                    error={meta.touched && meta.error}
                    helperText={meta.touched && meta.error}
                  />
                )}
              </Field>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <Label><li>Product Owner:</li></Label>
              <Field name="businessTeam.productOwner" initialValue={team.productOwner}>
                {({ input, meta }) => (
                  <TextField
                    {...input}
                    variant="standard"
                    fullWidth
                    style={{ marginLeft: '8px' }}
                    error={meta.touched && meta.error}
                    helperText={meta.touched && meta.error}
                  />
                )}
              </Field>
            </div>
          </BulletedList>
        ) : (
          <BulletedList>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <Label><li>Sponsor:</li></Label> <Value>{team.sponsor}</Value>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <Label><li>Business Owner:</li></Label> <Value>{team.businessOwner}</Value>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <Label><li>Product Owner:</li></Label> <Value>{team.productOwner}</Value>
            </div>
          </BulletedList>
        )
      }
    />
  );
};

const HubTeamSection: React.FC<HubTeamSectionProps> = ({ hubTeam, mode }) => (
  <LowerSection
    title="HUB Team"
    icon={GroupsOutlinedIcon}
    data={[hubTeam]}
    renderItem={() => (
      <BulletedList>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <Label><li>PM:</li></Label>
          {mode === 'edit' ? (
            <Field name="hubTeam.pm">
              {({ input, meta }) => (
                <TextField
                  {...input}
                  variant="standard"
                  fullWidth
                  error={meta.touched && meta.error}
                  helperText={meta.touched && meta.error}
                  style={{ marginLeft: '8px' }}
                />
              )}
            </Field>
          ) : (
            <Value>{hubTeam.pm || 'N/A'}</Value>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <Label><li>Dev:</li></Label>
          {mode === 'edit' ? (
            <Field name="hubTeam.dev">
              {({ input, meta }) => (
                <TextField
                  {...input}
                  variant="standard"
                  fullWidth
                  error={meta.touched && meta.error}
                  helperText={meta.touched && meta.error}
                  style={{ marginLeft: '8px' }}
                />
              )}
            </Field>
          ) : (
            <Value>{hubTeam.dev || 'N/A'}</Value>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <Label><li>BA:</li></Label>
          {mode === 'edit' ? (
            <Field name="hubTeam.ba">
              {({ input, meta }) => (
                <TextField
                  {...input}
                  variant="standard"
                  fullWidth
                  error={meta.touched && meta.error}
                  helperText={meta.touched && meta.error}
                  style={{ marginLeft: '8px' }}
                />
              )}
            </Field>
          ) : (
            <Value>{hubTeam.ba || 'N/A'}</Value>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <Label><li>QA:</li></Label>
          {mode === 'edit' ? (
            <Field name="hubTeam.qa">
              {({ input, meta }) => (
                <TextField
                  {...input}
                  variant="standard"
                  fullWidth
                  error={meta.touched && meta.error}
                  helperText={meta.touched && meta.error}
                  style={{ marginLeft: '8px' }}
                />
              )}
            </Field>
          ) : (
            <Value>{hubTeam.qa || 'N/A'}</Value>
          )}
        </div>
      </BulletedList>
    )}
  />
);

const RiskSection: React.FC<RiskSectionProps> = ({ risks, mode, addRiskField, removeRisk }) => (
  <LowerSection
    title="Risk & Issues"
    icon={ContentPasteSearchIcon}
    data={risks}
    renderItem={(risk: string, index: number) => (
      mode === 'edit' ? (
        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <Label>Risk Issue:</Label>
          <Field name={`risks[${index}]`}>
            {({ input, meta }) => (
              <TextField
                {...input}
                variant="standard"
                fullWidth
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error}
                style={{ marginLeft: '8px' }}
              />
            )}
          </Field>
          <Button
            onClick={() => removeRisk && removeRisk(index)}
            variant="text"
            color="error"
            disabled={risks.length <= 1}
            style={{ marginLeft: '8px' }}
          >
            <RemoveCircleOutlineIcon />
          </Button>
        </div>
      ) : (
        <BulletedList key={index}>
          <li>{risk}</li>
        </BulletedList>
      )
    )}
  >
    {mode === 'edit' && addRiskField && (
      <Box mt={2} display="flex" justifyContent="center">
        <Button onClick={addRiskField} variant="text" color="primary">
          <AddCircleOutlineIcon />
        </Button>
      </Box>
    )}
  </LowerSection>
);

const BudgetSection: React.FC<BudgetSectionProps> = ({ budget, roi, mode }) => {
  const actualBudget = budget.actual;
  const plannedBudget = budget.planned;

  return (
    <LowerSection
      title="HUB Project Budget"
      icon={CurrencyExchangeIcon}
      data={[budget]}
      renderItem={() => (
        <BudgetContainer>
          {mode === 'edit' ? (
            <>
              <BudgetRow>
                <Label>Actual Budget:</Label>
                <ActualBudgetValueBox 
                  isActual={true} 
                  budget_actual_usd={actualBudget || 0} 
                  budget_planned_usd={plannedBudget || 0}
                >
                  <Field name="budget.actual" initialValue={actualBudget}>
                    {({ input, meta }) => (
                      <TextField
                        {...input}
                        variant="standard"
                        fullWidth
                        error={meta.touched && meta.error}
                        helperText={meta.touched && meta.error}
                      />
                    )}
                  </Field>
                </ActualBudgetValueBox>
              </BudgetRow>
              <BudgetRow>
                <Label>Planned Budget:</Label>
                <PlannedBudgetValueBox 
                  isActual={false} 
                  budget_actual_usd={actualBudget || 0} 
                  budget_planned_usd={plannedBudget || 0}
                >
                  <Field name="budget.planned" initialValue={plannedBudget}>
                    {({ input, meta }) => (
                      <TextField
                        {...input}
                        variant="standard"
                        fullWidth
                        error={meta.touched && meta.error}
                        helperText={meta.touched && meta.error}
                      />
                    )}
                  </Field>
                </PlannedBudgetValueBox>
              </BudgetRow>
              {roi && (
                <BudgetRow>
                  <Label>ROI:</Label>
                  <TextField
                    name="roi"
                    defaultValue={roi}
                    variant="standard"
                    fullWidth
                  />
                </BudgetRow>
              )}
            </>
          ) : (
            <>
              <BudgetRow>
                <Label>Actual Budget:</Label>
                <ActualBudgetValueBox 
                  isActual={true} 
                  budget_actual_usd={actualBudget || 0} 
                  budget_planned_usd={plannedBudget || 0}
                >
                  {actualBudget}
                </ActualBudgetValueBox>
              </BudgetRow>
              <BudgetRow>
                <Label>Planned Budget:</Label>
                <PlannedBudgetValueBox 
                  isActual={false} 
                  budget_actual_usd={actualBudget || 0} 
                  budget_planned_usd={plannedBudget || 0}
                >
                  {plannedBudget}
                </PlannedBudgetValueBox>
              </BudgetRow>
              {roi && (
                <BudgetRow>
                  <Label>ROI:</Label>
                  <ActualBudgetValueBox 
                    isActual={true} 
                    budget_actual_usd={actualBudget || 0} 
                    budget_planned_usd={plannedBudget || 0}
                  >
                    {roi}
                  </ActualBudgetValueBox>
                </BudgetRow>
              )}
            </>
          )}
        </BudgetContainer>
      )}
    />
  );
};

export { BusinessTeamSection, HubTeamSection, RiskSection, BudgetSection };
