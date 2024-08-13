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

export const addProjectGoalsService = async (projectId: number, goals: string[]) => {
  try {
    const response = await axios.post(`http://localhost:3001/projects/${projectId}/goals`, { goal: goals }, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || 'Failed to add project goals');
  }
};

export const addProjectRisksService = async (projectId: number, risks: string[]) => {
  try {
    const response = await axios.post(`http://localhost:3001/projects/${projectId}/risks`, { risk_issue: risks }, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || 'Failed to add project risks');
  }
};

export const addProjectBusinessTeamService = async (projectId: number, businessTeam: { executive_sponsor: string; business_product: string; process_owner: string }) => {
  try {
    const response = await axios.post(`http://localhost:3001/projects/${projectId}/business_team`, businessTeam, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || 'Failed to add business team');
  }
};

export const addProjectHubTeamService = async (projectId: number, hubTeam: { pm: string; dev_team: string[] }) => {
  try {
    const response = await axios.post(`http://localhost:3001/projects/${projectId}/hub_team`, hubTeam, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || 'Failed to add hub team');
  }
};

export const addProjectBudgetService = async (projectId: number, budget: { actual_budget: number; planned_budget: number }) => {
  try {
    const response = await axios.post(`http://localhost:3001/projects/${projectId}/budgets`, budget, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || 'Failed to add project budget');
  }
};



export const addProjectMilestoneService = async (projectId: number, milestone: any) => {
  try {
    const response = await axios.post(`http://localhost:3001/projects/${projectId}/milestones`, milestone, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || 'Failed to add milestone');
  }
};



export const updateProjectService = async (projectId: number, updatedProject: any) => {
  try {
    const response = await axios.put(`http://localhost:3001/projects/${projectId}`, updatedProject, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || 'Failed to update project');
  }
};

export const updateProjectGoalsService = async (projectId: number, goalId: number, updatedGoal: string) => {
  try {
    const response = await axios.put(`http://localhost:3001/projects/${projectId}/goals/${goalId}`, { goal: updatedGoal }, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || 'Failed to update project goal');
  }
};

export const updateProjectRisksService = async (projectId: number, riskId: number, updatedRisk: string) => {
  try {
    const response = await axios.put(`http://localhost:3001/projects/${projectId}/risks/${riskId}`, { risk_issue: updatedRisk }, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || 'Failed to update project risk');
  }
};

export const updateProjectBusinessTeamService = async (projectId: number, businessTeamId: number, updatedBusinessTeam: { executive_sponsor: string; business_product: string; process_owner: string }) => {
  try {
    const response = await axios.put(`http://localhost:3001/projects/${projectId}/business_team/${businessTeamId}`, updatedBusinessTeam, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || 'Failed to update business team');
  }
};

export const updateProjectHubTeamService = async (projectId: number, hubTeamId: number, updatedHubTeam: { pm: string; dev_team: string[] }) => {
  try {
    const response = await axios.put(`http://localhost:3001/projects/${projectId}/hub_team/${hubTeamId}`, updatedHubTeam, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || 'Failed to update hub team');
  }
};

export const updateProjectBudgetService = async (projectId: number, budgetId: number, updatedBudget: { actual_budget: number; planned_budget: number }) => {
  try {
    const response = await axios.put(`http://localhost:3001/projects/${projectId}/budgets/${budgetId}`, updatedBudget, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || 'Failed to update project budget');
  }
};

export const updateProjectMilestoneService = async (projectId: number, milestoneId: number, updatedMilestone: any) => {
  try {
    const response = await axios.put(`http://localhost:3001/projects/${projectId}/milestones/${milestoneId}`, updatedMilestone, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || 'Failed to update milestone');
  }
};


export const deleteProjectGoalService = async (projectId: number, goalId: number) => {
  try {
    const response = await axios.delete(`http://localhost:3001/projects/${projectId}/goals/${goalId}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || 'Failed to delete Goal');
  }
  }

export const deleteProjectRiskService = async (projectId: number, riskId: number) => {
  try {
    const response = await axios.delete(`http://localhost:3001/projects/${projectId}/risks/${riskId}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || 'Failed to delete Risk');
  }
  }


export const deleteProjectMilestoneService = async (projectId: number, milestoneId: number) => {
  try {
    const response = await axios.delete(`http://localhost:3001/projects/${projectId}/milestones/${milestoneId}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || 'Failed to delete milestone');
  }
  }
