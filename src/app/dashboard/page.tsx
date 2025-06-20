"use client";

import React, { useState, useEffect, useCallback } from "react";
import { UserButton } from "@clerk/nextjs";
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import MapComponent from "../components/MapComponent";
import SearchSection from "../components/SearchSection";
import type { Place } from "@googlemaps/google-maps-services-js";
import LineResults from "../components/LineResults";

type BusLine = {
    id_linha: number;
    nome_linha: string;
};

export default function DashboardPage() {
  const [userLocation, setUserLocation] = useState({ lat: -22.8922, lng: -42.4768 });
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  
  const [viewport, setViewport] = useState({
    center: userLocation,
    zoom: 15,
  });

  const [lines, setLines] = useState<BusLine[]>([]);
  const [loading, setLoading] = useState(false);
  
  const geocoding = useMapsLibrary('geocoding');
  const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null);

  useEffect(() => {
    if (geocoding) {
        setGeocoder(new geocoding.Geocoder());
    }
  }, [geocoding]);


  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(newLocation);
        if (!selectedPlace) {
          setViewport({ center: newLocation, zoom: 15 });
        }
      });
    }
  }, [selectedPlace]);

  const handleDestinationSelect = useCallback((place: Place | null) => {
    setSelectedPlace(place);
    if (place?.geometry?.location) {
      setViewport({
        center: place.geometry.location,
        zoom: 15,
      });

      setLoading(true);
      setLines([]);
      setTimeout(() => {
        const mockLines: BusLine[] = [
          { id_linha: 1, nome_linha: "BACAXÁ X VILATUR" },
          { id_linha: 2, nome_linha: "SAQUAREMA X SAMPAIO" },
        ];
        setLines(mockLines);
        setLoading(false);
      }, 1500);
    } else {
      setLines([]);
      setSelectedPlace(null);
    }
  }, []);

  const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
      if (!geocoder || !e.detail.latLng) return;
      
      geocoder.geocode({ location: e.detail.latLng }, (results, status) => {
          if (status === 'OK' && results && results[0]) {
              const placeResult: Place = {
                  formatted_address: results[0].formatted_address,
                  geometry: {
                    location: results[0].geometry.location,
                  },
                  name: results[0].formatted_address.split(',')[0],
              };
              handleDestinationSelect(placeResult);
          } else {
              console.error(`Geocode falhou pelo seguinte motivo: ${status}`);
          }
      });

  }, [geocoder, handleDestinationSelect]);


  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 z-0 h-full">
        <MapComponent
          center={viewport.center}
          zoom={viewport.zoom}
          selectedPlace={selectedPlace}
          userLocation={userLocation}
          onMapClick={handleMapClick}
          styleClass="w-full h-7/12"
        />
      </div>

      <header className="absolute top-0 right-0 z-20 p-4 sm:p-6">
        <div className="bg-white dark:bg-gray-800 p-1.5 rounded-full shadow-lg">
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      {/* Painel Inferior */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="bg-white dark:bg-gray-800 rounded-t-2xl shadow-2xl p-4 sm:p-6 h-[55vh] overflow-y-auto">
            <div className="max-w-md mx-auto">
                <SearchSection 
                    onDestinationSelect={handleDestinationSelect}
                    destination={selectedPlace}
                />
                <div className="mt-4">
                  {(loading || selectedPlace) && (
                      <LineResults loading={loading} lines={lines} />
                  )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}