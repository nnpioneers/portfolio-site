export interface DBBusinessPlan {
  _id: string;
  businessId: string;
  generatedByUserId: string;
  content: string;
  executiveSummary?: string;
  marketAnalysis?: string;
  financialProjections?: string;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface DBFinanceReport {
  _id: string;
  businessId: string;
  budgetCap: number;
  currency: string;
  burnRate?: number;
  runwayMonths?: number;
  allocations: Record<string, number>;
  createdAt: string;
}

export interface DBStrategyReport {
  _id: string;
  businessId: string;
  goals: string[];
  milestones: { title: string; targetDate: string; completed: boolean }[];
  riskAnalysis?: string;
  createdAt: string;
}

export interface DBLocationReport {
  _id: string;
  businessId: string;
  targetRegion: string;
  demographics: Record<string, any>;
  competitors: string[];
  createdAt: string;
}
