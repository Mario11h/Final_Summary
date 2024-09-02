import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import localProjectsData from '../api/data.json';

type Milestone = {
  id: number;
  milestoneTitle: string;
  milestoneDescription: string;
  milestoneDeliveryDate: string;
  milestoneStatus: string;
};

type Project = {
  id: number;
  projectName: string;
  code: string;
  description: string;
  status: string;
  scope: string;
  goals: string[];
  sponsor: string;
  businessOwner: string;
  productOwner: string;
  pm: string;
  deliveryTeam: string;
  risks: string[];
  roi: string;
  actualBudget?: number;
  allocatedBudget?: number;
  startDate: string;
  endDate: string;
  milestones: Milestone[];
};

// Define the state type
interface ProjectState {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
}

// Define the initial state
const initialState: ProjectState = {
  projects: [],
  isLoading: false,
  error: null,
  currentPage: 1,
};

// Async thunk to load projects (simulate API call)
export const loadProjects = createAsyncThunk<Project[], void, { rejectValue: string }>(
  'projects/loadProjects',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate loading local projects data synchronously
      const projects = localProjectsData as unknown as Project[];
      return projects;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to load projects');
    }
  }
);

// Async thunk to update a project
export const updateProject = createAsyncThunk<Project, Project, { rejectValue: string }>(
  'projects/updateProject',
  async (updatedProject, { rejectWithValue }) => {
    try {
      // Simulate API call or logic to update project
      // Replace this with actual API request if needed
      return updatedProject;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update project');
    }
  }
);

// Create the slice
const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle loading projects
      .addCase(loadProjects.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = action.payload;
      })
      .addCase(loadProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to load projects';
      })
      // Handle updating a project
      .addCase(updateProject.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.projects.findIndex((project) => project.id === action.payload.id);
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to update project';
      });
  },
});

// Export the actions and reducer
export const { setCurrentPage } = projectSlice.actions;
export default projectSlice.reducer;
