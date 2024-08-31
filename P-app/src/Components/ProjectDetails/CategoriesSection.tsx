import React from 'react';
import GroupsIcon from '@mui/icons-material/Groups';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import LowerSection from './lowerSection';
import { BulletedList, CalibriText12Navy, Label, TextRoboto, Value } from '../styledComponents/styledText';
import { TextField, Button, Box } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { HubTeam, Budget } from '../Validation/Type';
import { BudgetRow, BudgetContainer, ActualBudgetValueBox, PlannedBudgetValueBox } from '../styledComponents/styledContainer';
import { Field } from 'react-final-form';


type BusinessTeamSectionProps = {
  sponsor: string;
  businessOwner: string;
  productOwner: string;
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

const BusinessTeamSection: React.FC<BusinessTeamSectionProps> = ({ sponsor, businessOwner, productOwner, mode }) => {
  return (
    <LowerSection
      title="Business Team"
      icon={GroupsIcon}
      data={[{ sponsor, businessOwner, productOwner }]}
      renderItem={(team) =>
        mode === 'edit' ? (
          <BulletedList>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <Label><li>Sponsor:</li></Label>
              <Field name="sponsor" initialValue={sponsor}>
              {({ input, meta }) => (
              <TextField
              {...input}
                name='sponsor'
                variant="standard"
                fullWidth
                error={meta.touched && meta.error}
                    helperText={meta.touched && meta.error}
                style={{ marginLeft: '8px' }}
                defaultValue={sponsor}
              /> )}
              </Field>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <Label><li>Business Owner:</li></Label>
              <Field name="businessOwner" initialValue={businessOwner}>
                {({ input, meta }) => (
              <TextField
              {...input}
                name='businessOwner'
                variant="standard"
                fullWidth
                error={meta.touched && meta.error}
                    helperText={meta.touched && meta.error}
                style={{ marginLeft: '8px' }}
                defaultValue={businessOwner}
              /> )}
              </Field>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <Label><li>Product Owner:</li></Label>
              <Field name="productOwner" initialValue={productOwner}>
              {({ input, meta }) => (
              <TextField
                {...input}
                variant="standard"
                fullWidth
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error}
                style={{ marginLeft: '8px' }}
                defaultValue={productOwner}
              /> )}
              </Field>
            </div>
          </BulletedList>
        ) : (
          <BulletedList>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <Label><li>Sponsor:</li></Label> <Value>{sponsor}</Value>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <Label><li>Business Owner:</li></Label> <Value>{businessOwner}</Value>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <Label><li>Product Owner:</li></Label> <Value>{productOwner}</Value>
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
            <Field name='hubTeam.pm'>
              {({ input, meta }) => (
                <TextField
                {...input}
                  variant="standard"
                  error={meta.touched && meta.error}
                  helperText={meta.touched && meta.error}
                  fullWidth
                  style={{ marginLeft: '8px' }}
                  defaultValue={hubTeam.pm}
                />)}
            </Field>
          ) : (
            <Value>{hubTeam.pm || 'N/A'}</Value>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <Label><li>DeliveryTeam:</li></Label>
          {mode === 'edit' ? (
            <Field name='hubTeam.deliveryTeam'>
              {({ input, meta }) => (
            <TextField
            {...input}
              name='dev'
              variant="standard"
              fullWidth
              style={{ marginLeft: '8px' }}
              defaultValue={hubTeam.deliveryTeam}
              error={meta.touched && meta.error}
                  helperText={meta.touched && meta.error}
            />)}
            </Field>
          ) : (
            <Value>{hubTeam.deliveryTeam || 'N/A'}</Value>
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
                name="risks"
                variant="standard"
                fullWidth
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error}
                style={{ marginLeft: '8px' }}
                defaultValue={risk}
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
  const actualBudget = budget.actualBudget;
  const plannedBudget = budget.allocatedBudget;

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
                > <Field name="budget.actualBudget" initialValue={actualBudget}>
                  {({ input, meta }) => (
                  <TextField
                  {...input}
                    name="budget.actualBudget"
                    variant="standard"
                    fullWidth
                    error={meta.touched && meta.error}
                      helperText={meta.touched && meta.error}
                    defaultValue={actualBudget}
                  /> )}
                  </Field>
                </ActualBudgetValueBox>
              </BudgetRow>
              <BudgetRow>
                <Label>Planned Budget:</Label>
                <PlannedBudgetValueBox
                  isActual={false}
                  budget_actual_usd={actualBudget || 0}
                  budget_planned_usd={plannedBudget || 0}
                > <Field name="budget.allocatedBudget" initialValue={plannedBudget}>
                  {({ input, meta }) => (
                  <TextField
                  {...input}
                    name="budget.allocatedBudget"
                    variant="standard"
                    fullWidth
                    error={meta.touched && meta.error}
                      helperText={meta.touched && meta.error}
                    defaultValue={plannedBudget}
                  /> )}
                  </Field>
                </PlannedBudgetValueBox>
              </BudgetRow>
              <BudgetRow style={{ marginTop: '16px' }}>
                <Label>ROI:</Label>
                <Field name="roi" initialValue={roi}>
                {({ input, meta }) => (
                <TextField
                {...input}
                  name='budget.roi'
                  variant="standard"
                  fullWidth
                  error={meta.touched && meta.error}
                  helperText={meta.touched && meta.error}
                  defaultValue={roi}
                  style={{ marginLeft: '8px' }}
                /> )} 
                </Field>
              </BudgetRow>
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
                <BudgetRow style={{ marginTop: '16px' }}>
                  <CalibriText12Navy>ROI:</CalibriText12Navy>
                  <Box style={{ marginLeft: '8px' }}>
                    <TextRoboto>{roi}</TextRoboto>
                  </Box>
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