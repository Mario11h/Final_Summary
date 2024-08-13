import React from 'react';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import LowerSection from './lowerSection';
import { CalibriText12Navy } from './styledComponents/styledText';
import {
  BudgetRow,
  BudgetContainer,
  ActualBudgetValueBox,
  PlannedBudgetValueBox
} from './styledComponents/styledContainer';
import { Field } from 'react-final-form';
import { TextField } from '@mui/material';

type Budget = {
  actual?: number;
  planned?: number;
};

interface BudgetSectionProps {
  budget: Budget;
  mode: 'view' | 'edit';
}

const BudgetSection: React.FC<BudgetSectionProps> = ({ budget, mode }) => {
  const actualBudget = budget.actual ?? 0; // Default to 0 if undefined
  const plannedBudget = budget.planned ?? 0; // Default to 0 if undefined

  return (
    <LowerSection
      title="HUB Project Budget"
      icon={CurrencyExchangeIcon}
      data={[budget]}
      renderItem={() => (
        <BudgetContainer>
          <BudgetRow>
            <CalibriText12Navy>Actual:</CalibriText12Navy>
            {mode === 'edit' ? (
              <Field name="budget.actual" initialValue={budget.actual}>
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
                budget_planned_usd={plannedBudget}
              >
                {budget.actual ? `${budget.actual} USD` : 'N/A'}
              </ActualBudgetValueBox>
            )}
          </BudgetRow>
          <BudgetRow>
            <CalibriText12Navy>Planned:</CalibriText12Navy>
            {mode === 'edit' ? (
              <Field name="budget.planned" initialValue={budget.planned}>
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
                budget_actual_usd={actualBudget}
                budget_planned_usd={plannedBudget}
              >
                {budget.planned ? `${budget.planned} USD` : 'N/A'}
              </PlannedBudgetValueBox>
            )}
          </BudgetRow>
        </BudgetContainer>
      )}
    />
  );
};

export default BudgetSection;