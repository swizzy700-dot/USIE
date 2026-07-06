/**
 * Geography Search Service
 * Provides fast search and lookup functionality for geographic data
 */

import { GeographyDataLoader } from './data-loader';
import { SearchResult, LocationSearch, NearbySearch, City, ZipCode, County, State, MetroArea } from './types';

export class GeographySearchService {
  private dataLoader: GeographyDataLoader;

  constructor(dataLoader: GeographyDataLoader) {
    this.dataLoader = dataLoader;
  }

  /**
   * Search for geographic locations by query
   */
  async search(search: LocationSearch): Promise<SearchResult[]> {
    await this.dataLoader.initialize();
    
    const query = search.query.toLowerCase().trim();
    const results: SearchResult[] = [];
    const limit = search.limit || 20;

    // Search based on type filter
    if (search.type === 'all' || !search.type) {
      // Search all types
      results.push(...this.searchStates(query, search.state));
      results.push(...await this.searchCities(query, search.state));
      results.push(...await this.searchZipCodes(query, search.state));
      results.push(...await this.searchCounties(query, search.state));
      results.push(...await this.searchMetroAreas(query, search.state));
    } else if (search.type === 'state') {
      results.push(...this.searchStates(query, search.state));
    } else if (search.type === 'city') {
      results.push(...await this.searchCities(query, search.state));
    } else if (search.type === 'zip') {
      results.push(...await this.searchZipCodes(query, search.state));
    } else if (search.type === 'county') {
      results.push(...await this.searchCounties(query, search.state));
    } else if (search.type === 'metro') {
      results.push(...await this.searchMetroAreas(query, search.state));
    }

    // Sort by relevance and limit results
    return results
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, limit);
  }

  private searchStates(query: string, stateFilter?: string): SearchResult[] {
    const results: SearchResult[] = [];
    const states = this.dataLoader.getStates();

    for (const state of states) {
      if (stateFilter && state.code !== stateFilter) continue;

      const relevance = this.calculateRelevance(query, state.name, state.code);
      if (relevance > 0) {
        results.push({
          type: 'state',
          data: state,
          relevance
        });
      }
    }

    return results;
  }

  private async searchCities(query: string, stateFilter?: string): Promise<SearchResult[]> {
    const results: SearchResult[] = [];
    const cityIndex = await this.dataLoader.getCityIndex();

    // First try exact matches from index
    for (const [name, cityIds] of cityIndex.entries()) {
      if (name.includes(query) || query.includes(name)) {
        for (const cityId of cityIds) {
          const city = await this.dataLoader.getCity(cityId);
          if (city && (!stateFilter || city.state === stateFilter)) {
            const relevance = this.calculateRelevance(query, city.name, city.state);
            results.push({
              type: 'city',
              data: city,
              relevance
            });
          }
        }
      }
    }

    return results;
  }

  private async searchZipCodes(query: string, stateFilter?: string): Promise<SearchResult[]> {
    const results: SearchResult[] = [];
    const zipCodes = await this.dataLoader.getZipCodes();

    for (const zip of zipCodes) {
      if (stateFilter && zip.state !== stateFilter) continue;

      const relevance = this.calculateRelevance(query, zip.zip, zip.city);
      if (relevance > 0) {
        results.push({
          type: 'zip',
          data: zip,
          relevance
        });
      }
    }

    return results;
  }

  private async searchCounties(query: string, stateFilter?: string): Promise<SearchResult[]> {
    const results: SearchResult[] = [];
    const countyIndex = await this.dataLoader.getCountyIndex();

    for (const [name, countyFips] of countyIndex.entries()) {
      if (name.includes(query) || query.includes(name)) {
        for (const fips of countyFips) {
          const county = await this.dataLoader.getCounty(fips);
          if (county && (!stateFilter || county.state === stateFilter)) {
            const relevance = this.calculateRelevance(query, county.name, county.state);
            results.push({
              type: 'county',
              data: county,
              relevance
            });
          }
        }
      }
    }

    return results;
  }

  private async searchMetroAreas(query: string, stateFilter?: string): Promise<SearchResult[]> {
    const results: SearchResult[] = [];
    const metros = await this.dataLoader.getMetroAreas();

    for (const metro of metros) {
      if (stateFilter && metro.state !== stateFilter) continue;

      const relevance = this.calculateRelevance(query, metro.name, metro.principalCity);
      if (relevance > 0) {
        results.push({
          type: 'metro',
          data: metro,
          relevance
        });
      }
    }

    return results;
  }

  private calculateRelevance(query: string, ...textFields: string[]): number {
    let relevance = 0;
    const queryLower = query.toLowerCase();

    for (const field of textFields) {
      const fieldLower = field.toLowerCase();

      // Exact match gets highest relevance
      if (fieldLower === queryLower) {
        relevance += 100;
      }
      // Starts with query gets high relevance
      else if (fieldLower.startsWith(queryLower)) {
        relevance += 50;
      }
      // Contains query gets medium relevance
      else if (fieldLower.includes(queryLower)) {
        relevance += 25;
      }
      // Partial match gets low relevance
      else if (this.fuzzyMatch(queryLower, fieldLower)) {
        relevance += 10;
      }
    }

    return relevance;
  }

  private fuzzyMatch(query: string, text: string): boolean {
    // Simple fuzzy matching - check if all characters in query appear in text in order
    let queryIndex = 0;
    for (let i = 0; i < text.length && queryIndex < query.length; i++) {
      if (text[i] === query[queryIndex]) {
        queryIndex++;
      }
    }
    return queryIndex === query.length;
  }

  /**
   * Find a city by name and state
   */
  async findCity(name: string, state: string): Promise<City | undefined> {
    await this.dataLoader.initialize();
    
    const cities = await this.dataLoader.getCities();
    return cities.find(city => 
      city.name.toLowerCase() === name.toLowerCase() && 
      city.state === state.toUpperCase()
    );
  }

  /**
   * Find a ZIP code
   */
  async findZip(zip: string): Promise<ZipCode | undefined> {
    await this.dataLoader.initialize();
    return await this.dataLoader.getZipCode(zip);
  }

  /**
   * Find a county by name and state
   */
  async findCounty(name: string, state: string): Promise<County | undefined> {
    await this.dataLoader.initialize();
    
    const counties = await this.dataLoader.getCounties();
    return counties.find(county => 
      county.name.toLowerCase() === name.toLowerCase() && 
      county.state === state.toUpperCase()
    );
  }

  /**
   * Find nearby ZIP codes within a radius
   */
  async findNearbyZips(search: NearbySearch): Promise<ZipCode[]> {
    await this.dataLoader.initialize();
    
    const targetZip = await this.findZip(search.zip);
    if (!targetZip) return [];

    const allZips = await this.dataLoader.getZipCodes();
    const nearbyZips: ZipCode[] = [];

    for (const zip of allZips) {
      if (zip.zip === search.zip) continue;

      const distance = this.calculateDistance(
        targetZip.latitude,
        targetZip.longitude,
        zip.latitude,
        zip.longitude
      );

      if (distance <= search.radius) {
        nearbyZips.push(zip);
      }
    }

    // Sort by distance and limit results
    nearbyZips.sort((a, b) => {
      const distA = this.calculateDistance(
        targetZip.latitude,
        targetZip.longitude,
        a.latitude,
        a.longitude
      );
      const distB = this.calculateDistance(
        targetZip.latitude,
        targetZip.longitude,
        b.latitude,
        b.longitude
      );
      return distA - distB;
    });

    return search.limit ? nearbyZips.slice(0, search.limit) : nearbyZips;
  }

  /**
   * Generate available search locations for search targeting
   */
  async generateSearchLocations(state?: string): Promise<{
    states: State[];
    topCities: City[];
    topCounties: County[];
    topMetroAreas: MetroArea[];
  }> {
    await this.dataLoader.initialize();

    let states = this.dataLoader.getStates();
    if (state) {
      states = states.filter(s => s.code === state);
    }

    const cities = await this.dataLoader.getCities();
    const topCities = state 
      ? cities.filter(c => c.state === state).slice(0, 10)
      : cities.slice(0, 20);

    const counties = await this.dataLoader.getCounties();
    const topCounties = state
      ? counties.filter(c => c.state === state).slice(0, 10)
      : counties.slice(0, 20);

    const metros = await this.dataLoader.getMetroAreas();
    const topMetroAreas = state
      ? metros.filter(m => m.state === state).slice(0, 5)
      : metros.slice(0, 10);

    return {
      states,
      topCities,
      topCounties,
      topMetroAreas
    };
  }

  /**
   * Calculate distance between two coordinates using Haversine formula
   */
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 3959; // Earth's radius in miles
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
}