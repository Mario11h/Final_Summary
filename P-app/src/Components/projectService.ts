// services/projectServices.ts

import axios from 'axios';

export const addNewProjectService = async (newProject: any) => {
  try {
    const response = await axios.post('http://localhost:3001/projects', newProject, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || 'Failed to add new project');
  }
};