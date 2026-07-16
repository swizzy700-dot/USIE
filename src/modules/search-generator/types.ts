/**
 * Search Generator Types
 * Defines data structures for search target generation
 */

export type IndustryType = 
  | 'roofing-company'
  | 'plumbing'
  | 'hvac-company'
  | 'electrician'
  | 'landscaping-company'
  | 'dentist'
  | 'real-estate'
  | 'painting-contractor'
  | 'tree-service'
  | 'general-contractor'
  | 'venture-capital-firms'
  | 'ai-venture-capital'
  | 'software-venture-capital'
  | 'enterprise-software-investors'
  | 'saas-investors'
  | 'artificial-intelligence-investors'
  | 'machine-learning-investors'
  | 'data-infrastructure-investors'
  | 'cloud-computing-investors'
  | 'developer-tools-investors'
  | 'seed-investors'
  | 'early-stage-investors'
  | 'technology-investment-firms'
  | 'corporate-venture-capital'
  | 'family-offices-technology'
  | 'private-equity-technology'
  | 'software-private-equity'
  | 'ai-private-equity'
  | 'growth-equity-software'
  | 'enterprise-ai-investors'
  | 'cloud-software-investors';

export interface IndustryConfig {
  id: IndustryType;
  name: string;
  searchTerms: string[];
  modifiers: string[];
  excludeTerms?: string[];
}

export interface SearchTarget {
  id: string;
  industry: string;
  city: string;
  state: string;
  zip: string;
  searchTerm: string;
  generatedAt: Date;
}

export interface SearchGenerationRequest {
  industry: IndustryType;
  state: string;
  city: string;
  zipCount: number;
  batchSize: number;
}

export interface SearchBatch {
  id: string;
  targets: SearchTarget[];
  batchNumber: number;
  totalBatches: number;
  generatedAt: Date;
}

export interface SearchState {
  completedSearches: Set<string>; // Set of unique search identifiers
  currentBatch: number;
  totalBatches: number;
  remainingTargets: SearchTarget[];
}

export interface SearchGeneratorOptions {
  maxBatchSize?: number;
  preventRepeats?: boolean;
  includeModifiers?: boolean;
}