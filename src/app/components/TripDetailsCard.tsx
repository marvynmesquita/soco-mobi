'use client';

import { Bus, Clock, MapPin, Search, Footprints } from 'lucide-react';

interface TripDetailsCardProps {
  tripInfo: any;
  onClose: () => void;
}

export default function TripDetailsCard({ tripInfo, onClose }: TripDetailsCardProps) {
  // Verificação mais robusta, procurando por 'line' para um plano válido
  const hasValidPlan = tripInfo && tripInfo.line;

  if (!hasValidPlan) {
    return (
      <div className="p-1 flex flex-col justify-between h-full">
        <div className="text-center text-gray-500 dark:text-gray-400 py-4 flex-grow flex flex-col justify-center items-center">
          <p>{tripInfo?.message || tripInfo?.error || "Não foi possível encontrar uma rota de ônibus para este destino."}</p>
        </div>
        <div className="mt-4 text-center">
          <button 
            onClick={onClose} 
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-600 dark:text-teal-400 hover:underline"
          >
            <Search size={16} />
            Fazer Nova Busca
          </button>
        </div>
      </div>
    );
  }

  const { line, boardingStop, disembarkingStop } = tripInfo;

  return (
    <div className="p-1 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center gap-3 mb-4">
            <Bus className="h-8 w-8 text-teal-500 flex-shrink-0" />
            <div>
                <h3 className="font-bold text-xl text-gray-900 dark:text-white">Linha {line.number}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Destino: {line.destination}</p>
            </div>
        </div>

        <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
                <Footprints className="h-5 w-5 text-indigo-500 mt-1 flex-shrink-0" />
                <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">1. Vá para o Ponto de Embarque</p>
                    <p className="text-gray-600 dark:text-gray-400 font-medium">{boardingStop.name}</p>
                </div>
            </div>

            <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">2. Previsão no Ponto</p>
                    <p className="text-gray-600 dark:text-gray-400 font-medium">
                      {boardingStop.estimatedArrivalTime 
                        ? `Chegada estimada às ${boardingStop.estimatedArrivalTime}`
                        : "Horário não disponível"}
                    </p>
                </div>
            </div>
            
            {disembarkingStop && (
              <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                      <p className="font-semibold text-gray-800 dark:text-gray-200">3. Desembarque em</p>
                      <p className="text-gray-600 dark:text-gray-400 font-medium">{disembarkingStop.name}</p>
                      {disembarkingStop.estimatedArrivalTime && (
                        <p className="text-xs text-gray-500">
                          Chegada estimada ao destino às {disembarkingStop.estimatedArrivalTime}
                        </p>
                      )}
                  </div>
              </div>
            )}
        </div>
      </div>
      
      <div className="mt-6 text-center">
          <button 
            onClick={onClose} 
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-600 dark:text-teal-400 hover:underline"
          >
              <Search size={16} />
              Fazer Nova Busca
          </button>
      </div>
    </div>
  );
}