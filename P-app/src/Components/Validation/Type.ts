  
  export type HubTeam = {
    pm: string;
    deliveryTeam: string;
  };
  
  export type Budget = {
    actualBudget?: number;
    allocatedBudget?: number;
  };
  
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
    hubTeam: HubTeam;
    risks: string[];
    roi: string;
    budget: Budget;
    startDate: string;
    endDate: string;
    milestones: Milestone[];
  };