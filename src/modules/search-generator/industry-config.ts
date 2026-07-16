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
      'venture capital firm',
      'venture capital',
      'vc firm',
      'venture capital company',
      'venture capital investment',
      'venture capital fund',
      'vc investment',
      'venture capital investor'
    ],
    modifiers: [
      'top',
      'leading',
      'established',
      'professional',
      'investment',
      'capital',
      'fund',
      'portfolio'
    ],
    excludeTerms: ['diy', 'tutorial', 'how to']
  },
  'ai-venture-capital': {
    id: 'ai-venture-capital',
    name: 'AI Venture Capital',
    searchTerms: [
      'ai venture capital',
      'artificial intelligence venture capital',
      'ai vc firm',
      'ai investment fund',
      'ai startup funding',
      'ai venture investor',
      'artificial intelligence investment',
      'ai capital'
    ],
    modifiers: [
      'specialized',
      'focused',
      'leading',
      'investment',
      'startup',
      'technology',
      'fund',
      'early stage'
    ],
    excludeTerms: ['diy', 'tutorial', 'how to']
  },
  'software-venture-capital': {
    id: 'software-venture-capital',
    name: 'Software Venture Capital',
    searchTerms: [
      'software venture capital',
      'software vc firm',
      'software investment fund',
      'software startup funding',
      'software venture investor',
      'software company investment',
      'technology software capital',
      'software funding'
    ],
    modifiers: [
      'specialized',
      'focused',
      'leading',
      'investment',
      'startup',
      'technology',
      'fund',
      'early stage'
    ],
    excludeTerms: ['diy', 'tutorial', 'how to']
  },
  'enterprise-software-investors': {
    id: 'enterprise-software-investors',
    name: 'Enterprise Software Investors',
    searchTerms: [
      'enterprise software investor',
      'enterprise software funding',
      'b2b software investment',
      'enterprise software venture',
      'business software investor',
      'enterprise saas investment',
      'corporate software funding',
      'enterprise technology investor'
    ],
    modifiers: [
      'specialized',
      'focused',
      'leading',
      'investment',
      'b2b',
      'enterprise',
      'fund',
      'growth'
    ],
    excludeTerms: ['diy', 'tutorial', 'how to']
  },
  'saas-investors': {
    id: 'saas-investors',
    name: 'SaaS Investors',
    searchTerms: [
      'saas investor',
      'software as a service investor',
      'saas funding',
      'saas venture capital',
      'saas startup investment',
      'cloud software investor',
      'subscription software funding',
      'saas capital'
    ],
    modifiers: [
      'specialized',
      'focused',
      'leading',
      'investment',
      'startup',
      'cloud',
      'fund',
      'growth'
    ],
    excludeTerms: ['diy', 'tutorial', 'how to']
  },
  'artificial-intelligence-investors': {
    id: 'artificial-intelligence-investors',
    name: 'Artificial Intelligence Investors',
    searchTerms: [
      'artificial intelligence investor',
      'ai investor',
      'machine learning investor',
      'ai startup funding',
      'artificial intelligence investment',
      'ai venture capital',
      'deep learning investor',
      'ai technology funding'
    ],
    modifiers: [
      'specialized',
      'focused',
      'leading',
      'investment',
      'startup',
      'technology',
      'fund',
      'early stage'
    ],
    excludeTerms: ['diy', 'tutorial', 'how to']
  },
  'machine-learning-investors': {
    id: 'machine-learning-investors',
    name: 'Machine Learning Investors',
    searchTerms: [
      'machine learning investor',
      'ml investor',
      'machine learning funding',
      'ml startup investment',
      'machine learning venture capital',
      'ai ml investor',
      'deep learning funding',
      'ml technology investment'
    ],
    modifiers: [
      'specialized',
      'focused',
      'leading',
      'investment',
      'startup',
      'technology',
      'fund',
      'research'
    ],
    excludeTerms: ['diy', 'tutorial', 'how to']
  },
  'data-infrastructure-investors': {
    id: 'data-infrastructure-investors',
    name: 'Data Infrastructure Investors',
    searchTerms: [
      'data infrastructure investor',
      'data center investor',
      'infrastructure funding',
      'data platform investment',
      'cloud infrastructure investor',
      'data engineering funding',
      'big data infrastructure investment',
      'data storage investor'
    ],
    modifiers: [
      'specialized',
      'focused',
      'leading',
      'investment',
      'infrastructure',
      'technology',
      'fund',
      'growth'
    ],
    excludeTerms: ['diy', 'tutorial', 'how to']
  },
  'cloud-computing-investors': {
    id: 'cloud-computing-investors',
    name: 'Cloud Computing Investors',
    searchTerms: [
      'cloud computing investor',
      'cloud infrastructure investor',
      'cloud services funding',
      'cloud startup investment',
      'saas cloud investor',
      'cloud platform funding',
      'aws investor',
      'azure investment'
    ],
    modifiers: [
      'specialized',
      'focused',
      'leading',
      'investment',
      'cloud',
      'technology',
      'fund',
      'growth'
    ],
    excludeTerms: ['diy', 'tutorial', 'how to']
  },
  'developer-tools-investors': {
    id: 'developer-tools-investors',
    name: 'Developer Tools Investors',
    searchTerms: [
      'developer tools investor',
      'devtools funding',
      'developer platform investment',
      'software development tools investor',
      'devops investment',
      'coding tools funding',
      'developer experience investor',
      'api tools investment'
    ],
    modifiers: [
      'specialized',
      'focused',
      'leading',
      'investment',
      'developer',
      'technology',
      'fund',
      'early stage'
    ],
    excludeTerms: ['diy', 'tutorial', 'how to']
  },
  'seed-investors': {
    id: 'seed-investors',
    name: 'Seed Investors',
    searchTerms: [
      'seed investor',
      'seed funding',
      'seed capital',
      'seed round investor',
      'early stage seed funding',
      'seed startup investment',
      'pre-seed investor',
      'angel seed funding'
    ],
    modifiers: [
      'early stage',
      'startup',
      'angel',
      'investment',
      'capital',
      'fund',
      'venture',
      'pre-seed'
    ],
    excludeTerms: ['diy', 'tutorial', 'how to']
  },
  'early-stage-investors': {
    id: 'early-stage-investors',
    name: 'Early-Stage Investors',
    searchTerms: [
      'early stage investor',
      'early stage funding',
      'series a investor',
      'early startup investment',
      'early stage venture capital',
      'pre-series a funding',
      'early stage startup investor',
      'seed to series a investment'
    ],
    modifiers: [
      'early stage',
      'startup',
      'growth',
      'investment',
      'capital',
      'fund',
      'venture',
      'series a'
    ],
    excludeTerms: ['diy', 'tutorial', 'how to']
  },
  'technology-investment-firms': {
    id: 'technology-investment-firms',
    name: 'Technology Investment Firms',
    searchTerms: [
      'technology investment firm',
      'tech investment company',
      'technology venture firm',
      'tech capital firm',
      'technology investment fund',
      'tech startup investment',
      'digital technology investor',
      'tech growth firm'
    ],
    modifiers: [
      'leading',
      'established',
      'professional',
      'investment',
      'technology',
      'fund',
      'capital',
      'growth'
    ],
    excludeTerms: ['diy', 'tutorial', 'how to']
  },
  'corporate-venture-capital': {
    id: 'corporate-venture-capital',
    name: 'Corporate Venture Capital',
    searchTerms: [
      'corporate venture capital',
      'cvc firm',
      'corporate investment arm',
      'corporate venture fund',
      'strategic investment',
      'corporate startup investment',
      'strategic venture capital',
      'corporate innovation investment'
    ],
    modifiers: [
      'strategic',
      'corporate',
      'investment',
      'innovation',
      'fund',
      'venture',
      'capital',
      'growth'
    ],
    excludeTerms: ['diy', 'tutorial', 'how to']
  },
  'family-offices-technology': {
    id: 'family-offices-technology',
    name: 'Family Offices (Technology Investments)',
    searchTerms: [
      'family office technology investment',
      'family office tech investor',
      'family venture capital',
      'family office startup investment',
      'family office technology fund',
      'multi-family office tech',
      'single family office investment',
      'family office direct investment'
    ],
    modifiers: [
      'family',
      'private',
      'investment',
      'wealth',
      'fund',
      'direct',
      'technology',
      'startup'
    ],
    excludeTerms: ['diy', 'tutorial', 'how to']
  }
};

export function getIndustryConfig(industryId: string): IndustryConfig | undefined {
  return INDUSTRY_CONFIGS[industryId];
}

export function getAllIndustries(): IndustryConfig[] {
  return Object.values(INDUSTRY_CONFIGS);
}