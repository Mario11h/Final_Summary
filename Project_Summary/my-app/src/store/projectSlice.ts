import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Import the local JSON data
import localProjectsData from '../data.json';

type BusinessTeam = {
  sponsor: string;
  businessOwner: string;
  productOwner: string;
};

type HubTeam = {
  pm: string;
  dev: string;
  ba: string;
  qa?: string;
};

type Budget = {
  actual?: number;
  planned?: number;
};

type Milestone = {
  id: number;
  title: string;
  description: string;
  date: Date;
  currentFlag: boolean;
};

type Project = {
  id:number;
  name: string;
  code: string;
  overview: string;
  status: string;
  description: string;
  scope: string;
  goals: string[];
  businessTeam: BusinessTeam;
  hubTeam: HubTeam;
  risks: string[];
  roi: string;
  budget: Budget;
  startDate: Date;
  endDate: Date;
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

// Update the loadProjects thunk
export const loadProjects = createAsyncThunk('projects/loadProjects', async () => {
  // Simulate an async operation
  return new Promise<Project[]>((resolve) => {
    setTimeout(() => {
      // Cast the localProjectsData to unknown first, then to Project[]
      resolve(localProjectsData as unknown as Project[]);
    }, 500);
  });
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
      .addCase(loadProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = action.payload;
      })
      .addCase(loadProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to load projects';
      });
  }
});

// Export the actions and reducer
export const { setCurrentPage } = projectSlice.actions;
export default projectSlice.reducer;