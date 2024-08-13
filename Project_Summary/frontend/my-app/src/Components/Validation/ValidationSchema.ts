import * as Yup from 'yup';

export const ProjectValidationSchema = Yup.object().shape({
  name: Yup.string().required('Project name is required'),
  code: Yup.string().required('Project code is required'),
  overview: Yup.string().required('Project overview is required'),
  status: Yup.string().required('Project status is required'),
  start_date: Yup.date().required('Start date is required'),
  end_date: Yup.date().required('End date is required'),
  scope_description: Yup.string().required('Scope description is required'),
  goals: Yup.array().of(
    Yup.object().shape({
      id: Yup.number(),
      goal: Yup.string().required('Goal is required')
    })
  ),
  risks: Yup.array().of(
    Yup.object().shape({
      id: Yup.number(),
      risk_issue: Yup.string().required('Risk issue is required')
    })
  ),
  business_teams: Yup.array().of(
    Yup.object().shape({
      id: Yup.number(),
      executive_sponsor: Yup.string().required('Executive sponsor is required'),
      business_product: Yup.string().required('Business product is required'),
      process_owner: Yup.string().required('Process owner is required')
    })
  ),
  hub_teams: Yup.array().of(
    Yup.object().shape({
      id: Yup.number(),
      pm: Yup.string().required('PM is required'),
      dev_team: Yup.array().of(Yup.string().required('Dev team member is required'))
    })
  ),
  budgets: Yup.array().of(
    Yup.object().shape({
      id: Yup.number(),
      actual_budget: Yup.number().positive('Actual budget must be a positive number').required('Actual budget is required'),
      planned_budget: Yup.number().positive('Planned budget must be a positive number').required('Planned budget is required')
    })
  ),
  milestones: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required('Milestone title is required'),
      description: Yup.string().required('Milestone description is required'),
      date: Yup.date().required('Milestone date is required'),
      is_current_state: Yup.boolean()
    })
  )
});
