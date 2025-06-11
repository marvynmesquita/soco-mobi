"use client";
import { DestinationContext } from "./context/DestinationContext";
import { SourceContext } from "./context/SourceContext";
import OnboardingScreen from "./onboarding/page";
import React, { useState } from "react";

export default function Home() {
  const [source, setSource] = useState([]);
  const [destination, setDestination] = useState([]);

  return (
    <SourceContext.Provider value={{ source, setSource }}>
      <DestinationContext.Provider value={{ destination, setDestination }}>
        <OnboardingScreen />
      </DestinationContext.Provider>
    </SourceContext.Provider>
  );
}
