/**
 * Progress Tracker Module
 * Tracks search generation progress and completion status
 * Phase 4: Progress Tracker Implementation
 */

import { ProgressTrackerService } from './progress-service';

// Export types
export * from './types';

// Export progress tracker service
export { ProgressTrackerService };

// Main Progress Tracker class
export class ProgressTracker {
  private static service: ProgressTrackerService;

  static getService(): ProgressTrackerService {
    if (!this.service) {
      this.service = new ProgressTrackerService();
    }
    return this.service;
  }

  static version = '4.0.0';
  static status = 'active';
}