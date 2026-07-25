export enum KnowledgeDomain {
  BUSINESS = 'Business',
  STARTUP = 'Startup',
  MARKETING = 'Marketing',
  FINANCE = 'Finance',
  SOFTWARE_DEVELOPMENT = 'Software Development',
  COLLEGE_PROJECTS = 'College Projects',
  EDUCATION = 'Education',
  HEALTHCARE = 'Healthcare',
  GOVERNMENT_SCHEMES = 'Government Schemes',
  LEGAL_BASICS = 'Legal Basics',
  TECHNOLOGY = 'Technology',
  DIGITAL_MARKETING = 'Digital Marketing',
  ENTREPRENEURSHIP = 'Entrepreneurship',
  GENERAL_KNOWLEDGE = 'General Knowledge'
}

export interface KnowledgeDocument {
  id: string;
  domain: KnowledgeDomain;
  title: string;
  content: string;
  sourceUrl?: string;
  author?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SearchResult {
  document: KnowledgeDocument;
  score: number;
  relevance: number;
  confidence: number;
  freshness: number;
  priority: number;
}
