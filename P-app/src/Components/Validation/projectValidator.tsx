import { ProjectValidationSchema } from "./SchemaValidator"; // Ensure this path is correct
import { Project } from "./Type";
import * as Yup from "yup";
import debounce from "lodash/debounce"; // Import lodash debounce

// Debounce time (ms) - Adjust as needed
const DEBOUNCE_TIME = 300;

const validateProjectForm = debounce(
  async (values: Partial<Project>): Promise<Record<string, string>> => {
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
        console.log(errors);
        return errors;
      } else {
        throw err;
      }
    }
  },
  DEBOUNCE_TIME
);

export const generateLabel = (label: string, isRequired: boolean) => {
  return (
    <span>
      {label} {isRequired && <span>*</span>}
    </span>
  );
};

export default validateProjectForm;
