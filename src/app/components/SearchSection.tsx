"use client";

import React, { useState, useEffect } from "react";
import { UserButton } from "@clerk/nextjs";
import MapComponent from "../components/MapComponent";
import SearchSection from "../components/SearchSection";
import LineResults from "../components/LineResults"; // 1. Importar o novo componente de resultados
import type { Place } from "@googlemaps/google-maps-services-js";

// Definimos um tipo para a resposta da nossa API de linhas
type BusLine = {
  id_linha: number;
  nome_linha: string;
};

export default function DashboardPage() {
  const [userLocation, setUserLocation] = useState({ lat: -22.8922, lng: -42.4768 });
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [viewport, setViewport] = useState({ center: userLocation, zoom: 15 });
  
  // 2. Novos estados para gerenciar os resultados da busca e o carregamento
  const [nearbyLines, setNearbyLines] = useState<BusLine[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  // 3. Atualizar a função para chamar o backend
  const handlePlaceSelect = async (place: Place | null) => {
    setSelectedPlace(place);
    setNearbyLines([]); // Limpa os resultados anteriores

    if (place?.geometry?.location) {
      setViewport({ center: place.geometry.location, zoom: 15 });
      setIsLoading(true); // Ativa o estado de carregamento

      const lat = place.geometry.location.lat;
      const lng = place.geometry.location.lng;
      const api = process.env.NEXT_BACKEND_URL || "http://localhost:3000";

      try {
        const response = await fetch(`${api}/api/linhas-por-proximidade?lat=${lat}&lon=${lng}`);
        const linesData: BusLine[] = await response.json();
        setNearbyLines(linesData);
      } catch (error) {
        console.error("Erro ao buscar linhas de ônibus:", error);
      } finally {
        setIsLoading(false); // Desativa o estado de carregamento
      }
    }
  };

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 z-0">
        <MapComponent
          center={viewport.center}
          zoom={viewport.zoom}
          selectedPlace={selectedPlace}
          userLocation={userLocation}
        />
      </div>

      <div className="absolute inset-0 z-10 flex flex-col p-4 sm:p-6 pointer-events-none">
        <header className="flex justify-end w-full pointer-events-auto">
          <div className="bg-white dark:bg-gray-800 p-1.5 rounded-full shadow-lg">
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>

        <div className="flex-1 flex flex-col justify-start mt-4">
          <div className="w-full max-w-md mx-auto pointer-events-auto">
            <SearchSection onPlaceSelect={handlePlaceSelect} />
            
            {/* 4. Renderizar o componente de resultados */}
            {(isLoading || selectedPlace) && (
              <LineResults loading={isLoading} lines={nearbyLines} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}