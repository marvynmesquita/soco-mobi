// src/app/components/MapsProvider.tsx
"use client";

import { APIProvider } from '@vis.gl/react-google-maps';

export default function MapsProvider({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <APIProvider
      apiKey={process.env.NEXT_PUBLIC_Maps_API_KEY!}
      // Adicionado 'geometry' para decodificar polylines
      libraries={['places', 'geocoding', 'routes', 'geometry']}
    >
      {children}
    </APIProvider>
  );
}