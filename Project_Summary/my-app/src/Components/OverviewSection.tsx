import React from 'react';
import { Field } from 'react-final-form';
import { TextField } from '@mui/material';
import { CalibriText12, StyledTitleOver } from './styledComponents/styledText';
import { StyledIconGreyBackground } from './styledComponents/StyledIconAvatar';
import { StyledBox, StyledOverviewBox, StyledTextBox } from './styledComponents/styledContainer';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

type OverviewSectionProps = {
  overview: string;
  mode: 'view' | 'edit';
};

const OverviewSection: React.FC<OverviewSectionProps> = ({ overview, mode }) => {
  return (
    <StyledBox>
      <StyledOverviewBox>
        <StyledIconGreyBackground>
          <TrendingUpIcon />
        </StyledIconGreyBackground>
        <StyledTextBox>
          <StyledTitleOver>OVERVIEW</StyledTitleOver>
          {mode === 'edit' ? (
            <Field name="overview" initialValue={overview}>
              {({ input,meta }) => (
                <TextField
                  {...input}
                  placeholder="Overview Text"
                  fullWidth
                      multiline
                      rows={4}
                  variant="standard"
                  error={meta.touched && meta.error}
                  helperText={meta.touched && meta.error}
                  InputProps={{
                    disableUnderline: true,
                    style: { fontSize: 'inherit', fontWeight: 'inherit' }
                  }}
                />
              )}
            </Field>
          ) : (
            <CalibriText12>{overview}</CalibriText12>
          )}
        </StyledTextBox>
      </StyledOverviewBox>
    </StyledBox>
  );
};

export default OverviewSection;