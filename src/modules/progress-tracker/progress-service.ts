/**
 * Progress Tracker Service
 * Tracks search progress, activity, and completion status
 */

import {
  CityProgress,
  DailyActivity,
  SearchHistoryItem,
  ProgressMetrics,
  ProgressAction
} from './types';

export class ProgressTrackerService {
  private cityProgress: Map<string, CityProgress> = new Map();
  private searchHistory: SearchHistoryItem[] = [];
  private dailyActivity: Map<string, DailyActivity> = new Map();
  private currentCityId: string | null = null;

  /**
   * Initialize tracking for a city
   */
  initializeCityProgress(cityId: string, cityName: string, state: string, totalZips: number): CityProgress {
    const progress: CityProgress = {
      cityId,
      cityName,
      state,
      totalZips,
      completedZips: 0,
      skippedZips: 0,
      remainingZips: totalZips,
      status: 'pending',
      lastActivity: new Date(),
      startedAt: new Date()
    };

    this.cityProgress.set(cityId, progress);
    this.currentCityId = cityId;
    
    return progress;
  }

  /**
   * Get progress for a specific city
   */
  getCityProgress(cityId: string): CityProgress | undefined {
    return this.cityProgress.get(cityId);
  }

  /**
   * Get current city progress
   */
  getCurrentCityProgress(): CityProgress | null {
    if (!this.currentCityId) return null;
    return this.cityProgress.get(this.currentCityId) || null;
  }

  /**
   * Mark ZIP as completed
   */
  markZipCompleted(cityId: string): void {
    const progress = this.cityProgress.get(cityId);
    if (!progress) return;

    progress.completedZips++;
    progress.remainingZips = Math.max(0, progress.remainingZips - 1);
    progress.lastActivity = new Date();

    if (progress.completedZips >= progress.totalZips) {
      progress.status = 'completed';
      progress.completedAt = new Date();
    } else {
      progress.status = 'in-progress';
    }

    this.updateDailyActivity();
  }

  /**
   * Mark ZIP as skipped
   */
  markZipSkipped(cityId: string): void {
    const progress = this.cityProgress.get(cityId);
    if (!progress) return;

    progress.skippedZips++;
    progress.remainingZips = Math.max(0, progress.remainingZips - 1);
    progress.lastActivity = new Date();

    if (progress.completedZips + progress.skippedZips >= progress.totalZips) {
      progress.status = 'skipped';
    }

    this.updateDailyActivity();
  }

  /**
   * Mark city as complete
   */
  markCityComplete(cityId: string): void {
    const progress = this.cityProgress.get(cityId);
    if (!progress) return;

    progress.status = 'completed';
    progress.completedAt = new Date();
    progress.lastActivity = new Date();
    progress.remainingZips = 0;

    this.updateDailyActivity();
  }

  /**
   * Skip city
   */
  skipCity(cityId: string): void {
    const progress = this.cityProgress.get(cityId);
    if (!progress) return;

    progress.status = 'skipped';
    progress.lastActivity = new Date();

    this.updateDailyActivity();
  }

  /**
   * Resume city progress
   */
  resumeCity(cityId: string): void {
    const progress = this.cityProgress.get(cityId);
    if (!progress) return;

    progress.status = 'in-progress';
    progress.lastActivity = new Date();
    this.currentCityId = cityId;

    this.updateDailyActivity();
  }

  /**
   * Reset city progress
   */
  resetCityProgress(cityId: string): void {
    const progress = this.cityProgress.get(cityId);
    if (!progress) return;

    progress.completedZips = 0;
    progress.skippedZips = 0;
    progress.remainingZips = progress.totalZips;
    progress.status = 'pending';
    progress.lastActivity = new Date();
    delete progress.startedAt;
    delete progress.completedAt;

    this.updateDailyActivity();
  }

  /**
   * Add search history item
   */
  addSearchHistory(item: SearchHistoryItem): void {
    this.searchHistory.push(item);
    this.updateDailyActivity();
  }

  /**
   * Get search history
   */
  getSearchHistory(limit?: number): SearchHistoryItem[] {
    const sorted = [...this.searchHistory].sort((a, b) => 
      b.generatedAt.getTime() - a.generatedAt.getTime()
    );
    return limit ? sorted.slice(0, limit) : sorted;
  }

  /**
   * Update daily activity
   */
  private updateDailyActivity(): void {
    const today = new Date().toISOString().split('T')[0];
    let activity = this.dailyActivity.get(today);

    if (!activity) {
      activity = {
        date: today,
        searchesGenerated: 0,
        citiesCompleted: 0,
        zipsCompleted: 0,
        timeSpent: 0
      };
      this.dailyActivity.set(today, activity);
    }

    // Update metrics based on current state
    activity.searchesGenerated = this.searchHistory.length;
    activity.citiesCompleted = Array.from(this.cityProgress.values())
      .filter(p => p.status === 'completed').length;
    activity.zipsCompleted = Array.from(this.cityProgress.values())
      .reduce((sum, p) => sum + p.completedZips, 0);
  }

  /**
   * Get daily activity
   */
  getDailyActivity(days: number = 7): DailyActivity[] {
    const activities: DailyActivity[] = [];
    const today = new Date();

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      const activity = this.dailyActivity.get(dateStr) || {
        date: dateStr,
        searchesGenerated: 0,
        citiesCompleted: 0,
        zipsCompleted: 0,
        timeSpent: 0
      };

      activities.push(activity);
    }

    return activities;
  }

  /**
   * Get comprehensive progress metrics
   */
  getProgressMetrics(): ProgressMetrics {
    const cities = Array.from(this.cityProgress.values());
    const totalCitiesExplored = cities.length;
    const totalZipsCompleted = cities.reduce((sum, city) => sum + city.completedZips, 0);
    const currentCity = this.getCurrentCityProgress();
    const remainingZips = cities.reduce((sum, city) => sum + city.remainingZips, 0);
    const searchesGenerated = this.searchHistory.length;
    
    const totalPossibleZips = cities.reduce((sum, city) => sum + city.totalZips, 0);
    const progressPercentage = totalPossibleZips > 0 
      ? (totalZipsCompleted / totalPossibleZips) * 100 
      : 0;

    const dailyActivity = this.getDailyActivity(7);

    return {
      totalCitiesExplored,
      totalZipsCompleted,
      currentCity,
      remainingZips,
      searchesGenerated,
      progressPercentage,
      dailyActivity
    };
  }

  /**
   * Get recently completed cities
   */
  getRecentlyCompletedCities(limit: number = 5): CityProgress[] {
    return Array.from(this.cityProgress.values())
      .filter(city => city.status === 'completed')
      .sort((a, b) => {
        const dateA = a.completedAt?.getTime() || 0;
        const dateB = b.completedAt?.getTime() || 0;
        return dateB - dateA;
      })
      .slice(0, limit);
  }

  /**
   * Get all city progress
   */
  getAllCityProgress(): CityProgress[] {
    return Array.from(this.cityProgress.values());
  }

  /**
   * Reset all progress
   */
  resetAllProgress(): void {
    this.cityProgress.clear();
    this.searchHistory = [];
    this.dailyActivity.clear();
    this.currentCityId = null;
  }

  /**
   * Record progress action
   */
  recordAction(action: ProgressAction): void {
    // Store action for audit trail (could be expanded later)
    // No-op for now - tracking can be added later if needed
    console.log('Action recorded:', action.type);
  }
}