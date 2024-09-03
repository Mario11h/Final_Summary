export type Milestone = {
  id: number;
  title: string;
  description: string;
  deliveryDate: string;
  status: string;
};

export type Project = {
  id: number;
  name: string;
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