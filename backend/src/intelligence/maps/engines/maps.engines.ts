import { PlaceResult } from '../types/maps.types';

export class CompetitionAnalyzer {
  static analyze(competitors: PlaceResult[]): { score: number; saturation: 'LOW' | 'MEDIUM' | 'HIGH' } {
    if (competitors.length === 0) return { score: 10, saturation: 'LOW' };

    let totalRatings = 0;
    let avgRating = 0;

    competitors.forEach(c => {
      totalRatings += c.userRatingsTotal;
      avgRating += c.rating;
    });
    avgRating /= competitors.length;

    let score = (competitors.length * 10) + (avgRating * 5);
    score = Math.min(Math.max(score, 0), 100);

    let saturation: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';
    if (score > 70) saturation = 'HIGH';
    else if (score > 40) saturation = 'MEDIUM';

    return { score, saturation };
  }
}

export class LocationScoreEngine {
  static calculate(demandFactor: number, competitionScore: number): number {
    // 0 to 100
    const score = (demandFactor * 0.7) + ((100 - competitionScore) * 0.3);
    return Math.min(Math.max(score, 0), 100);
  }
}

export class BusinessSuitabilityEngine {
  static evaluate(businessType: string, demandScore: number, saturation: string): string {
    if (demandScore > 75 && saturation === 'LOW') {
      return `Highly suitable for a new ${businessType}. High demand with low competition.`;
    }
    if (demandScore > 75 && saturation === 'HIGH') {
      return `Market is saturated for ${businessType}s. A highly differentiated strategy is required to succeed.`;
    }
    if (demandScore < 40) {
      return `Low natural footfall detected. This location requires heavy marketing to drive destination traffic for a ${businessType}.`;
    }
    return `Moderate suitability. Focus on local SEO and community engagement.`;
  }
}
