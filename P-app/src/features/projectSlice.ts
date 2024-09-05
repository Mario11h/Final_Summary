import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Project } from '../Components/Validation/Type';
import { ProjectState } from '../Components/Validation/interfaces';

// Define the initial state
const initialState: ProjectState = {
  projects: [],
  isLoading: false,
  error: null,
  status: "",
  currentPage: 1,
};

export const fetchProjects = createAsyncThunk<Project[], void, { rejectValue: string }>(
  'projects/fetchProjects',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Fetching projects...');
      const response = await axios.get<Project[]>('http://127.0.0.1:5000/');
      console.log('Projects fetched:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Failed to fetch projects:', error.message);
      return rejectWithValue(error.message || 'Failed to load projects');
    }
  }
);

// Async thunk to add a new project
export const addProject = createAsyncThunk<Project, Project, { rejectValue: string }>(
  'projects/addProject',
  async (newProject, { rejectWithValue }) => {
    console.log('Function addProject called with:', newProject);
    
    try {
      console.log('Attempting to add new project...');
      const response = await axios.post<Project>('http://127.0.0.1:5000/api/projects', newProject);
      console.log('Response received from server:', response);
      console.log('New project added:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Error occurred while adding project:', error);
      return rejectWithValue(error.message || 'Failed to add project');
    }
  }
);

// Async thunk to update a project
export const updateProject = createAsyncThunk<Project, Project, { rejectValue: string }>(
  'projects/updateProject',
  async (updatedProject, { rejectWithValue }) => {
    try {
      console.log('Updating project:', updatedProject);
      const response = await axios.put<Project>(`http://127.0.0.1:5000/api/projects/${updatedProject.id}`, updatedProject);
      console.log('Project updated:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Failed to update project:', error.message);
      return rejectWithValue(error.message || 'Failed to update project');
    }
  }
);

// Async thunk to delete a project
export const deleteProject = createAsyncThunk<void, number, { rejectValue: string }>(
  'projects/deleteProject',
  async (projectId, { rejectWithValue }) => {
    try {
      console.log('Attempting to delete project with id:', projectId);
      await axios.delete(`http://127.0.0.1:5000/api/projects/${projectId}`);
      console.log('Project deleted successfully');
    } catch (error: any) {
      console.error('Failed to delete project:', error.message);
      return rejectWithValue(error.message || 'Failed to delete project');
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
    clearError: (state) => {
      state.error = initialState.error
    },
    clearStatus: (state) => {
      state.status = initialState.status
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle loading projects
      .addCase(fetchProjects.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to load projects';
      })
      // Handle updating a project
      .addCase(updateProject.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status=""
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.projects.findIndex((project) => project.id === action.payload.id);
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
        state.status="success";
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to update project';
        state.status="error";
      })
      // Handle adding a new project
      .addCase(addProject.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status="";
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects.push(action.payload); // Add the new project to the state
        state.status="success";
      })
      .addCase(addProject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to add project';
        state.status="error";
      })
      // Handle deleting a project
      .addCase(deleteProject.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status="";
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.isLoading = false;
        // Remove the deleted project from the state
        state.projects = state.projects.filter(project => project.id !== action.meta.arg);
        state.status="success";
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to delete project';
        state.status="error";
      });
  },
});

// Export the actions and reducer
export const { setCurrentPage, clearError,clearStatus } = projectSlice.actions;
export default projectSlice.reducer;
