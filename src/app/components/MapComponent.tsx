'use client';

import {
  Map,
  AdvancedMarker,
  useMap,
} from '@vis.gl/react-google-maps';
import type { Place } from '@googlemaps/google-maps-services-js';
import { MapPin, Bus, Footprints } from 'lucide-react';
import { useEffect } from 'react';

// Componente DirectionsRenderer para rotas a pé
const DirectionsRenderer = ({
  origin,
  destination,
  travelMode,
  strokeColor,
}: {
  origin: google.maps.LatLngLiteral;
  destination: google.maps.LatLngLiteral;
  travelMode: google.maps.TravelMode;
  strokeColor: string;
}) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const directionsService = new google.maps.DirectionsService();
    const renderer = new google.maps.DirectionsRenderer({
      map,
      suppressMarkers: true,
      polylineOptions: {
        strokeColor,
        strokeWeight: 5,
        strokeOpacity: 0.8,
      },
    });

    directionsService.route(
      {
        origin,
        destination,
        travelMode,
      },
      (result, status) => {
        if (status === 'OK' && result) {
          renderer.setDirections(result);
        } else {
          console.error('Erro ao buscar rota:', status, result);
        }
      }
    );

    return () => {
      renderer.setMap(null);
    };
  }, [map, origin, destination, travelMode, strokeColor]);

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

export default function MapComponent({
  initialCenter,
  initialZoom,
  selectedPlace,
  userLocation,
  className,
  tripSegment,
  tripInfo,
  boundsToFit,
}: MapComponentProps) {
  const map = useMap();

  const boardingStopLocation =
    tripInfo?.boardingStop?.latitude && tripInfo?.boardingStop?.longitude
      ? {
          lat: tripInfo.boardingStop.latitude,
          lng: tripInfo.boardingStop.longitude,
        }
      : null;

  const disembarkingStopLocation =
    tripInfo?.disembarkingStop?.latitude && tripInfo?.disembarkingStop?.longitude
      ? {
          lat: tripInfo.disembarkingStop.latitude,
          lng: tripInfo.disembarkingStop.longitude,
        }
      : null;

  const finalDestinationLocation = selectedPlace?.geometry?.location;

  // Ajuste da viewport com base nos bounds calculados
  useEffect(() => {
    if (map && boundsToFit) {
      const padding = {
        top: 80,
        bottom: window.innerHeight * 0.55 + 30,
        left: 30,
        right: 30,
      };
      map.fitBounds(boundsToFit, padding);
    }
  }, [map, boundsToFit]);

  // Rota da linha de ônibus (polyline manual)
  useEffect(() => {
    if (!map || !tripSegment || tripSegment.length < 2) return;

    const polyline = new google.maps.Polyline({
      path: tripSegment,
      geodesic: true,
      strokeColor: '#0d9488',
      strokeOpacity: 0.9,
      strokeWeight: 5,
    });

    polyline.setMap(map);

    return () => {
      polyline.setMap(null);
    };
  }, [map, tripSegment]);

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
        {/* Marcadores */}
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
            <div className="p-1 bg-teal-600 rounded-full shadow-md">
              <Bus className="text-white w-5 h-5" />
            </div>
          </AdvancedMarker>
        )}

        {disembarkingStopLocation && (
          <AdvancedMarker position={disembarkingStopLocation} zIndex={10} title="Ponto de Desembarque">
            <div className="p-1 bg-red-600 rounded-full shadow-md">
              <Footprints className="text-white w-5 h-5" />
            </div>
          </AdvancedMarker>
        )}

        {/* Caminho a pé até o ponto */}
        {userLocation && boardingStopLocation && (
          <DirectionsRenderer
            origin={userLocation}
            destination={boardingStopLocation}
            travelMode={google.maps.TravelMode.WALKING}
            strokeColor="#4f46e5"
          />
        )}

        {/* Caminho a pé do ponto final até o destino */}
        {disembarkingStopLocation && finalDestinationLocation && (
          <DirectionsRenderer
            origin={disembarkingStopLocation}
            destination={finalDestinationLocation}
            travelMode={google.maps.TravelMode.WALKING}
            strokeColor="#4f46e5"
          />
        )}
      </Map>
    </div>
  );
}
