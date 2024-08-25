import * as Yup from 'yup';

export const ProjectValidationSchema = Yup.object().shape({
  name: Yup.string().required('Project name is required'),
  code: Yup.string().required('Project code is required'),
  status: Yup.string().required('Project status is required'),
  overview: Yup.string().required('Project overview is required'),
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
    actual: Yup.number().positive('Actual budget must be a positive number').notRequired(),
    planned: Yup.number().positive('Planned budget must be a positive number').notRequired()
  }),
  startDate: Yup.date().required('Start date is required'),
  endDate: Yup.date().required('End date is required'),
  milestones: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required('Milestone title is required'),
      description: Yup.string().required('Milestone description is required'),
      date: Yup.date().required('Milestone date is required'),
      currentFlag: Yup.boolean()
    })
  ),
  roi: Yup.string().notRequired(), // Optional field
});