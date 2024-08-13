import React from 'react';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import LowerSection from './lowerSection';
import { CalibriText12Navy } from './styledComponents/styledText';
import { BudgetRow, BudgetContainer, ActualBudgetValueBox, PlannedBudgetValueBox } from './styledComponents/styledContainer';
import { Field } from 'react-final-form';
import { TextField } from '@mui/material';

type Budget = {
  id: number;
  actual_budget: number;
  planned_budget: number;
};

interface BudgetSectionProps {
  budgets: Budget[];
  mode: 'view' | 'edit';
}

const BudgetSection: React.FC<BudgetSectionProps> = ({ budgets, mode }) => {
  return (
    <LowerSection
      title="HUB Project Budget"
      icon={CurrencyExchangeIcon}
      data={budgets}
      renderItem={(budget, index) => (
        <BudgetContainer key={budget.id}>
          <BudgetRow>
            <CalibriText12Navy>Actual:</CalibriText12Navy>
            {mode === 'edit' ? (
              <Field name={`budgets[${index}].actual_budget`} initialValue={budget.actual_budget}>
                {({ input, meta }) => {
                  if (meta.touched && meta.error) {
                    console.log(`Error in Actual Budget (ID ${budget.id}): ${meta.error}`);
                  }
                  console.log(meta.error)
                  return (
                    <TextField
                      {...input}
                      variant="standard"
                      type="number"
                      fullWidth
                      error={meta.touched && meta.error}
                      helperText={meta.touched && meta.error}
                      style={{ marginLeft: '8px' }}
                    />
                  );
                }}
              </Field>
            ) : (
              <ActualBudgetValueBox isActual={true}
              budget_actual_usd={budget.actual_budget}
              budget_planned_usd={budget.planned_budget} >
                {budget.actual_budget} USD
              </ActualBudgetValueBox>
            )}
          </BudgetRow>
          <BudgetRow>
            <CalibriText12Navy>Planned:</CalibriText12Navy>
            {mode === 'edit' ? (
              <Field name={`budgets[${index}].planned_budget`} initialValue={budget.planned_budget}>
                {({ input, meta }) => {
                  if (meta.touched && meta.error) {
                    console.log(`Error in Planned Budget (ID ${budget.id}): ${meta.error}`);
                  }
                  return (
                    <TextField
                      {...input}
                      variant="standard"
                      type="number"
                      fullWidth
                      error={meta.touched && meta.error}
                      helperText={meta.touched && meta.error}
                      style={{ marginLeft: '8px' }}
                    />
                  );
                }}
              </Field>
            ) : (
              <PlannedBudgetValueBox isActual={false}
              budget_actual_usd={budget.actual_budget}
              budget_planned_usd={budget.planned_budget}>
                {budget.planned_budget} USD
              </PlannedBudgetValueBox>
            )}
          </BudgetRow>
        </BudgetContainer>
      )}
    />
  );
};

export default BudgetSection;