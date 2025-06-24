'use client';

import { useRef, useEffect } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { Search } from 'lucide-react';

interface SearchSectionProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
  destination: google.maps.places.PlaceResult | null;
}

export default function SearchSection({ onPlaceSelect, destination }: SearchSectionProps) {
  const places = useMapsLibrary('places');
  const destinationInputRef = useRef<HTMLInputElement>(null);
  const destinationAutocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (!places || !destinationInputRef.current) return;

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

    destinationAutocompleteRef.current = new places.Autocomplete(destinationInputRef.current, options);
    
    // O listener agora chama a propriedade onPlaceSelect corretamente
    const destinationListener = destinationAutocompleteRef.current.addListener('place_changed', () => {
      onPlaceSelect(destinationAutocompleteRef.current?.getPlace() || null);
    });

    return () => {
        google.maps.event.removeListener(destinationListener);
    };
  }, [places, onPlaceSelect]);

  useEffect(() => {
    if (destinationInputRef.current) {
        destinationInputRef.current.value = destination?.formatted_address || destination?.name || '';
    }
  }, [destination]);

  return (
    <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Para onde vamos?</h2>
        <div className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <Search className="h-5 w-5 text-teal-500" />
            <input 
                ref={destinationInputRef}
                placeholder="Procure seu destino..."
                className="w-full bg-transparent focus:outline-none text-gray-900 dark:text-gray-200"
                onFocus={(e) => e.target.select()}
            />
        </div>
    </div>
  );
}