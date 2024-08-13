import React from 'react';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import LowerSection from './lowerSection';
import { BulletedList, Label, Value } from './styledComponents/styledText';
import { TextField, Button, Box } from '@mui/material';
import { Field } from 'react-final-form';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

type HubTeam = {
  pm: string;
  dev: string;
  ba: string;
  qa?: string;
};

type HubTeamSectionProps = {
  hubTeam: HubTeam;
  mode: 'view' | 'edit';
  addDevTeamMember?: () => void;
};

const HubTeamSection: React.FC<HubTeamSectionProps> = ({ hubTeam, mode, addDevTeamMember }) => (
  <LowerSection
    title="HUB Team"
    icon={GroupsOutlinedIcon}
    data={[hubTeam]}
    renderItem={() => (
      <BulletedList>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <Label>PM:</Label>
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
            <Value>{hubTeam.pm}</Value>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <Label>Dev:</Label>
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
            <Value>{hubTeam.dev}</Value>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <Label>BA:</Label>
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
            <Value>{hubTeam.ba}</Value>
          )}
        </div>
        {hubTeam.qa && (
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <Label>QA:</Label>
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
              <Value>{hubTeam.qa}</Value>
            )}
          </div>
        )}
        {mode === 'edit' && (
          <Box mt={2} display="flex" justifyContent="center">
            <Button
              onClick={addDevTeamMember}
              variant="text"
              color="primary"
            >
              <AddCircleOutlineIcon />
            </Button>
          </Box>
        )}
      </BulletedList>
    )}
  />
);

export default HubTeamSection;