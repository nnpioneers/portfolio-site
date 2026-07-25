import { LocationCoordinates, PlaceResult } from '../types/maps.types';

export class PlacesService {
  /**
   * Finds places nearby a specific coordinate matching a keyword/type.
   * Mocked to avoid Google Places API costs during dev.
   */
  async searchNearby(
    location: LocationCoordinates,
    radius: number,
    keyword: string
  ): Promise<PlaceResult[]> {
    console.log(`[PlacesService] Searching nearby ${keyword} within ${radius}m of ${location.lat}, ${location.lng}`);
    
    // Mock simulating Google Places Nearby Search
    return [
      {
        id: `mock_${keyword}_1`,
        name: `Popular ${keyword} 1`,
        types: [keyword],
        rating: 4.5,
        userRatingsTotal: 340,
        location: { lat: location.lat + 0.001, lng: location.lng + 0.001 },
        distanceMs: 150
      },
      {
        id: `mock_${keyword}_2`,
        name: `Average ${keyword} 2`,
        types: [keyword],
        rating: 3.8,
        userRatingsTotal: 85,
        location: { lat: location.lat - 0.002, lng: location.lng + 0.002 },
        distanceMs: 400
      },
      {
        id: `mock_${keyword}_3`,
        name: `New ${keyword} 3`,
        types: [keyword],
        rating: 4.9,
        userRatingsTotal: 12,
        location: { lat: location.lat + 0.003, lng: location.lng - 0.001 },
        distanceMs: 600
      }
    ];
  }
}
