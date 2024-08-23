import React from 'react';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import LowerSection from './lowerSection';
import { BulletedList, Label, Value } from './styledComponents/styledText';
import { TextField } from '@mui/material';
import { Field } from 'react-final-form';
import { HubTeam } from './Validation/Type';

type HubTeamSectionProps = {
  hubTeam: HubTeam;
  mode: 'view' | 'edit';
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

export default HubTeamSection;