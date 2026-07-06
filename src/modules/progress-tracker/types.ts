/**
 * Progress Tracker Types
 * Defines data structures for tracking search progress and activity
 */

export interface CityProgress {
  cityId: string;
  cityName: string;
  state: string;
  totalZips: number;
  completedZips: number;
  skippedZips: number;
  remainingZips: number;
  status: 'pending' | 'in-progress' | 'completed' | 'skipped';
  lastActivity: Date;
  startedAt?: Date;
  completedAt?: Date;
}

export interface DailyActivity {
  date: string; // YYYY-MM-DD format
  searchesGenerated: number;
  citiesCompleted: number;
  zipsCompleted: number;
  timeSpent: number; // in minutes
}

export interface SearchHistoryItem {
  id: string;
  industry: string;
  city: string;
  state: string;
  zip: string;
  searchTerm: string;
  generatedAt: Date;
  completedAt?: Date;
  status: 'generated' | 'completed' | 'skipped';
}

export interface ProgressMetrics {
  totalCitiesExplored: number;
  totalZipsCompleted: number;
  currentCity: CityProgress | null;
  remainingZips: number;
  searchesGenerated: number;
  progressPercentage: number;
  dailyActivity: DailyActivity[];
}

export interface ProgressAction {
  type: 'complete' | 'skip' | 'resume' | 'reset';
  cityId?: string;
  zipCode?: string;
  timestamp: Date;
}