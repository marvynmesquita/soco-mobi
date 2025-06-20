'use client';

import { Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import type { Place } from '@googlemaps/google-maps-services-js';
import { MapPin } from 'lucide-react';

interface MapComponentProps {
  center: google.maps.LatLngLiteral;
  zoom: number;
  selectedPlace: Place | null;
  userLocation: google.maps.LatLngLiteral;
  className?: string;
  onMapClick?: (e: google.maps.MapMouseEvent) => void;
}

export default function MapComponent({ center, zoom, selectedPlace, userLocation, styleClass, onMapClick }: MapComponentProps) {
  return (
    <div className={`${styleClass}`}>
      <Map
        style={{ width: '100%', height: '100%' }}
        center={center}
        zoom={zoom}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        mapId="SUA_MAP_ID_CUSTOMIZADA"
        onClick={onMapClick}
      >
        {userLocation && (
          <AdvancedMarker position={userLocation}>
            <div className="w-5 h-5 bg-blue-500 rounded-full border-2 border-white shadow-md"></div>
          </AdvancedMarker>
        )}
        
        {selectedPlace?.geometry?.location && (
          <AdvancedMarker position={selectedPlace.geometry.location}>
            <MapPin className="text-teal-500 w-8 h-8" />
          </AdvancedMarker>
        )}
      </Map>
    </div>
  );
}