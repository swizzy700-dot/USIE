/**
 * History Module
 * Maintains search target history and past generations
 * Phase 4: History Implementation (uses Progress Tracker)
 */

import { ProgressTracker } from '../progress-tracker';
import type { SearchHistoryItem } from '../progress-tracker/types';

// Export types from progress tracker
export type { SearchHistoryItem } from '../progress-tracker/types';

// Main History class (delegates to Progress Tracker)
export class HistoryModule {
  private static getService() {
    return ProgressTracker.getService();
  }

  static addSearchHistory(item: SearchHistoryItem): void {
    this.getService().addSearchHistory(item);
  }

  static getSearchHistory(limit?: number): SearchHistoryItem[] {
    return this.getService().getSearchHistory(limit);
  }

  static version = '4.0.0';
  static status = 'active';
}