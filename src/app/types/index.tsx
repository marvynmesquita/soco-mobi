// Define a estrutura para uma parada de ônibus
export interface Stop {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  estimatedArrivalTime?: string; // Horário pode ser opcional
}

// Define a estrutura para uma linha de ônibus
export interface Line {
  id: string;
  number: string;
  origin: string;
  destination: string;
  polyline?: string; // Polyline da rota completa
  encodedPolyline?: string; // Polyline do trecho da viagem
}

// Define a estrutura completa do plano de viagem
export interface TripPlan {
  line: Line;
  boardingStop: Stop;
  disembarkingStop: Stop;
  busRouteSegment: Stop[];
  instructions?: { // Instruções podem ser opcionais
    walkToStop: string;
    estimatedBusArrival: string;
    leaveAt: string;
  };
  // Para mensagens de erro ou informativas da API
  error?: string;
  message?: string;
}