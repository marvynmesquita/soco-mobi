'use client';

import { useRef, useEffect } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { Search } from 'lucide-react'; // 1. Importar o ícone de busca

interface SearchSectionProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

// O componente RouteIndicator foi removido.

export default function SearchSection({ onPlaceSelect }: SearchSectionProps) {
  const places = useMapsLibrary('places');
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const saquaremaBounds = {
      north: -22.84,
      south: -22.98,
      west: -42.72,
      east: -42.39,
    };

    const options = {
      fields: ['geometry', 'name', 'formatted_address'],
      bounds: saquaremaBounds,
      strictBounds: true,
    };

    autocompleteRef.current = new places.Autocomplete(inputRef.current, options);
    const listener = autocompleteRef.current.addListener('place_changed', () => {
      onPlaceSelect(autocompleteRef.current?.getPlace() || null);
    });

    return () => listener.remove();
  }, [places, onPlaceSelect]);

  return (
    // O layout foi simplificado para alinhar o ícone e o input
    <div className="bg-teal-700 p-3 rounded-lg shadow-2xl flex items-center">
      {/* 2. Substituir o RouteIndicator pelo ícone de Search */}
      <Search className="h-6 w-6 text-teal-300 mr-3 flex-shrink-0" />
      
      {/* 3. Manter apenas o input de destino */}
      <input
        ref={inputRef}
        placeholder="Vai para onde?"
        className="w-full bg-transparent text-white placeholder-teal-200 focus:outline-none"
      />
    </div>
  );
}