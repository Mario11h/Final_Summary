import React from 'react';
import { Field } from 'react-final-form';
import GroupsIcon from '@mui/icons-material/Groups';
import LowerSection from './lowerSection';
import { BulletedList, Label, Value } from './styledComponents/styledText';
import { TextField } from '@mui/material';

type BusinessTeam = {
  id: number;
  executive_sponsor: string;
  business_product: string;
  process_owner: string;
};

type BusinessTeamSectionProps = {
  businessTeams: BusinessTeam[];
  mode: 'view' | 'edit';
};

const BusinessTeamSection: React.FC<BusinessTeamSectionProps> = ({ businessTeams, mode }) => {
  return (
    <LowerSection
      title="Business Team"
      icon={GroupsIcon}
      data={businessTeams}
      renderItem={(team: BusinessTeam, index: number) =>
        mode === 'edit' ? (
          <BulletedList key={team.id}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <Label>Exec. Sponsor:</Label>
              <Field
                name={`business_teams[${index}].executive_sponsor`}
                initialValue={team.executive_sponsor}
              >
                {({ input, meta }) => (
                  <TextField
                    {...input}
                    variant="standard"
                    fullWidth
                    style={{ marginLeft: '8px' }}
                    error={meta.touched && meta.error}
                    helperText={meta.touched && meta.error}
                  />
                )}
              </Field>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <Label>Business Product:</Label>
              <Field
                name={`business_teams[${index}].business_product`}
                initialValue={team.business_product}
              >
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
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <Label>Process Owner:</Label>
              <Field
                name={`business_teams[${index}].process_owner`}
                initialValue={team.process_owner}
              >
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
            </div>
          </BulletedList>
        ) : (
          <BulletedList key={team.id}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <Label>Exec. Sponsor:</Label> <Value>{team.executive_sponsor}</Value>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <Label>Business Product:</Label> <Value>{team.business_product}</Value>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <Label>Process Owner:</Label> <Value>{team.process_owner}</Value>
            </div>
          </BulletedList>
        )
      }
    />
  );
};

export default BusinessTeamSection;
