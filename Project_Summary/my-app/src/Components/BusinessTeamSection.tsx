import React from 'react';
import { Field } from 'react-final-form';
import GroupsIcon from '@mui/icons-material/Groups';
import LowerSection from './lowerSection';
import { BulletedList, Label, Value } from './styledComponents/styledText';
import { TextField } from '@mui/material';
import { BusinessTeam } from './Validation/Type';

type BusinessTeamSectionProps = {
  businessTeam: BusinessTeam;
  mode: 'view' | 'edit';
};

const BusinessTeamSection: React.FC<BusinessTeamSectionProps> = ({ businessTeam, mode }) => {
  return (
    <LowerSection
      title="Business Team"
      icon={GroupsIcon}
      data={[businessTeam]}
      renderItem={(team: BusinessTeam) =>
        mode === 'edit' ? (
          <BulletedList>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <Label><li>Sponsor:</li></Label>
              <Field name="businessTeam.sponsor" initialValue={team.sponsor}>
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
              <Label><li>Business Owner:</li></Label>
              <Field name="businessTeam.businessOwner" initialValue={team.businessOwner}>
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
              <Label><li>Product Owner:</li></Label>
              <Field name="businessTeam.productOwner" initialValue={team.productOwner}>
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
          </BulletedList>
        ) : (
          <BulletedList>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <Label><li>Sponsor:</li></Label> <Value>{team.sponsor}</Value>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <Label><li>Business Owner:</li></Label> <Value>{team.businessOwner}</Value>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <Label><li>Product Owner:</li></Label> <Value>{team.productOwner}</Value>
            </div>
          </BulletedList>
        )
      }
    />
  );
};

export default BusinessTeamSection;