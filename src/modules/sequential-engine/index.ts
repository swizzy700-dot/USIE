/**
 * Industry Engine Module
 * Automatic batch generation for selected industry across US states/cities/ZIPs
 * Maintains separate progress for each industry
 */

import { GeographyEngine } from '../geography';
import { getIndustryConfig, getAllIndustries, IndustryType } from '../search-generator';
import { ZipCode, City } from '../geography/types';

export interface IndustryProgress {
  industryId: string;
  currentStateIndex: number;
  currentCityIndex: number;
  currentZipIndex: number;
  completedBatches: number;
  totalGenerated: number;
}

export interface GeneratedBatch {
  industry: string;
  queries: string[];
  batchSize: number;
  batchNumber: number;
  completedAt: Date;
}

export class IndustryEngine {
  private static instance: IndustryEngine;
  private selectedIndustry: IndustryType | null = null;
  private currentProgress: IndustryProgress | null = null;
  private allIndustries: IndustryType[] = [];
  private allStates: string[] = [];
  private currentCities: City[] = [];
  private currentZips: ZipCode[] = [];
  private completedBatches: Set<string> = new Set();
  private batchSize: number = 10;
  private storageKey = 'usie-industry-progress';
  private currentSessionBatchNumber: number = 0;

  private constructor() {
    this.loadProgress();
  }

  static getInstance(): IndustryEngine {
    if (!IndustryEngine.instance) {
      IndustryEngine.instance = new IndustryEngine();
    }
    return IndustryEngine.instance;
  }

  /**
   * Initialize the engine with geographic data
   */
  async initialize(): Promise<void> {
    try {
      await GeographyEngine.initialize();

      // Get all industries
      this.allIndustries = getAllIndustries().map(i => i.id as IndustryType);

      // Get all US states that actually have cities in the dataset
      const dataLoader = GeographyEngine.getDataLoader();
      const allStates = dataLoader.getStates();
      const allCities = await dataLoader.getCities();
      
      // Find which states have cities
      const statesWithCities = new Set(allCities.map(c => c.state));
      this.allStates = allStates.filter(s => statesWithCities.has(s.code)).map(s => s.code);
      // Sort states alphabetically for consistent geographic ordering
      this.allStates.sort();
    } catch (error) {
      console.error('IndustryEngine initialization failed:', error);
      throw error;
    }
  }

  /**
   * Get available industries
   */
  getIndustries(): IndustryType[] {
    return this.allIndustries;
  }

  /**
   * Select an industry
   */
  selectIndustry(industryId: IndustryType): void {
    this.selectedIndustry = industryId;
    this.currentProgress = this.getIndustryProgress(industryId);
    this.currentSessionBatchNumber = 0; // Reset session batch counter when switching industries
  }

  /**
   * Get current selected industry
   */
  getSelectedIndustry(): IndustryType | null {
    return this.selectedIndustry;
  }

  /**
   * Get progress for a specific industry
   */
  private getIndustryProgress(industryId: IndustryType): IndustryProgress {
    const saved = this.loadProgressData();
    return saved[industryId] || {
      industryId,
      currentStateIndex: 0,
      currentCityIndex: 0,
      currentZipIndex: 0,
      completedBatches: 0,
      totalGenerated: 0
    };
  }

  /**
   * Generate a batch of search queries for the selected industry
   */
  async generateBatch(): Promise<GeneratedBatch> {
    if (!this.selectedIndustry) {
      throw new Error('No industry selected');
    }

    if (!this.currentProgress) {
      this.currentProgress = this.getIndustryProgress(this.selectedIndustry);
    }

    const industryConfig = getIndustryConfig(this.selectedIndustry);
    if (!industryConfig) {
      throw new Error(`Invalid industry: ${this.selectedIndustry}`);
    }

    // Load data for current position
    await this.loadCurrentPositionData();

    const queries: string[] = [];
    let generatedCount = 0;
    let attempts = 0;
    const maxAttempts = this.batchSize * 10; // Prevent infinite loops
    const rejectionReasons: string[] = [];

    while (generatedCount < this.batchSize && attempts < maxAttempts) {
      attempts++;

      // Generate query for current position
      const query = await this.generateCurrentQuery();
      
      // Skip placeholder queries - advance and try again
      if (query === 'Loading locations...' || query === 'Loading ZIP codes...' || 
          query === 'No industry selected' || query === 'Invalid industry') {
        const reason = `Placeholder detected: ${query}`;
        rejectionReasons.push(reason);
        await this.advancePosition();
        await this.loadCurrentPositionData();
        continue;
      }
      
      // Check if this batch was already completed
      const batchKey = `${this.selectedIndustry}-${this.currentProgress.currentStateIndex}-${this.currentProgress.currentCityIndex}-${this.currentProgress.currentZipIndex}`;
      
      if (this.completedBatches.has(batchKey)) {
        const reason = `Batch already completed: ${batchKey}`;
        rejectionReasons.push(reason);
        // Advance to next position
        await this.advancePosition();
        continue;
      }

      queries.push(query);
      generatedCount++;

      // Advance to next position for next query
      await this.advancePosition();
    }

    // Ensure we have the required batch size
    if (queries.length < this.batchSize) {
      const errorDetails = rejectionReasons.length > 0 
        ? ` Rejection reasons: ${rejectionReasons.slice(0, 10).join('; ')}${rejectionReasons.length > 10 ? '...' : ''}`
        : '';
      throw new Error(`Could not generate enough valid queries. Generated ${queries.length} out of ${this.batchSize} required.${errorDetails}`);
    }

    // Update progress
    this.currentProgress.completedBatches++;
    this.currentProgress.totalGenerated += queries.length;
    this.saveProgress();

    // Increment session batch number
    this.currentSessionBatchNumber++;

    return {
      industry: industryConfig.name,
      queries,
      batchSize: queries.length,
      batchNumber: this.currentSessionBatchNumber,
      completedAt: new Date()
    };
  }

  /**
   * Mark current batch as completed and advance
   */
  async completeCurrentBatch(): Promise<void> {
    if (!this.selectedIndustry || !this.currentProgress) {
      throw new Error('No industry selected');
    }

    // Mark current position as completed
    const batchKey = `${this.selectedIndustry}-${this.currentProgress.currentStateIndex}-${this.currentProgress.currentCityIndex}-${this.currentProgress.currentZipIndex}`;
    this.completedBatches.add(batchKey);

    // Save progress
    this.saveProgress();
  }

  /**
   * Load geographic data for current position
   */
  private async loadCurrentPositionData(): Promise<void> {
    if (!this.currentProgress || this.allStates.length === 0) {
      return;
    }

    const stateCode = this.allStates[this.currentProgress.currentStateIndex];
    const dataLoader = GeographyEngine.getDataLoader();
    const searchService = GeographyEngine.getSearchService();

    // Load cities for current state
    this.currentCities = await dataLoader.getCities();
    this.currentCities = this.currentCities.filter(c => c.state === stateCode);
    // Sort cities alphabetically for consistent geographic ordering
    this.currentCities.sort((a, b) => a.name.localeCompare(b.name));

    // If we have cities, load ZIP codes
    if (this.currentCities.length > 0 && this.currentProgress.currentCityIndex < this.currentCities.length) {
      const city = this.currentCities[this.currentProgress.currentCityIndex];
      
      // Find ZIP codes by city name and state instead of extracting from city ID
      const allZips = await dataLoader.getZipCodes();
      const cityZips = allZips.filter(z => 
        z.city.toLowerCase() === city.name.toLowerCase() && 
        z.state === city.state
      );
      
      // If no direct matches, try to find nearby ZIP codes using the first ZIP for this state
      if (cityZips.length === 0) {
        const stateZips = allZips.filter(z => z.state === city.state);
        this.currentZips = stateZips.filter(z => /^\d{5}$/.test(z.zip));
      } else {
        this.currentZips = cityZips.filter(z => /^\d{5}$/.test(z.zip));
      }
      // Sort ZIP codes numerically for consistent geographic ordering
      this.currentZips.sort((a, b) => a.zip.localeCompare(b.zip));
    } else {
      this.currentZips = [];
    }
  }

  /**
   * Advance to next position
   */
  private async advancePosition(): Promise<void> {
    if (!this.currentProgress) return;

    // Advance ZIP
    this.currentProgress.currentZipIndex++;

    // Check if we need to advance to next city
    if (this.currentProgress.currentZipIndex >= this.currentZips.length) {
      this.currentProgress.currentZipIndex = 0;
      this.currentProgress.currentCityIndex++;

      // Check if we need to advance to next state
      if (this.currentProgress.currentCityIndex >= this.currentCities.length) {
        this.currentProgress.currentCityIndex = 0;
        this.currentProgress.currentStateIndex++;

        // Check if we've gone through all states, reset to beginning
        if (this.currentProgress.currentStateIndex >= this.allStates.length) {
          this.currentProgress.currentStateIndex = 0;
        }

        // Reload data for new state
        await this.loadCurrentPositionData();
      }
    }
  }

  /**
   * Generate search query for current position
   */
  private async generateCurrentQuery(): Promise<string> {
    if (!this.selectedIndustry || !this.currentProgress) {
      return 'No industry selected';
    }

    const industryConfig = getIndustryConfig(this.selectedIndustry);
    if (!industryConfig) {
      return 'Invalid industry';
    }

    if (this.allStates.length === 0) {
      return 'No states available';
    }

    const stateCode = this.allStates[this.currentProgress.currentStateIndex];

    if (this.currentCities.length === 0 || this.currentProgress.currentCityIndex >= this.currentCities.length) {
      return 'Loading locations...';
    }

    const city = this.currentCities[this.currentProgress.currentCityIndex];

    if (this.currentZips.length === 0 || this.currentProgress.currentZipIndex >= this.currentZips.length) {
      return 'Loading ZIP codes...';
    }

    const zip = this.currentZips[this.currentProgress.currentZipIndex];

    return `${industryConfig.name} ${city.name} ${stateCode} ${zip.zip}`;
  }

  /**
   * Get current progress for selected industry
   */
  getCurrentProgress(): IndustryProgress | null {
    return this.currentProgress ? { ...this.currentProgress } : null;
  }

  /**
   * Reset progress for selected industry
   */
  resetIndustryProgress(): void {
    if (!this.selectedIndustry) return;

    const saved = this.loadProgressData();
    delete saved[this.selectedIndustry];
    this.saveProgressData(saved);

    this.currentProgress = {
      industryId: this.selectedIndustry,
      currentStateIndex: 0,
      currentCityIndex: 0,
      currentZipIndex: 0,
      completedBatches: 0,
      totalGenerated: 0
    };
  }

  /**
   * Set batch size
   */
  setBatchSize(size: number): void {
    this.batchSize = Math.max(1, Math.min(100, size));
  }

  /**
   * Get batch size
   */
  getBatchSize(): number {
    return this.batchSize;
  }

  /**
   * Load progress data from localStorage
   */
  private loadProgressData(): Record<string, IndustryProgress> {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
          return JSON.parse(saved);
        }
      } catch (e) {
        console.error('Failed to load progress data:', e);
      }
    }
    return {};
  }

  /**
   * Save progress data to localStorage
   */
  private saveProgressData(data: Record<string, IndustryProgress>): void {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(data));
      } catch (e) {
        console.error('Failed to save progress data:', e);
      }
    }
  }

  /**
   * Save current progress
   */
  private saveProgress(): void {
    if (!this.selectedIndustry || !this.currentProgress) return;

    const saved = this.loadProgressData();
    saved[this.selectedIndustry] = { ...this.currentProgress };
    this.saveProgressData(saved);
  }

  /**
   * Load progress (legacy method for initialization)
   */
  private loadProgress(): void {
    // Progress is loaded on-demand per industry
  }

  static version = '2.0.0';
  static status = 'active';
}
