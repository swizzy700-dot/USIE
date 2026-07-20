/**
 * Industry Configuration
 * Defines search patterns and terms for each supported industry
 */

import { IndustryConfig } from './types';

export const INDUSTRY_CONFIGS: Record<string, IndustryConfig> = {
  'roofing-company': {
    id: 'roofing-company',
    name: 'Roofing Company',
    searchTerms: [
      'roofing company',
      'roofing contractor',
      'roof repair',
      'roof installation',
      'commercial roofing',
      'residential roofing',
      'roof replacement',
      'roof inspection'
    ],
    modifiers: [
      'best',
      'top rated',
      'affordable',
      'licensed',
      'insured',
      'professional',
      'local',
      'certified'
    ],
    excludeTerms: ['diy', 'tutorial', 'how to']
  },
  'plumbing': {
    id: 'plumbing',
    name: 'Plumbing',
    searchTerms: [
      'plumbing company',
      'plumber',
      'plumbing services',
      'emergency plumber',
      'plumbing repair',
      'drain cleaning',
      'water heater',
      'pipe repair'
    ],
    modifiers: [
      '24 hour',
      'emergency',
      'licensed',
      'insured',
      'professional',
      'local',
      'residential',
      'commercial'
    ],
    excludeTerms: ['diy', 'tutorial', 'how to']
  },
  'hvac-company': {
    id: 'hvac-company',
    name: 'HVAC Company',
    searchTerms: [
      'hvac company',
      'hvac contractor',
      'air conditioning',
      'heating contractor',
      'hvac installation',
      'hvac repair',
      'hvac service',
      'furnace repair'
    ],
    modifiers: [
      'licensed',
      'insured',
      'professional',
      'local',
      'certified',
      'residential',
      'commercial',
      'emergency'
    ],
    excludeTerms: ['diy', 'tutorial', 'how to']
  },
  'electrician': {
    id: 'electrician',
    name: 'Electrician',
    searchTerms: [
      'electrician',
      'electrical contractor',
      'electrical services',
      'electrical repair',
      'electric company',
      'residential electrician',
      'commercial electrician',
      'emergency electrician'
    ],
    modifiers: [
      'licensed',
      'insured',
      'professional',
      'local',
      'certified',
      '24 hour',
      'emergency',
      'bonded'
    ],
    excludeTerms: ['diy', 'tutorial', 'how to']
  },
  'landscaping-company': {
    id: 'landscaping-company',
    name: 'Landscaping Company',
    searchTerms: [
      'landscaping company',
      'landscaper',
      'landscaping services',
      'lawn care',
      'landscape design',
      'landscape maintenance',
      'lawn service',
      'yard work'
    ],
    modifiers: [
      'professional',
      'local',
      'affordable',
      'residential',
      'commercial',
      'full service',
      'certified',
      'experienced'
    ],
    excludeTerms: ['diy', 'tutorial', 'how to']
  },
  'dentist': {
    id: 'dentist',
    name: 'Dentist',
    searchTerms: [
      'dentist',
      'dental clinic',
      'dental office',
      'dental care',
      'family dentist',
      'cosmetic dentist',
      'dental services',
      'emergency dentist'
    ],
    modifiers: [
      'best',
      'top rated',
      'affordable',
      'local',
      'professional',
      'family',
      'cosmetic',
      'emergency'
    ],
    excludeTerms: ['diy', 'tutorial', 'how to']
  },
  'real-estate': {
    id: 'real-estate',
    name: 'Real Estate',
    searchTerms: [
      'real estate',
      'real estate agent',
      'real estate broker',
      'real estate company',
      'real estate services',
      'real estate agency',
      'real estate firm',
      'real estate office'
    ],
    modifiers: [
      'licensed',
      'insured',
      'professional',
      'local',
      'certified',
      'residential',
      'commercial',
      'experienced'
    ],
    excludeTerms: ['diy', 'tutorial', 'how to']
  },
  'painting-contractor': {
    id: 'painting-contractor',
    name: 'Painting Contractor',
    searchTerms: [
      'painting contractor',
      'painting company',
      'house painter',
      'commercial painting',
      'residential painting',
      'exterior painting',
      'interior painting',
      'painting services'
    ],
    modifiers: [
      'licensed',
      'insured',
      'professional',
      'local',
      'certified',
      'affordable',
      'quality',
      'experienced'
    ],
    excludeTerms: ['diy', 'tutorial', 'how to']
  },
  'tree-service': {
    id: 'tree-service',
    name: 'Tree Service',
    searchTerms: [
      'tree service',
      'tree removal',
      'tree trimming',
      'arborist',
      'tree care',
      'tree surgery',
      'tree pruning',
      'stump removal'
    ],
    modifiers: [
      'licensed',
      'insured',
      'professional',
      'local',
      'certified',
      'emergency',
      'affordable',
      'experienced'
    ],
    excludeTerms: ['diy', 'tutorial', 'how to']
  },
  'general-contractor': {
    id: 'general-contractor',
    name: 'General Contractor',
    searchTerms: [
      'general contractor',
      'construction company',
      'building contractor',
      'home builder',
      'commercial contractor',
      'renovation contractor',
      'remodeling contractor',
      'construction services'
    ],
    modifiers: [
      'licensed',
      'insured',
      'professional',
      'local',
      'certified',
      'experienced',
      'quality',
      'reliable'
    ],
    excludeTerms: ['diy', 'tutorial', 'how to']
  },
  'venture-capital-firms': {
    id: 'venture-capital-firms',
    name: 'Venture Capital Firms',
    searchTerms: [
      'Private Equity Firms',
      'Venture Capital Firms',
      'Venture Capital',
      'Private Equity',
      'Technology Venture Capital',
      'AI Venture Capital',
      'Software Venture Capital',
      'Enterprise Software Investors',
      'B2B Software Investors',
      'Growth Equity Firms'
    ],
    modifiers: [
      'top',
      'leading',
      'established',
      'capital',
      'fund',
      'portfolio',
      'startup',
      'early stage'
    ],
    excludeTerms: ['diy', 'tutorial', 'how to', 'financial advisor', 'wealth management', 'retirement', 'brokerage', 'insurance', 'wealth manager', 'financial planner', 'investment adviser']
  },
  'ai-venture-capital': {
    id: 'ai-venture-capital',
    name: 'AI Venture Capital',
    searchTerms: [
      'Private Equity Firms',
      'Venture Capital Firms',
      'Venture Capital',
      'Private Equity',
      'Technology Venture Capital',
      'AI Venture Capital',
      'Software Venture Capital',
      'Enterprise Software Investors',
      'B2B Software Investors',
      'Growth Equity Firms'
    ],
    modifiers: [
      'specialized',
      'focused',
      'leading',
      'startup',
      'technology',
      'fund',
      'early stage',
      'seed'
    ],
    excludeTerms: ['diy', 'tutorial', 'how to', 'financial advisor', 'wealth management', 'retirement', 'brokerage', 'insurance', 'wealth manager', 'financial planner', 'investment adviser']
  },
  'software-venture-capital': {
    id: 'software-venture-capital',
    name: 'Software Venture Capital',
    searchTerms: [
      'Private Equity Firms',
      'Venture Capital Firms',
      'Venture Capital',
      'Private Equity',
      'Technology Venture Capital',
      'AI Venture Capital',
      'Software Venture Capital',
      'Enterprise Software Investors',
      'B2B Software Investors',
      'Growth Equity Firms'
    ],
    modifiers: [
      'specialized',
      'focused',
      'leading',
      'startup',
      'technology',
      'fund',
      'early stage',
      'seed'
    ],
    excludeTerms: ['diy', 'tutorial', 'how to', 'financial advisor', 'wealth management', 'retirement', 'brokerage', 'insurance', 'wealth manager', 'financial planner', 'investment adviser']
  },
  'enterprise-software-investors': {
    id: 'enterprise-software-investors',
    name: 'Enterprise Software Investors',
    searchTerms: [
      'Private Equity Firms',
      'Venture Capital Firms',
      'Venture Capital',
      'Private Equity',
      'Technology Venture Capital',
      'AI Venture Capital',
      'Software Venture Capital',
      'Enterprise Software Investors',
      'B2B Software Investors',
      'Growth Equity Firms'
    ],
    modifiers: [
      'specialized',
      'focused',
      'leading',
      'b2b',
      'enterprise',
      'fund',
      'growth',
      'venture'
    ],
    excludeTerms: ['diy', 'tutorial', 'how to', 'financial advisor', 'wealth management', 'retirement', 'brokerage', 'insurance', 'wealth manager', 'financial planner', 'investment adviser']
  },
  'saas-investors': {
    id: 'saas-investors',
    name: 'SaaS Investors',
    searchTerms: [
      'Private Equity Firms',
      'Venture Capital Firms',
      'Venture Capital',
      'Private Equity',
      'Technology Venture Capital',
      'AI Venture Capital',
      'Software Venture Capital',
      'Enterprise Software Investors',
      'B2B Software Investors',
      'Growth Equity Firms'
    ],
    modifiers: [
      'specialized',
      'focused',
      'leading',
      'startup',
      'cloud',
      'fund',
      'growth',
      'venture'
    ],
    excludeTerms: ['diy', 'tutorial', 'how to', 'financial advisor', 'wealth management', 'retirement', 'brokerage', 'insurance', 'wealth manager', 'financial planner', 'investment adviser']
  },
  'artificial-intelligence-investors': {
    id: 'artificial-intelligence-investors',
    name: 'Artificial Intelligence Investors',
    searchTerms: [
      'Private Equity Firms',
      'Venture Capital Firms',
      'Venture Capital',
      'Private Equity',
      'Technology Venture Capital',
      'AI Venture Capital',
      'Software Venture Capital',
      'Enterprise Software Investors',
      'B2B Software Investors',
      'Growth Equity Firms'
    ],
    modifiers: [
      'specialized',
      'focused',
      'leading',
      'startup',
      'technology',
      'fund',
      'early stage',
      'seed'
    ],
    excludeTerms: ['diy', 'tutorial', 'how to', 'financial advisor', 'wealth management', 'retirement', 'brokerage', 'insurance', 'wealth manager', 'financial planner', 'investment adviser']
  },
  'machine-learning-investors': {
    id: 'machine-learning-investors',
    name: 'Machine Learning Investors',
    searchTerms: [
      'Private Equity Firms',
      'Venture Capital Firms',
      'Venture Capital',
      'Private Equity',
      'Technology Venture Capital',
      'AI Venture Capital',
      'Software Venture Capital',
      'Enterprise Software Investors',
      'B2B Software Investors',
      'Growth Equity Firms'
    ],
    modifiers: [
      'specialized',
      'focused',
      'leading',
      'startup',
      'technology',
      'fund',
      'research',
      'early stage'
    ],
    excludeTerms: ['diy', 'tutorial', 'how to', 'financial advisor', 'wealth management', 'retirement', 'brokerage', 'insurance', 'wealth manager', 'financial planner', 'investment adviser']
  },
  'data-infrastructure-investors': {
    id: 'data-infrastructure-investors',
    name: 'Data Infrastructure Investors',
    searchTerms: [
      'Private Equity Firms',
      'Venture Capital Firms',
      'Venture Capital',
      'Private Equity',
      'Technology Venture Capital',
      'AI Venture Capital',
      'Software Venture Capital',
      'Enterprise Software Investors',
      'B2B Software Investors',
      'Growth Equity Firms'
    ],
    modifiers: [
      'specialized',
      'focused',
      'leading',
      'infrastructure',
      'technology',
      'fund',
      'growth',
      'venture'
    ],
    excludeTerms: ['diy', 'tutorial', 'how to', 'financial advisor', 'wealth management', 'retirement', 'brokerage']
  },
  'cloud-computing-investors': {
    id: 'cloud-computing-investors',
    name: 'Cloud Computing Investors',
    searchTerms: [
      'Private Equity Firms',
      'Venture Capital Firms',
      'Venture Capital',
      'Private Equity',
      'Technology Venture Capital',
      'AI Venture Capital',
      'Software Venture Capital',
      'Enterprise Software Investors',
      'B2B Software Investors',
      'Growth Equity Firms'
    ],
    modifiers: [
      'specialized',
      'focused',
      'leading',
      'cloud',
      'technology',
      'fund',
      'growth',
      'venture'
    ],
    excludeTerms: ['diy', 'tutorial', 'how to', 'financial advisor', 'wealth management', 'retirement', 'brokerage', 'insurance', 'wealth manager', 'financial planner', 'investment adviser']
  },
  'developer-tools-investors': {
    id: 'developer-tools-investors',
    name: 'Developer Tools Investors',
    searchTerms: [
      'Private Equity Firms',
      'Venture Capital Firms',
      'Venture Capital',
      'Private Equity',
      'Technology Venture Capital',
      'AI Venture Capital',
      'Software Venture Capital',
      'Enterprise Software Investors',
      'B2B Software Investors',
      'Growth Equity Firms'
    ],
    modifiers: [
      'specialized',
      'focused',
      'leading',
      'developer',
      'technology',
      'fund',
      'early stage',
      'venture'
    ],
    excludeTerms: ['diy', 'tutorial', 'how to', 'financial advisor', 'wealth management', 'retirement', 'brokerage', 'insurance', 'wealth manager', 'financial planner', 'investment adviser']
  },
  'seed-investors': {
    id: 'seed-investors',
    name: 'Seed Investors',
    searchTerms: [
      'Private Equity Firms',
      'Venture Capital Firms',
      'Venture Capital',
      'Private Equity',
      'Technology Venture Capital',
      'AI Venture Capital',
      'Software Venture Capital',
      'Enterprise Software Investors',
      'B2B Software Investors',
      'Growth Equity Firms'
    ],
    modifiers: [
      'early stage',
      'startup',
      'angel',
      'capital',
      'fund',
      'venture',
      'pre-seed',
      'vc'
    ],
    excludeTerms: ['diy', 'tutorial', 'how to', 'financial advisor', 'wealth management', 'retirement', 'brokerage', 'insurance', 'wealth manager', 'financial planner', 'investment adviser']
  },
  'early-stage-investors': {
    id: 'early-stage-investors',
    name: 'Early-Stage Investors',
    searchTerms: [
      'Private Equity Firms',
      'Venture Capital Firms',
      'Venture Capital',
      'Private Equity',
      'Technology Venture Capital',
      'AI Venture Capital',
      'Software Venture Capital',
      'Enterprise Software Investors',
      'B2B Software Investors',
      'Growth Equity Firms'
    ],
    modifiers: [
      'early stage',
      'startup',
      'growth',
      'capital',
      'fund',
      'venture',
      'series a',
      'technology'
    ],
    excludeTerms: ['diy', 'tutorial', 'how to', 'financial advisor', 'wealth management', 'retirement', 'brokerage', 'insurance', 'wealth manager', 'financial planner', 'investment adviser']
  },
  'technology-investment-firms': {
    id: 'technology-investment-firms',
    name: 'Technology Investment Firms',
    searchTerms: [
      'Private Equity Firms',
      'Venture Capital Firms',
      'Venture Capital',
      'Private Equity',
      'Technology Venture Capital',
      'AI Venture Capital',
      'Software Venture Capital',
      'Enterprise Software Investors',
      'B2B Software Investors',
      'Growth Equity Firms'
    ],
    modifiers: [
      'leading',
      'established',
      'technology',
      'fund',
      'capital',
      'growth',
      'venture',
      'startup'
    ],
    excludeTerms: ['diy', 'tutorial', 'how to', 'financial advisor', 'wealth management', 'retirement', 'brokerage', 'insurance', 'wealth manager', 'financial planner', 'investment adviser']
  },
  'corporate-venture-capital': {
    id: 'corporate-venture-capital',
    name: 'Corporate Venture Capital',
    searchTerms: [
      'Private Equity Firms',
      'Venture Capital Firms',
      'Venture Capital',
      'Private Equity',
      'Technology Venture Capital',
      'AI Venture Capital',
      'Software Venture Capital',
      'Enterprise Software Investors',
      'B2B Software Investors',
      'Growth Equity Firms'
    ],
    modifiers: [
      'strategic',
      'corporate',
      'innovation',
      'fund',
      'venture',
      'capital',
      'growth',
      'startup'
    ],
    excludeTerms: ['diy', 'tutorial', 'how to', 'financial advisor', 'wealth management', 'retirement', 'brokerage', 'insurance', 'wealth manager', 'financial planner', 'investment adviser']
  },
  'family-offices-technology': {
    id: 'family-offices-technology',
    name: 'Family Offices (Technology Investments)',
    searchTerms: [
      'Private Equity Firms',
      'Venture Capital Firms',
      'Venture Capital',
      'Private Equity',
      'Technology Venture Capital',
      'AI Venture Capital',
      'Software Venture Capital',
      'Enterprise Software Investors',
      'B2B Software Investors',
      'Growth Equity Firms'
    ],
    modifiers: [
      'family',
      'private',
      'wealth',
      'fund',
      'direct',
      'technology',
      'startup',
      'venture'
    ],
    excludeTerms: ['diy', 'tutorial', 'how to', 'financial advisor', 'wealth management', 'retirement', 'brokerage', 'insurance', 'wealth manager', 'financial planner', 'investment adviser']
  },
  'private-equity-technology': {
    id: 'private-equity-technology',
    name: 'Private Equity Technology Firms',
    searchTerms: [
      'Private Equity Firms',
      'Venture Capital Firms',
      'Venture Capital',
      'Private Equity',
      'Technology Venture Capital',
      'AI Venture Capital',
      'Software Venture Capital',
      'Enterprise Software Investors',
      'B2B Software Investors',
      'Growth Equity Firms'
    ],
    modifiers: [
      'private equity',
      'buyout',
      'growth',
      'technology',
      'fund',
      'capital',
      'investment',
      'firm'
    ],
    excludeTerms: ['diy', 'tutorial', 'how to', 'financial advisor', 'wealth management', 'retirement', 'brokerage', 'insurance', 'wealth manager', 'financial planner', 'investment adviser']
  },
  'software-private-equity': {
    id: 'software-private-equity',
    name: 'Software Private Equity Firms',
    searchTerms: [
      'Private Equity Firms',
      'Venture Capital Firms',
      'Venture Capital',
      'Private Equity',
      'Technology Venture Capital',
      'AI Venture Capital',
      'Software Venture Capital',
      'Enterprise Software Investors',
      'B2B Software Investors',
      'Growth Equity Firms'
    ],
    modifiers: [
      'private equity',
      'software',
      'buyout',
      'growth',
      'fund',
      'capital',
      'saas',
      'enterprise'
    ],
    excludeTerms: ['diy', 'tutorial', 'how to', 'financial advisor', 'wealth management', 'retirement', 'brokerage', 'insurance', 'wealth manager', 'financial planner', 'investment adviser']
  },
  'ai-private-equity': {
    id: 'ai-private-equity',
    name: 'AI Private Equity Firms',
    searchTerms: [
      'Private Equity Firms',
      'Venture Capital Firms',
      'Venture Capital',
      'Private Equity',
      'Technology Venture Capital',
      'AI Venture Capital',
      'Software Venture Capital',
      'Enterprise Software Investors',
      'B2B Software Investors',
      'Growth Equity Firms'
    ],
    modifiers: [
      'private equity',
      'artificial intelligence',
      'buyout',
      'growth',
      'fund',
      'capital',
      'technology',
      'machine learning'
    ],
    excludeTerms: ['diy', 'tutorial', 'how to', 'financial advisor', 'wealth management', 'retirement', 'brokerage', 'insurance', 'wealth manager', 'financial planner', 'investment adviser']
  },
  'growth-equity-software': {
    id: 'growth-equity-software',
    name: 'Growth Equity Software Firms',
    searchTerms: [
      'Private Equity Firms',
      'Venture Capital Firms',
      'Venture Capital',
      'Private Equity',
      'Technology Venture Capital',
      'AI Venture Capital',
      'Software Venture Capital',
      'Enterprise Software Investors',
      'B2B Software Investors',
      'Growth Equity Firms'
    ],
    modifiers: [
      'growth equity',
      'software',
      'expansion',
      'capital',
      'fund',
      'investment',
      'saas',
      'enterprise'
    ],
    excludeTerms: ['diy', 'tutorial', 'how to', 'financial advisor', 'wealth management', 'retirement', 'brokerage', 'insurance', 'wealth manager', 'financial planner', 'investment adviser']
  },
  'enterprise-ai-investors': {
    id: 'enterprise-ai-investors',
    name: 'Enterprise AI Investors',
    searchTerms: [
      'Private Equity Firms',
      'Venture Capital Firms',
      'Venture Capital',
      'Private Equity',
      'Technology Venture Capital',
      'AI Venture Capital',
      'Software Venture Capital',
      'Enterprise Software Investors',
      'B2B Software Investors',
      'Growth Equity Firms'
    ],
    modifiers: [
      'enterprise',
      'artificial intelligence',
      'b2b',
      'venture',
      'fund',
      'investment',
      'corporate',
      'machine learning'
    ],
    excludeTerms: ['diy', 'tutorial', 'how to', 'financial advisor', 'wealth management', 'retirement', 'brokerage', 'insurance', 'wealth manager', 'financial planner', 'investment adviser']
  },
  'cloud-software-investors': {
    id: 'cloud-software-investors',
    name: 'Cloud Software Investors',
    searchTerms: [
      'Private Equity Firms',
      'Venture Capital Firms',
      'Venture Capital',
      'Private Equity',
      'Technology Venture Capital',
      'AI Venture Capital',
      'Software Venture Capital',
      'Enterprise Software Investors',
      'B2B Software Investors',
      'Growth Equity Firms'
    ],
    modifiers: [
      'cloud',
      'software',
      'venture',
      'fund',
      'investment',
      'saas',
      'infrastructure',
      'platform'
    ],
    excludeTerms: ['diy', 'tutorial', 'how to', 'financial advisor', 'wealth management', 'retirement', 'brokerage', 'insurance', 'wealth manager', 'financial planner', 'investment adviser']
  }
};

export function getIndustryConfig(industryId: string): IndustryConfig | undefined {
  return INDUSTRY_CONFIGS[industryId];
}

export function getAllIndustries(): IndustryConfig[] {
  return Object.values(INDUSTRY_CONFIGS);
}