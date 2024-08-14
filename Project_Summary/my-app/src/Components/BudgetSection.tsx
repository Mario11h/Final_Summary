import React from 'react';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import LowerSection from './lowerSection';
import { CalibriText12Navy } from './styledComponents/styledText';
import {
  BudgetRow,
  BudgetContainer,
  ActualBudgetValueBox,
  PlannedBudgetValueBox,
} from './styledComponents/styledContainer';
import { Field } from 'react-final-form';
import { TextField, Box } from '@mui/material';

type Budget = {
  actual?: number;
  planned?: number;
};

interface BudgetSectionProps {
  budget: Budget;
  roi?: string;
  mode: 'view' | 'edit';
}

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
          {actualBudget !== undefined && (
            <BudgetRow>
              <CalibriText12Navy>Actual:</CalibriText12Navy>
              {mode === 'edit' ? (
                <Field name="budget.actual" initialValue={actualBudget}>
                  {({ input, meta }) => (
                    <TextField
                      {...input}
                      variant="standard"
                      type="number"
                      fullWidth
                      error={meta.touched && meta.error}
                      helperText={meta.touched && meta.error}
                      style={{ marginLeft: '8px' }}
                    />
                  )}
                </Field>
              ) : (
                <ActualBudgetValueBox
                  isActual={true}
                  budget_actual_usd={actualBudget}
                  budget_planned_usd={plannedBudget || 0}
                >
                  {`${actualBudget} USD`}
                </ActualBudgetValueBox>
              )}
            </BudgetRow>
          )}
          {plannedBudget !== undefined && (
            <BudgetRow>
              <CalibriText12Navy>Planned:</CalibriText12Navy>
              {mode === 'edit' ? (
                <Field name="budget.planned" initialValue={plannedBudget}>
                  {({ input, meta }) => (
                    <TextField
                      {...input}
                      variant="standard"
                      type="number"
                      fullWidth
                      error={meta.touched && meta.error}
                      helperText={meta.touched && meta.error}
                      style={{ marginLeft: '8px' }}
                    />
                  )}
                </Field>
              ) : (
                <PlannedBudgetValueBox
                  isActual={false}
                  budget_actual_usd={actualBudget || 0}
                  budget_planned_usd={plannedBudget}
                >
                  {`${plannedBudget} USD`}
                </PlannedBudgetValueBox>
              )}
            </BudgetRow>
          )}
          {roi !== undefined && (
  <BudgetRow style={{ marginTop: '16px' }}>
    <CalibriText12Navy>ROI:</CalibriText12Navy>
    {mode === 'edit' ? (
      <Field name="roi" initialValue={roi}>
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
      <Box style={{ marginLeft: '8px' }}>
        {roi}
      </Box>
    )}
  </BudgetRow>
)}
        </BudgetContainer>
      )}
    />
  );
};

export default BudgetSection;