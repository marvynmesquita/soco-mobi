"use client";

import React, { useState, useEffect } from "react";
import { UserButton } from "@clerk/nextjs";
import MapComponent from "../components/MapComponent";
import SearchSection from "../components/SearchSection";
import type { Place } from "@googlemaps/google-maps-services-js";

export default function DashboardPage() {
  const [userLocation, setUserLocation] = useState({ lat: -22.8922, lng: -42.4768 });
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  
  // O viewport do mapa agora é um estado separado para podermos controlá-lo
  const [viewport, setViewport] = useState({
    center: userLocation,
    zoom: 15,
  });

  // Efeito para obter a localização do usuário (lógica mantida)
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(newLocation);
        // Apenas atualiza o mapa para a localização do usuário se nenhum lugar foi pesquisado
        if (!selectedPlace) {
          setViewport({ center: newLocation, zoom: 15 });
        }
      });
    }
  }, [selectedPlace]);

  // Callback para quando um lugar é selecionado na busca
  const handlePlaceSelect = (place: Place | null) => {
    setSelectedPlace(place);
    if (place?.geometry?.location) {
      setViewport({
        center: place.geometry.location,
        zoom: 15,
      });
    }
  };

  return (
    // O container principal agora é 'relative' para posicionar os filhos sobre ele
    <div className="relative min-h-screen">
      {/* O mapa agora ocupa todo o espaço, posicionado absolutamente no fundo */}
      <div className="absolute inset-0 z-0">
        <MapComponent
          center={viewport.center}
          zoom={viewport.zoom}
          selectedPlace={selectedPlace}
          userLocation={userLocation} // Passando a localização do usuário para um marcador separado
        />
      </div>

      {/* Container para a UI sobreposta. Usamos z-10 para ficar na frente do mapa */}
      {/* pointer-events-none permite cliques "através" do container, no mapa */}
      <div className="absolute inset-0 z-10 flex flex-col p-4 sm:p-6 pointer-events-none">
        {/* Header flutuante */}
        <header className="flex justify-end w-full pointer-events-auto">
          <div className="bg-white dark:bg-gray-800 p-1.5 rounded-full shadow-lg">
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>

        {/* Corpo principal da UI */}
        <div className="flex-1 flex flex-col justify-start mt-4">
          {/* A seção de busca agora é um card flutuante */}
          {/* pointer-events-auto torna apenas este elemento clicável */}
          <div className="w-full max-w-md mx-auto pointer-events-auto">
            <SearchSection onPlaceSelect={handlePlaceSelect} />
          </div>
        </div>
      </div>
    </div>
  );
}