"use client"; // ESSA LINHA É A MAIS IMPORTANTE!

import { APIProvider } from '@vis.gl/react-google-maps';

// Este é um Client Component que encapsula o APIProvider.
export default function MapsProvider({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <APIProvider
      apiKey={process.env.NEXT_PUBLIC_Maps_API_KEY!}
      libraries={['places']}
    >
      {children}
    </APIProvider>
  );
}