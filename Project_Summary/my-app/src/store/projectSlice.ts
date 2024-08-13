import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define types for project data
type Goal = { id: number; goal: string; };
type Risk = { id: number; risk_issue: string; };
type BusinessTeam = { id: number; executive_sponsor: string; business_product: string; process_owner: string; };
type HubTeam = { id: number; pm: string; dev_team: string[]; };
type Budget = { id: number; actual_budget: number; planned_budget: number; };
type Milestone = { id: number; title: string; description: string; date: string; is_current_state: boolean; };
type Project = {
  id: number;
  name: string;
  code: string;
  overview: string;
  status: string;
  start_date: string;
  end_date: string;
  scope_description: string;
  goals: Goal[];
  risks: Risk[];
  business_teams: BusinessTeam[];
  hub_teams: HubTeam[];
  budgets: Budget[];
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

// Async thunk for fetching projects
export const fetchProjects = createAsyncThunk('projects/fetchProjects', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:3001/projects');
    return response.data.data.map((project: any) => ({
      ...project,
      hub_teams: project.hub_teams.map((team: any) => ({
        ...team,
        dev_team: JSON.parse(team.dev_team)
      }))
    }));
  } catch (error: any) {
    return rejectWithValue(error.response?.data || 'Failed to fetch projects');
  }
});

// Async thunk for deleting a project
export const deleteProject = createAsyncThunk('projects/deleteProject', async (projectId: number, { rejectWithValue }) => {
  try {
    await axios.delete(`http://localhost:3001/projects/${projectId}`);
    return projectId;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || 'Failed to delete project');
  }
});

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
      .addCase(fetchProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter(project => project.id !== action.payload);
        state.currentPage = 1; // Reset to the first page after deletion
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  }
});

// Export the actions and reducer
export const { setCurrentPage } = projectSlice.actions;
export default projectSlice.reducer;
