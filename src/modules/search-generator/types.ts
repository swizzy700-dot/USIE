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
  | 'enterprise-software-venture-capital'
  | 'saas-venture-capital'
  | 'artificial-intelligence-venture-capital'
  | 'machine-learning-venture-capital'
  | 'data-infrastructure-venture-capital'
  | 'cloud-computing-venture-capital'
  | 'developer-tools-venture-capital'
  | 'seed-venture-capital'
  | 'early-stage-venture-capital'
  | 'technology-venture-capital'
  | 'corporate-venture-capital'
  | 'family-offices-venture-capital'
  | 'private-equity-firms'
  | 'software-private-equity'
  | 'ai-private-equity'
  | 'growth-equity-firms'
  | 'enterprise-ai-venture-capital'
  | 'cloud-software-venture-capital';

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