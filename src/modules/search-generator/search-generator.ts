/**
 * Search Generator Service
 * Generates Google search targets with batch processing and smart deduplication
 */

import { 
  SearchGenerationRequest, 
  SearchTarget, 
  SearchBatch, 
  SearchState
} from './types';
import { getIndustryConfig } from './industry-config';
import { GeographyEngine } from '../geography';
import { ZipCode } from '../geography/types';
import { GeographySearchService } from '../geography/search-service';

export class SearchGeneratorService {
  private searchState: Map<string, SearchState> = new Map();
  private currentBatch: SearchBatch | null = null;
  private allGeneratedTargets: SearchTarget[] = [];
  private completedSearches: Set<string> = new Set();
  private geoService: GeographySearchService | null = null;
  private isGeoInitialized = false;

  /**
   * Initialize geography service once
   */
  private async ensureGeoInitialized(): Promise<void> {
    if (!this.isGeoInitialized) {
      await GeographyEngine.initialize();
      this.geoService = GeographyEngine.getSearchService();
      this.isGeoInitialized = true;
    }
  }

  /**
   * Validate that the request is for US-only locations
   */
  private validateUSOnly(request: SearchGenerationRequest): void {
    // State validation - must be a valid US state code
    const validUSStates = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 
                          'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 
                          'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 
                          'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 
                          'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
                          'DC'];
    
    if (!validUSStates.includes(request.state.toUpperCase())) {
      throw new Error(`Invalid US state code: ${request.state}. Only US states are supported.`);
    }
  }

  /**
   * Replace generic industry labels with specific investor-focused labels
   */
  private replaceIndustryLabel(industryLabel: string): string {
    const lowerLabel = industryLabel.toLowerCase();
    
    // Check for generic terms that need replacement
    if (lowerLabel.includes('investor') || lowerLabel.includes('investment') || 
        lowerLabel.includes('investment services') || lowerLabel.includes('financial services')) {
      
      // Replace with specific labels based on context
      if (lowerLabel.includes('enterprise software') || lowerLabel.includes('b2b software')) {
        if (lowerLabel.includes('ai') || lowerLabel.includes('artificial intelligence')) {
          return 'AI Venture Capital';
        } else if (lowerLabel.includes('software') || lowerLabel.includes('saas')) {
          return 'Software Venture Capital';
        } else {
          return 'Venture Capital Firm';
        }
      } else if (lowerLabel.includes('ai') || lowerLabel.includes('artificial intelligence')) {
        return 'AI Venture Capital';
      } else if (lowerLabel.includes('software') || lowerLabel.includes('saas')) {
        return 'Software Venture Capital';
      } else if (lowerLabel.includes('growth') || lowerLabel.includes('equity')) {
        return 'Growth Equity Firm';
      } else if (lowerLabel.includes('technology') || lowerLabel.includes('tech')) {
        return 'Technology Venture Capital';
      } else {
        // Default to Private Equity for generic investment terms
        return 'Private Equity Firm';
      }
    }
    
    // Return original if no replacement needed
    return industryLabel;
  }

  /**
   * Generate search targets based on request parameters
   */
  async generateSearchTargets(request: SearchGenerationRequest): Promise<SearchTarget[]> {
    const industryConfig = getIndustryConfig(request.industry);
    if (!industryConfig) {
      throw new Error(`Invalid industry: ${request.industry}`);
    }

    // Validate US-only requirement
    this.validateUSOnly(request);

    // Ensure geography service is initialized
    await this.ensureGeoInitialized();

    if (!this.geoService) {
      throw new Error('Geography service not initialized');
    }

    // Get ZIP codes for the specified city and state
    const city = await this.geoService.findCity(request.city, request.state);
    if (!city) {
      throw new Error(`City not found: ${request.city}, ${request.state}`);
    }

    // Validate that the city is in the US (should always be true given our data)
    if (city.state !== request.state.toUpperCase()) {
      throw new Error(`City state mismatch: ${request.city} is in ${city.state}, not ${request.state}`);
    }

    // Get nearby ZIP codes
    const zipCodes = await this.geoService.findNearbyZips({
      zip: request.zipCount > 0 ? (await this.geoService.findZip(city.id.split('-')[1]))?.zip || '00000' : '00000',
      radius: 50,
      limit: request.zipCount
    });

    // Filter for valid US ZIP codes (5 digits)
    const validZips = zipCodes.filter((zip: ZipCode) => /^\d{5}$/.test(zip.zip));
    
    // If no valid ZIP codes found, use a sample
    const targetZips = validZips.length > 0 ? validZips : [
      { zip: '00000', city: request.city, state: request.state, county: '', latitude: 0, longitude: 0, population: 0, area: 0 }
    ];

    const targets: SearchTarget[] = [];
    const usedCombinations = new Set<string>();
    const zipLimit = Math.min(targetZips.length, request.zipCount || 1);

    // Generate search targets for each ZIP code
    for (let i = 0; i < zipLimit; i++) {
      const zip = targetZips[i];
      for (const searchTerm of industryConfig.searchTerms) {
        // Skip empty search terms
        if (!searchTerm || searchTerm.trim() === '') {
          continue;
        }

        // Create unique search combination
        const searchId = `${request.industry}-${request.city}-${request.state}-${zip.zip}-${searchTerm}`;
        
        // Skip if already completed
        if (this.completedSearches.has(searchId)) {
          continue;
        }

        // Skip if already used in this batch
        if (usedCombinations.has(searchId)) {
          continue;
        }

        const target: SearchTarget = {
          id: searchId,
          industry: this.replaceIndustryLabel(industryConfig.name),
          city: request.city,
          state: request.state,
          zip: zip.zip,
          searchTerm: searchTerm,
          generatedAt: new Date()
        };

        targets.push(target);
        usedCombinations.add(searchId);
      }
    }

    // Prevent blank outputs
    if (targets.length === 0) {
      throw new Error('No search targets could be generated. Please check your configuration and try again.');
    }

    // Mark searches as completed
    targets.forEach(target => {
      this.completedSearches.add(target.id);
    });

    return targets;
  }

  /**
   * Generate search batches from targets
   */
  generateBatches(targets: SearchTarget[], batchSize: number): SearchBatch[] {
    const batches: SearchBatch[] = [];
    const totalBatches = Math.ceil(targets.length / batchSize);

    for (let i = 0; i < totalBatches; i++) {
      const start = i * batchSize;
      const end = start + batchSize;
      const batchTargets = targets.slice(start, end);

      const batch: SearchBatch = {
        id: `batch-${Date.now()}-${i}`,
        targets: batchTargets,
        batchNumber: i + 1,
        totalBatches: totalBatches,
        generatedAt: new Date()
      };

      batches.push(batch);
    }

    return batches;
  }

  /**
   * Get current batch
   */
  getCurrentBatch(): SearchBatch | null {
    return this.currentBatch;
  }

  /**
   * Set current batch
   */
  setCurrentBatch(batch: SearchBatch): void {
    this.currentBatch = batch;
  }

  /**
   * Get next batch
   */
  getNextBatch(): SearchBatch | null {
    if (!this.currentBatch) return null;
    
    const batches = this.generateBatches(this.allGeneratedTargets, this.currentBatch.targets.length);
    const currentIndex = batches.findIndex(b => b.id === this.currentBatch?.id);
    
    if (currentIndex < batches.length - 1) {
      this.currentBatch = batches[currentIndex + 1];
      return this.currentBatch;
    }
    
    return null;
  }

  /**
   * Get previous batch
   */
  getPreviousBatch(): SearchBatch | null {
    if (!this.currentBatch) return null;
    
    const batches = this.generateBatches(this.allGeneratedTargets, this.currentBatch.targets.length);
    const currentIndex = batches.findIndex(b => b.id === this.currentBatch?.id);
    
    if (currentIndex > 0) {
      this.currentBatch = batches[currentIndex - 1];
      return this.currentBatch;
    }
    
    return null;
  }

  /**
   * Initialize search generation
   */
  async initializeGeneration(request: SearchGenerationRequest): Promise<SearchBatch> {
    // Generate all targets
    const targets = await this.generateSearchTargets(request);
    this.allGeneratedTargets = targets;

    // Generate batches
    const batches = this.generateBatches(targets, request.batchSize);
    
    if (batches.length === 0) {
      throw new Error('No search targets generated');
    }

    // Set first batch as current
    this.currentBatch = batches[0];
    
    return this.currentBatch;
  }

  /**
   * Format search target for display/copy
   */
  formatSearchTarget(target: SearchTarget): string {
    return `${target.industry} | ${target.city} | ${target.state} | ${target.zip}`;
  }

  /**
   * Format multiple search targets for copying
   */
  formatSearchTargets(targets: SearchTarget[]): string {
    return targets.map(target => this.formatSearchTarget(target)).join('\n');
  }

  /**
   * Get completed searches count
   */
  getCompletedSearchesCount(): number {
    return this.completedSearches.size;
  }

  /**
   * Reset search state
   */
  resetSearchState(): void {
    this.completedSearches.clear();
    this.allGeneratedTargets = [];
    this.currentBatch = null;
  }

  /**
   * Check if search combination is already completed
   */
  isSearchCompleted(industry: string, city: string, state: string, zip: string, searchTerm: string): boolean {
    const searchId = `${industry}-${city}-${state}-${zip}-${searchTerm}`;
    return this.completedSearches.has(searchId);
  }
}