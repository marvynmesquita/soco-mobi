// src/app/components/LineResults.tsx
'use client';

import { Bus, LoaderCircle } from 'lucide-react';

type BusLine = {
  id_linha: string;
  nome_linha: string;
  number?: string; // Adicionado para passar o número da linha
};

interface LineResultsProps {
  loading: boolean;
  lines: BusLine[];
  onLineSelect: (line: BusLine) => void;
}

export default function LineResults({ loading, lines, onLineSelect }: LineResultsProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center text-gray-500 dark:text-gray-400 py-4">
        <LoaderCircle className="animate-spin h-5 w-5 mr-3" />
        Buscando linhas...
      </div>
    );
  }

  if (lines.length > 0) {
    return (
      <div>
        <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Linhas que atendem este local:</h3>
        <ul className="space-y-2">
          {lines.map((line) => (
            <li key={line.id_linha}>
              <button 
                onClick={() => onLineSelect(line)}
                className="w-full flex items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-md text-left hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <Bus className="h-5 w-5 mr-3 text-teal-600 dark:text-teal-400 flex-shrink-0" />
                <span className="font-medium text-gray-800 dark:text-gray-200">{line.nome_linha}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="text-center text-gray-500 dark:text-gray-400 py-4">
      Nenhuma linha de ônibus encontrada para este destino.
    </div>
  );
}