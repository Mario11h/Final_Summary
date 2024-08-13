import React from 'react';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import LowerSection from './lowerSection';
import { BulletedList, Label, Value } from './styledComponents/styledText';
import { TextField, Button, Box } from '@mui/material';
import { Field } from 'react-final-form';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

type RiskSectionProps = {
  risks: string[];
  mode: 'view' | 'edit';
  addRiskField?: () => void;
  removeRisk?: (index: number) => void;
};

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
          <Value>{risk}</Value>
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