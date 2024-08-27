import * as Yup from 'yup';

export const ProjectValidationSchema = Yup.object().shape({
  name: Yup.string().required('Project name is required'),
  code: Yup.string().required('Project code is required'),
  status: Yup.string().required('Project status is required'),
  description: Yup.string(),
  scope: Yup.string(),
  goals: Yup.array().of(
    Yup.string()
  ),
  risks: Yup.array().of(
    Yup.string()
  ),
  businessTeam: Yup.object().shape({
    sponsor: Yup.string(),
    businessOwner: Yup.string(),
    productOwner: Yup.string()
  }),
  hubTeam: Yup.object().shape({
    pm: Yup.string(),
    dev: Yup.string(),
  }),
  budget: Yup.object().shape({
    actual: Yup.number().positive('Actual budget must be a positive number'),
    planned: Yup.number().positive('Planned budget must be a positive number')
  }),
  startDate: Yup.date()
  .nullable()
  .transform((value, originalValue) => {
    return originalValue === '' || originalValue === '00-00-00' ? null : value;
  }),
endDate: Yup.date()
  .nullable()
  .transform((value, originalValue) => {
    return originalValue === '' || originalValue === '00-00-00' ? null : value;
  }),
  milestones: Yup.array().of(
    Yup.object().shape({
      title: Yup.string(),
      description: Yup.string(),
      date: Yup.date()
        .nullable() // Allow null values
        .transform((value, originalValue) => {
          return originalValue === '' ? null : value; // Convert empty string to null
        }),
      currentFlag: Yup.boolean()
    })
  ),
  roi: Yup.string(), 
});
