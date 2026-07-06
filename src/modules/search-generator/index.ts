/**
 * Search Generator Module
 * Generates Google search targets for business discovery
 * Phase 3: Search Generator Implementation
 */

import { SearchGeneratorService } from './search-generator';

// Export types
export * from './types';

// Export industry configuration
export { getIndustryConfig, getAllIndustries, INDUSTRY_CONFIGS } from './industry-config';

// Export search generator service
export { SearchGeneratorService };

// Main Search Generator class
export class SearchGenerator {
  private static service: SearchGeneratorService;

  static getService(): SearchGeneratorService {
    if (!this.service) {
      this.service = new SearchGeneratorService();
    }
    return this.service;
  }

  static version = '3.0.0';
  static status = 'active';
}