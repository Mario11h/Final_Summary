import * as Yup from 'yup';

export const ProjectValidationSchema = Yup.object().shape({
  name: Yup.string().required('Project name is required'),
  code: Yup.string().required('Project code is required'),
  status: Yup.string().required('Project status is required'),
  description: Yup.string(),
  scope: Yup.string().required('Project scope is required'),
  goals: Yup.array().of(
    Yup.string().required('Goal is required')
  ),
  risks: Yup.array().of(
    Yup.string().required('Risk is required')
  ),
  businessTeam: Yup.object().shape({
    sponsor: Yup.string().required('Sponsor is required'),
    businessOwner: Yup.string().required('Business owner is required'),
    productOwner: Yup.string().required('Product owner is required')
  }),
  hubTeam: Yup.object().shape({
    pm: Yup.string().required('PM is required'),
    dev: Yup.string().required('Dev team member is required'),
    ba: Yup.string().required('BA is required'),
    qa: Yup.string().notRequired(),  // Optional field
  }),
  budget: Yup.object().shape({
    actual: Yup.number().positive('Actual budget must be a positive number'),
    planned: Yup.number().positive('Planned budget must be a positive number')
  }),
  startDate: Yup.date()
    .nullable()
    .transform((value, originalValue) => {
      return originalValue === '' || originalValue === '00-00-00' ? null : value;
    })
    .required('Start date is required'),
  endDate: Yup.date()
    .nullable()
    .transform((value, originalValue) => {
      return originalValue === '' || originalValue === '00-00-00' ? null : value;
    })
    .required('End date is required'),
  milestones: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required('Milestone title is required'),
      description: Yup.string(),
      date: Yup.date()
        .nullable() // Allow null values
        .transform((value, originalValue) => {
          return originalValue === '' ? null : value; // Convert empty string to null
        }),
      currentFlag: Yup.boolean()
    })
  ),
  roi: Yup.string(), // Optional field
});
