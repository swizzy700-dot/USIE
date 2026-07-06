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
  }
};

export function getIndustryConfig(industryId: string): IndustryConfig | undefined {
  return INDUSTRY_CONFIGS[industryId];
}

export function getAllIndustries(): IndustryConfig[] {
  return Object.values(INDUSTRY_CONFIGS);
}