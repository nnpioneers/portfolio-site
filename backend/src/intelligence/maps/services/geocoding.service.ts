import { LocationCoordinates } from '../types/maps.types';

export class GeocodingService {
  /**
   * Converts a string location into lat/lng.
   * Mocked for development to avoid API costs.
   */
  async getCoordinates(locationQuery: string): Promise<LocationCoordinates> {
    console.log(`[GeocodingService] Fetching coordinates for: ${locationQuery}`);
    // Mock response simulating Google Geocoding API
    return {
      lat: 12.9716,
      lng: 77.5946
    };
  }
}
