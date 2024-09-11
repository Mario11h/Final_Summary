import * as Yup from "yup";

export const ProjectValidationSchema = Yup.object().shape({
  name: Yup.string().required("Project name is required"),
  code: Yup.string().required("Project code is required"),
  status: Yup.string().required("Project status is required"),
  description: Yup.string().required("Project status is reuired"),
  scope: Yup.string().required("Project scope is reuired"),
  goals: Yup.array().of(Yup.string().required("Each goal is required")),
  risks: Yup.array().required('Risk is required'),
  sponsor: Yup.string().required('Sponsor is required'),
  businessOwner: Yup.string().required('Business Owner is required'),
  productOwner: Yup.string().required('Product Owner is required'),
  pm: Yup.string().required('Project Manager is required'),
  deliveryTeam: Yup.string().required('Developer Team is required'),
  actualBudget: Yup.number().positive("Actual budget must be a positive number"),
  allocatedBudget: Yup.number().positive("Planned budget must be a positive number"),
  startDate: Yup.string()
    .nullable()
    .transform((value, originalValue) => {
      return originalValue === "" || originalValue === "00-00-00"
        ? null
        : value;
    }),
  endDate: Yup.string()
    .nullable()
    .transform((value, originalValue) => {
      return originalValue === "" || originalValue === "00-00-00"
        ? null
        : value;
    }),
  milestones: Yup.array().of(
    Yup.object().shape({
      title: Yup.string(),
      description: Yup.string(),
      deliveryDate: Yup.string()
        .nullable() // Allow null values
        .transform((value, originalValue) => {
          return originalValue === "" ? null : value; // Convert empty string to null
        }),
      status: Yup.string(),
    })
  ),
  roi: Yup.string(),
});
