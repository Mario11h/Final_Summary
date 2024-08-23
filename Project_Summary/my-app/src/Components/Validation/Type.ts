export type BusinessTeam = {
    sponsor: string;
    businessOwner: string;
    productOwner: string;
  };
  
  export type HubTeam = {
    pm: string;
    dev: string;
    ba: string;
    qa?: string;
  };
  
  export type Budget = {
    actual?: number;
    planned?: number;
  };
  
  export type Milestone = {
    title: string;
    description: string;
    date: string;
    currentFlag: boolean;
  };
  
  export type Project = {
    id: number;
    name: string;
    code: string;
    status: string;
    description: string;
    scope: string;
    goals: string[];
    businessTeam: BusinessTeam;
    hubTeam: HubTeam;
    risks: string[];
    roi: string;
    budget: Budget;
    startDate: string;
    endDate: string;
    milestones: Milestone[];
  };