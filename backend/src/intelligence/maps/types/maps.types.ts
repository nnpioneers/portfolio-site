export interface LocationCoordinates {
  lat: number;
  lng: number;
}

export interface PlaceResult {
  id: string;
  name: string;
  types: string[];
  rating: number;
  userRatingsTotal: number;
  location: LocationCoordinates;
  distanceMs?: number; // Distance in meters from center
}

export interface LocationAnalysis {
  requestedArea: string;
  coordinates: LocationCoordinates;
  competitionScore: number; // 0-100 (100 = very high competition)
  demandScore: number; // 0-100 (100 = very high demand)
  opportunityScore: number; // 0-100 (Higher is better)
  nearbyCompetitors: PlaceResult[];
  nearbyTransport: PlaceResult[];
  marketSaturation: 'LOW' | 'MEDIUM' | 'HIGH';
  businessSuitability: string;
}
