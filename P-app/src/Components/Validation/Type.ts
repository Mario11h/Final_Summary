export type Milestone = {
  id: number;
  milestoneTitle: string;
  milestoneDescription: string;
  milestoneDeliveryDate: string;
  milestoneStatus: string;
};

export type Project = {
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