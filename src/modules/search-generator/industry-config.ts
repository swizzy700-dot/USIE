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
      'venture capital fund',
      'venture capital portfolio',
      'venture capital backed',
      'vc startup funding',
      'venture capital investment group'
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
    excludeTerms: ['diy', 'tutorial', 'how to', 'financial advisor', 'wealth management', 'retirement', 'brokerage']
  },
  'ai-venture-capital': {
    id: 'ai-venture-capital',
    name: 'AI Venture Capital',
    searchTerms: [
      'ai venture capital',
      'artificial intelligence venture capital',
      'ai vc firm',
      'ai startup funding',
      'ai venture investor',
      'artificial intelligence vc',
      'machine learning venture capital',
      'deep learning startup funding'
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
    excludeTerms: ['diy', 'tutorial', 'how to', 'financial advisor', 'wealth management', 'retirement', 'brokerage']
  },
  'software-venture-capital': {
    id: 'software-venture-capital',
    name: 'Software Venture Capital',
    searchTerms: [
      'software venture capital',
      'software vc firm',
      'software startup funding',
      'software venture investor',
      'technology software capital',
      'software company vc',
      'enterprise software venture capital',
      'saas venture capital'
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
    excludeTerms: ['diy', 'tutorial', 'how to', 'financial advisor', 'wealth management', 'retirement', 'brokerage']
  },
  'enterprise-software-investors': {
    id: 'enterprise-software-investors',
    name: 'Enterprise Software Investors',
    searchTerms: [
      'enterprise software venture capital',
      'b2b software vc',
      'enterprise software funding',
      'business software investor',
      'enterprise saas venture',
      'corporate software vc',
      'enterprise technology investor',
      'b2b saas funding'
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
    excludeTerms: ['diy', 'tutorial', 'how to', 'financial advisor', 'wealth management', 'retirement', 'brokerage']
  },
  'saas-investors': {
    id: 'saas-investors',
    name: 'SaaS Investors',
    searchTerms: [
      'saas venture capital',
      'software as a service vc',
      'saas funding',
      'saas startup investment',
      'cloud software vc',
      'subscription software venture',
      'b2b saas investor',
      'saas growth equity'
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
    excludeTerms: ['diy', 'tutorial', 'how to', 'financial advisor', 'wealth management', 'retirement', 'brokerage']
  },
  'artificial-intelligence-investors': {
    id: 'artificial-intelligence-investors',
    name: 'Artificial Intelligence Investors',
    searchTerms: [
      'artificial intelligence venture capital',
      'ai startup funding',
      'ai venture investor',
      'machine learning vc',
      'deep learning startup funding',
      'ai technology venture',
      'artificial intelligence startup investor',
      'ml venture capital'
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
    excludeTerms: ['diy', 'tutorial', 'how to', 'financial advisor', 'wealth management', 'retirement', 'brokerage']
  },
  'machine-learning-investors': {
    id: 'machine-learning-investors',
    name: 'Machine Learning Investors',
    searchTerms: [
      'machine learning venture capital',
      'ml startup funding',
      'machine learning vc',
      'deep learning startup investment',
      'ai ml venture',
      'ml technology funding',
      'machine learning startup investor',
      'deep learning vc'
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
    excludeTerms: ['diy', 'tutorial', 'how to', 'financial advisor', 'wealth management', 'retirement', 'brokerage']
  },
  'data-infrastructure-investors': {
    id: 'data-infrastructure-investors',
    name: 'Data Infrastructure Investors',
    searchTerms: [
      'data infrastructure venture capital',
      'data center vc',
      'infrastructure funding',
      'data platform venture',
      'cloud infrastructure investor',
      'data engineering startup funding',
      'big data infrastructure vc',
      'data storage venture capital'
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
      'cloud computing venture capital',
      'cloud infrastructure vc',
      'cloud services funding',
      'cloud startup investment',
      'saas cloud venture',
      'cloud platform vc',
      'infrastructure as a service investor',
      'cloud software venture capital'
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
    excludeTerms: ['diy', 'tutorial', 'how to', 'financial advisor', 'wealth management', 'retirement', 'brokerage']
  },
  'developer-tools-investors': {
    id: 'developer-tools-investors',
    name: 'Developer Tools Investors',
    searchTerms: [
      'developer tools venture capital',
      'devtools funding',
      'developer platform vc',
      'software development tools venture',
      'devops startup funding',
      'coding tools venture capital',
      'developer experience investor',
      'api tools vc'
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
    excludeTerms: ['diy', 'tutorial', 'how to', 'financial advisor', 'wealth management', 'retirement', 'brokerage']
  },
  'seed-investors': {
    id: 'seed-investors',
    name: 'Seed Investors',
    searchTerms: [
      'seed venture capital',
      'seed funding',
      'seed capital',
      'seed round investor',
      'early stage seed funding',
      'seed startup investment',
      'pre-seed venture capital',
      'angel seed funding'
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
    excludeTerms: ['diy', 'tutorial', 'how to', 'financial advisor', 'wealth management', 'retirement', 'brokerage']
  },
  'early-stage-investors': {
    id: 'early-stage-investors',
    name: 'Early-Stage Investors',
    searchTerms: [
      'early stage venture capital',
      'series a investor',
      'early startup funding',
      'early stage venture',
      'pre-series a funding',
      'early stage startup investor',
      'seed to series a venture',
      'early stage technology vc'
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
    excludeTerms: ['diy', 'tutorial', 'how to', 'financial advisor', 'wealth management', 'retirement', 'brokerage']
  },
  'technology-investment-firms': {
    id: 'technology-investment-firms',
    name: 'Technology Investment Firms',
    searchTerms: [
      'technology venture capital',
      'tech investment firm',
      'technology venture firm',
      'tech capital firm',
      'technology investment fund',
      'tech startup investment',
      'digital technology vc',
      'tech growth equity'
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
    excludeTerms: ['diy', 'tutorial', 'how to', 'financial advisor', 'wealth management', 'retirement', 'brokerage']
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
      'corporate innovation vc'
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
    excludeTerms: ['diy', 'tutorial', 'how to', 'financial advisor', 'wealth management', 'retirement', 'brokerage']
  },
  'family-offices-technology': {
    id: 'family-offices-technology',
    name: 'Family Offices (Technology Investments)',
    searchTerms: [
      'family office technology venture capital',
      'family office tech investor',
      'family venture capital',
      'family office startup investment',
      'family office technology fund',
      'multi-family office tech vc',
      'single family office venture',
      'family office direct investment'
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
    excludeTerms: ['diy', 'tutorial', 'how to', 'financial advisor', 'wealth management', 'retirement', 'brokerage']
  },
  'private-equity-technology': {
    id: 'private-equity-technology',
    name: 'Private Equity Technology Firms',
    searchTerms: [
      'technology private equity',
      'tech pe firm',
      'technology buyout firm',
      'tech growth equity',
      'technology investment firm',
      'software private equity',
      'tech pe fund',
      'technology growth capital'
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
    excludeTerms: ['diy', 'tutorial', 'how to', 'financial advisor', 'wealth management', 'retirement', 'brokerage']
  },
  'software-private-equity': {
    id: 'software-private-equity',
    name: 'Software Private Equity Firms',
    searchTerms: [
      'software private equity',
      'software pe firm',
      'software buyout',
      'software growth equity',
      'saas private equity',
      'software investment firm',
      'technology software pe',
      'enterprise software private equity'
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
    excludeTerms: ['diy', 'tutorial', 'how to', 'financial advisor', 'wealth management', 'retirement', 'brokerage']
  },
  'ai-private-equity': {
    id: 'ai-private-equity',
    name: 'AI Private Equity Firms',
    searchTerms: [
      'artificial intelligence private equity',
      'ai pe firm',
      'machine learning private equity',
      'ai buyout firm',
      'technology ai private equity',
      'ai growth equity',
      'deep learning private equity',
      'ai software private equity'
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
    excludeTerms: ['diy', 'tutorial', 'how to', 'financial advisor', 'wealth management', 'retirement', 'brokerage']
  },
  'growth-equity-software': {
    id: 'growth-equity-software',
    name: 'Growth Equity Software Firms',
    searchTerms: [
      'software growth equity',
      'saas growth equity',
      'technology growth capital',
      'software growth firm',
      'enterprise software growth equity',
      'b2b software growth capital',
      'software expansion capital',
      'saas growth investment'
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
    excludeTerms: ['diy', 'tutorial', 'how to', 'financial advisor', 'wealth management', 'retirement', 'brokerage']
  },
  'enterprise-ai-investors': {
    id: 'enterprise-ai-investors',
    name: 'Enterprise AI Investors',
    searchTerms: [
      'enterprise artificial intelligence venture capital',
      'enterprise ai investor',
      'b2b ai funding',
      'enterprise ai venture',
      'business ai investment',
      'corporate ai vc',
      'enterprise machine learning investor',
      'b2b ai startup funding'
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
    excludeTerms: ['diy', 'tutorial', 'how to', 'financial advisor', 'wealth management', 'retirement', 'brokerage']
  },
  'cloud-software-investors': {
    id: 'cloud-software-investors',
    name: 'Cloud Software Investors',
    searchTerms: [
      'cloud software venture capital',
      'cloud software investor',
      'saas cloud funding',
      'cloud software vc',
      'infrastructure as a service venture',
      'cloud platform investor',
      'software as a service cloud vc',
      'cloud technology venture capital'
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
    excludeTerms: ['diy', 'tutorial', 'how to', 'financial advisor', 'wealth management', 'retirement', 'brokerage']
  }
};

export function getIndustryConfig(industryId: string): IndustryConfig | undefined {
  return INDUSTRY_CONFIGS[industryId];
}

export function getAllIndustries(): IndustryConfig[] {
  return Object.values(INDUSTRY_CONFIGS);
}