'use client';

import { Map, AdvancedMarker, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import type { Place } from '@googlemaps/google-maps-services-js';
import { MapPin, Bus, Footprints } from 'lucide-react';
import { useEffect, useState } from 'react';

// Componente genérico para desenhar rotas (a pé ou de carro)
const DirectionsRenderer = ({ origin, destination, travelMode, strokeColor }) => {
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer>();
  
  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map, suppressMarkers: true, polylineOptions: { strokeColor, strokeWeight: 5, strokeOpacity: 0.8 } }));
  }, [routesLibrary, map, strokeColor]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer || !origin || !destination) return;
    
    directionsService.route({
      origin,
      destination,
      travelMode: travelMode as google.maps.TravelMode,
    }).then(response => {
      directionsRenderer.setDirections(response);
    });

    return () => {
        if(directionsRenderer) directionsRenderer.setDirections(null);
    };
  }, [directionsService, directionsRenderer, origin, destination, travelMode]);

  return null;
};

interface MapComponentProps {
  initialCenter: google.maps.LatLngLiteral;
  initialZoom: number;
  selectedPlace: Place | null;
  userLocation: google.maps.LatLngLiteral | null;
  className?: string;
  tripSegment?: google.maps.LatLngLiteral[];
  tripInfo?: any;
  boundsToFit?: google.maps.LatLngBounds | null;
}

export default function MapComponent({ initialCenter, initialZoom, selectedPlace, userLocation, className, tripSegment, tripInfo, boundsToFit }: MapComponentProps) {
  const map = useMap();
  
  const boardingStopLocation = tripInfo?.boardingStop?.latitude ? { lat: tripInfo.boardingStop.latitude, lng: tripInfo.boardingStop.longitude } : null;
  const disembarkingStopLocation = tripInfo?.disembarkingStop?.latitude ? { lat: tripInfo.disembarkingStop.latitude, lng: tripInfo.disembarkingStop.longitude } : null;
  const finalDestinationLocation = selectedPlace?.geometry?.location;

  useEffect(() => {
    if (map && boundsToFit) {
      const padding = { top: 80, bottom: window.innerHeight * 0.55 + 30, left: 30, right: 30 };
      map.fitBounds(boundsToFit, padding);
    }
  }, [map, boundsToFit]);

  return (
    <div className={className}>
      <Map
        style={{ width: '100%', height: '100%' }}
        defaultCenter={initialCenter}
        defaultZoom={initialZoom}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        mapId="SUA_MAP_ID_CUSTOMIZADA"
      >
        {userLocation && (
          <AdvancedMarker position={userLocation} title="Sua localização">
             <div className="w-5 h-5 bg-blue-500 rounded-full border-2 border-white shadow-md"></div>
          </AdvancedMarker>
        )}
        
        {finalDestinationLocation && (
          <AdvancedMarker position={finalDestinationLocation} title="Destino final">
            <MapPin className="text-red-500 w-8 h-8" />
          </AdvancedMarker>
        )}
        
        {boardingStopLocation && (
            <AdvancedMarker position={boardingStopLocation} zIndex={10} title="Ponto de Embarque">
                <div className="p-1 bg-teal-600 rounded-full shadow-md"><Bus className="text-white w-5 h-5"/></div>
            </AdvancedMarker>
        )}

        {disembarkingStopLocation && (
            <AdvancedMarker position={disembarkingStopLocation} zIndex={10} title="Ponto de Desembarque">
                 <div className="p-1 bg-red-600 rounded-full shadow-md"><Footprints className="text-white w-5 h-5"/></div>
            </AdvancedMarker>
        )}

        {userLocation && boardingStopLocation && (
            <DirectionsRenderer origin={userLocation} destination={boardingStopLocation} travelMode={google.maps.TravelMode.WALKING} strokeColor="#4f46e5" />
        )}
        
        {tripSegment && tripSegment.length > 0 && (
            <DirectionsRenderer origin={tripSegment[0]} destination={tripSegment[tripSegment.length - 1]} travelMode={google.maps.TravelMode.DRIVING} strokeColor="#0d9488" />
        )}

        {disembarkingStopLocation && finalDestinationLocation && (
            <DirectionsRenderer origin={disembarkingStopLocation} destination={finalDestinationLocation} travelMode={google.maps.TravelMode.WALKING} strokeColor="#4f46e5" />
        )}
      </Map>
    </div>
  );
}