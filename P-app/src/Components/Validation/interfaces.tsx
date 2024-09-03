import { Project } from '../Validation/Type';

export interface ProjectState {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
}

