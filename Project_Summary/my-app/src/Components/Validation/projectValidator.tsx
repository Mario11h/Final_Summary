// src/validateProjectForm.ts
import { ProjectValidationSchema } from './SchemaValidator'; // Make sure this path is correct
import { Project } from './Type';
import * as Yup from 'yup';

const validateProjectForm = async (values: Partial<Project>): Promise<Record<string, string>> => {
  try {
    await ProjectValidationSchema.validate(values, { abortEarly: false });
    return {};
  } catch (err: unknown) {
    if (err instanceof Yup.ValidationError) {
      const errors: Record<string, string> = {};
      err.inner.forEach((error) => {
        if (error.path) {
          errors[error.path] = error.message;
        }
      });
      console.log(errors)
      return errors;
    } else {
      throw err;
    }
  }
};
export const generateLabel = (label: string, isRequired: boolean) => {
  return (
    <span>
      {label} {isRequired && <span style={{ color: "red" }}>*</span>}
    </span>
  );
};

export default validateProjectForm;
