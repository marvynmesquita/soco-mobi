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
}

export default function MapComponent({ center, zoom, selectedPlace, userLocation, className }: MapComponentProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Map
        style={{ width: '100%', height: '100%' }}
        center={center}
        zoom={zoom}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        mapId="SUA_MAP_ID_CUSTOMIZADA" // Opcional: Para um estilo de mapa customizado
      >
        {/* Marcador para a localização ATUAL do usuário (agora um pino teal) */}
        {userLocation && (
          <AdvancedMarker position={userLocation}>
            <div className="w-5 h-5 bg-teal-500 rounded-full border-2 border-white shadow-md"></div>
          </AdvancedMarker>
        )}
        
        {/* Marcador para o local PESQUISADO, se existir (agora um pino teal mais escuro) */}
        {selectedPlace?.geometry?.location && (
          <AdvancedMarker position={selectedPlace.geometry.location}>
            <MapPin className="text-teal-700 w-8 h-8" />
          </AdvancedMarker>
        )}
      </Map>
    </div>
  );
}