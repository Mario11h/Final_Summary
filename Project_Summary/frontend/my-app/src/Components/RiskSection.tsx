import React from 'react';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import LowerSection from './lowerSection';
import { BulletedList, LabelValueItem, Label, Value } from './styledComponents/styledText';
import { TextField, Button, Box } from '@mui/material';
import { Field } from 'react-final-form';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

type Risk = {
  id: number;
  risk_issue: string;
};

type RiskSectionProps = {
  risks: Risk[];
  mode: 'view' | 'edit';
  addRiskField?: () => void;
  removeRisk?: (index: number) => void;
};

const RiskSection: React.FC<RiskSectionProps> = ({ risks, mode, addRiskField, removeRisk }) => (
  <LowerSection
    title="Risk & Issues"
    icon={ContentPasteSearchIcon}
    data={risks}
    renderItem={(risk: Risk, index: number) => (
      mode === 'edit' ? (
        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <Label>Risk Issue:</Label>
          <Field name={`risks[${index}].risk_issue`}>
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
        <BulletedList key={risk.id}>
          <LabelValueItem>
            <Value>{risk.risk_issue}</Value>
          </LabelValueItem>
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


export default RiskSection;
