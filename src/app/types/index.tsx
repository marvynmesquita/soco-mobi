// Você pode criar um arquivo para tipos, como src/app/types/index.ts
// ou simplesmente declarar no componente por enquanto.

export interface Line {
    id: string;
    name: string;
    origin: string;
    destination: string;
    fare: number;
    // Adicione outros campos que sua API retorna
    // Ex: stops, schedule, etc.
  }