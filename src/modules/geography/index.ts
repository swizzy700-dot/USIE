/**
 * Geography Engine Module
 * Handles geographic targeting and location-based search parameters
 * Phase 2: USA Geography Engine Implementation
 */

import { GeographyDataLoader } from './data-loader';
import { GeographySearchService } from './search-service';

// Export types
export * from './types';

// Export services
export { GeographyDataLoader, GeographySearchService };

// Main Geography Engine class
export class GeographyEngine {
  private static dataLoader: GeographyDataLoader;
  private static searchService: GeographySearchService;
  private static initializationPromise: Promise<void> | null = null;

  static async initialize(): Promise<void> {
    if (this.initializationPromise) {
      return this.initializationPromise;
    }
    
    if (!this.dataLoader) {
      this.initializationPromise = (async () => {
        this.dataLoader = new GeographyDataLoader();
        this.searchService = new GeographySearchService(this.dataLoader);
        await this.dataLoader.initialize();
        this.initializationPromise = null;
      })();
      await this.initializationPromise;
    }
  }

  static getDataLoader(): GeographyDataLoader {
    if (!this.dataLoader) {
      throw new Error('GeographyEngine not initialized. Call initialize() first.');
    }
    return this.dataLoader;
  }

  static getSearchService(): GeographySearchService {
    if (!this.searchService) {
      throw new Error('GeographyEngine not initialized. Call initialize() first.');
    }
    return this.searchService;
  }

  static version = '2.0.0';
  static status = 'active';
}