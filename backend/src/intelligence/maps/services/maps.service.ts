import { GeocodingService } from './geocoding.service';
import { PlacesService } from './places.service';
import { CompetitionAnalyzer, LocationScoreEngine, BusinessSuitabilityEngine } from '../engines/maps.engines';
import { LocationAnalysis } from '../types/maps.types';

export class MapsService {
  private geocoder: GeocodingService;
  private places: PlacesService;

  constructor() {
    this.geocoder = new GeocodingService();
    this.places = new PlacesService();
  }

  async analyzeBusinessLocation(area: string, businessType: string): Promise<LocationAnalysis> {
    console.log(`[MapsService] Analyzing location: ${area} for a ${businessType}`);

    // 1. Get Coordinates
    const coords = await this.geocoder.getCoordinates(area);

    // 2. Fetch Nearby Data (Competitors & Transport hubs)
    const competitors = await this.places.searchNearby(coords, 2000, businessType);
    const transport = await this.places.searchNearby(coords, 2000, 'transit_station');

    // 3. Run Analysis Engines
    const competitionResult = CompetitionAnalyzer.analyze(competitors);
    
    // Mocking demand factor (e.g., higher if transport hubs are nearby)
    const demandFactor = transport.length > 0 ? 80 : 40;
    const opportunityScore = LocationScoreEngine.calculate(demandFactor, competitionResult.score);

    const suitability = BusinessSuitabilityEngine.evaluate(
      businessType, 
      demandFactor, 
      competitionResult.saturation
    );

    return {
      requestedArea: area,
      coordinates: coords,
      competitionScore: competitionResult.score,
      demandScore: demandFactor,
      opportunityScore: Math.round(opportunityScore),
      nearbyCompetitors: competitors,
      nearbyTransport: transport,
      marketSaturation: competitionResult.saturation,
      businessSuitability: suitability
    };
  }
}
