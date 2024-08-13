import React from 'react';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import LowerSection from './lowerSection';
import { BulletedList, Label, Value } from './styledComponents/styledText';
import { TextField, Button, Box } from '@mui/material';
import { Field } from 'react-final-form';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

type HubTeam = {
  id: number;
  pm: string;
  dev_team: string[];
};

type HubTeamSectionProps = {
  hubTeams: HubTeam[];
  mode: 'view' | 'edit';
  addDevTeamMember?: (teamIndex: number) => void;
};

const HubTeamSection: React.FC<HubTeamSectionProps> = ({ hubTeams, mode, addDevTeamMember }) => (
  <LowerSection
    title="HUB Team"
    icon={GroupsOutlinedIcon}
    data={hubTeams}
    renderItem={(team, index) => (
      <BulletedList key={team.id}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <Label>PM:</Label>
          {mode === 'edit' ? (
            <Field name={`hub_teams[${index}].pm`}>
              {({ input, meta}) => (
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
            <Value>{team.pm}</Value>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <Label>Dev Team:</Label>
          {mode === 'edit' ? (
            <Field name={`hub_teams[${index}].dev_team`}>
              {({ input, meta }) => (
                <TextField
                  value={input.value.join(', ')}
                  onChange={(e) => {
                    const updatedDevTeam = e.target.value.split(',').map(dev => dev.trim());
                    input.onChange(updatedDevTeam);
                  }}
                  variant="standard"
                  fullWidth
                  error={meta.touched && meta.error}
                  helperText={meta.touched && meta.error}
                  style={{ marginLeft: '8px' }}
                />
              )}
            </Field>
          ) : (
            <Value>{team.dev_team.join(', ')}</Value>
          )}
        </div>
        {mode === 'edit' && (
          <Box mt={2} display="flex" justifyContent="center">
            <Button
              onClick={() => addDevTeamMember && addDevTeamMember(index)}
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
