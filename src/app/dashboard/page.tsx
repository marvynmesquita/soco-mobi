"use client";

import React, { useState, useEffect, useCallback } from "react";
import { UserButton } from "@clerk/nextjs";
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import MapComponent from "../components/MapComponent";
import SearchSection from "../components/SearchSection";
import TripDetailsCard from "../components/TripDetailsCard";
import { LoaderCircle } from "lucide-react";
import type { Place } from "@googlemaps/google-maps-services-js";
import { TripPlan } from "../types"; // Importa o nosso novo tipo

export default function DashboardPage() {
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [bounds, setBounds] = useState<google.maps.LatLngBounds | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [showTripDetails, setShowTripDetails] = useState(false);
  const [tripInfo, setTripInfo] = useState<TripPlan | null>(null); // USA O TIPO CORRETO
  const [tripSegment, setTripSegment] = useState<google.maps.LatLngLiteral[] | undefined>(undefined);

  const geometry = useMapsLibrary('geometry');
  const core = useMapsLibrary('core');

  useEffect(() => {
    if (navigator.geolocation && !userLocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const newLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
        setUserLocation(newLocation);
      });
    }
  }, [userLocation]);

  const resetState = useCallback(() => {
    setShowTripDetails(false);
    setTripInfo(null);
    setTripSegment(undefined);
    setSelectedPlace(null);
    setBounds(null);
  }, []);

  const handlePlaceSelect = useCallback(async (place: Place | null) => {
    resetState();
    setSelectedPlace(place);

    if (userLocation && place?.geometry?.location && typeof place.geometry.location.lat === 'function' && core && geometry) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      const toAddress = place.formatted_address || `${lat},${lng}`;

      setIsLoading(true);

      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        const encodedAddress = encodeURIComponent(toAddress);

        const tripResponse = await fetch(`${backendUrl}/planner/trip?fromLat=${userLocation.lat}&fromLng=${userLocation.lng}&toAddress=${encodedAddress}`);
        if (!tripResponse.ok) throw new Error(`Planner API failed: ${tripResponse.statusText}`);
        const tripData = await tripResponse.json();
        
        setTripInfo(tripData.plan);

        if (tripData.plan?.line?.polyline) {
          const decodedPath = geometry.encoding.decodePath(tripData.plan.line.polyline);
          setTripSegment(decodedPath);
          
          const newBounds = new core.LatLngBounds();
          newBounds.extend(userLocation);
          newBounds.extend({ lat, lng });
          decodedPath.forEach(point => newBounds.extend(point));
          setBounds(newBounds);
        } else {
           const newBounds = new core.LatLngBounds();
           newBounds.extend(userLocation);
           newBounds.extend({ lat, lng });
           setBounds(newBounds);
        }
        setShowTripDetails(true);
      } catch (error) {
        console.error("Erro ao buscar plano de viagem:", error);
        setTripInfo({ error: "Não foi possível carregar os detalhes da viagem." } as TripPlan);
        setShowTripDetails(true);
      } finally {
        setIsLoading(false);
      }
    }
  }, [userLocation, core, geometry, resetState]);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="h-1/2 w-full relative">
        <MapComponent
          initialCenter={{ lat: -22.9, lng: -42.5 }}
          initialZoom={14}
          selectedPlace={selectedPlace}
          userLocation={userLocation}
          tripSegment={tripSegment}
          tripInfo={tripInfo}
          boundsToFit={bounds}
          className="w-full h-full"
        />
        <header className="absolute top-0 right-0 z-20 p-4">
            <div className="bg-white dark:bg-gray-800 p-1.5 rounded-full shadow-lg">
                <UserButton afterSignOutUrl="/" />
            </div>
        </header>
      </div>

      <div className="flex-1 w-full bg-white dark:bg-gray-800 overflow-y-auto p-4 border-t-2 border-gray-200 dark:border-gray-700">
          <div className="max-w-md mx-auto">
            {isLoading ? (
              <div className="flex justify-center items-center h-full text-gray-400 pt-10">
                  <LoaderCircle className="animate-spin mr-2"/> Buscando melhor rota...
              </div>
            ) : showTripDetails ? (
              <TripDetailsCard tripInfo={tripInfo} onClose={resetState} />
            ) : (
              <SearchSection
                onPlaceSelect={handlePlaceSelect}
                destination={selectedPlace}
              />
            )}
          </div>
      </div>
    </div>
  );
}