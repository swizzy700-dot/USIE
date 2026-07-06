/**
 * Geography Engine Types
 * Defines data structures for USA geographic entities
 */

export interface State {
  code: string;           // 2-letter state code (e.g., 'CA')
  name: string;           // Full state name (e.g., 'California')
  fips: string;           // FIPS code
  region: string;         // Census region (Northeast, Midwest, South, West)
  division: string;       // Census division
  population: number;     // State population
  area: number;           // Land area in square miles
}

export interface County {
  fips: string;           // Full FIPS code (e.g., '06037')
  stateFips: string;      // State FIPS (e.g., '06')
  name: string;           // County name (e.g., 'Los Angeles County')
  state: string;          // State code (e.g., 'CA')
  population: number;     // County population
  area: number;           // Land area in square miles
}

export interface City {
  id: string;             // Unique identifier
  name: string;           // City name (e.g., 'Los Angeles')
  state: string;          // State code (e.g., 'CA')
  county: string;         // County FIPS
  population: number;     // City population
  area: number;           // Land area in square miles
  latitude: number;      // Coordinates
  longitude: number;
  isMetro: boolean;       // Part of metro area
  metroArea?: string;     // Metro area name if applicable
}

export interface ZipCode {
  zip: string;            // ZIP code (e.g., '90210')
  city: string;           // Primary city name
  state: string;          // State code
  county: string;         // County FIPS
  latitude: number;       // Coordinates
  longitude: number;
  population: number;     // Estimated population
  area: number;           // ZIP area in square miles
}

export interface MetroArea {
  name: string;           // Metro area name (e.g., 'Los Angeles-Long Beach-Anaheim, CA')
  fips: string;           // Metro FIPS code
  population: number;     // Metro population
  principalCity: string;  // Principal city
  state: string;          // Primary state
}

export interface SearchResult {
  type: 'state' | 'county' | 'city' | 'zip' | 'metro';
  data: State | County | City | ZipCode | MetroArea;
  relevance: number;      // Search relevance score
}

export interface LocationSearch {
  query: string;
  type?: 'state' | 'county' | 'city' | 'zip' | 'metro' | 'all';
  state?: string;         // Filter by state
  limit?: number;         // Max results
}

export interface NearbySearch {
  zip: string;
  radius: number;         // Radius in miles
  limit?: number;
}