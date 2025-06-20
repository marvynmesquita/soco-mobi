'use client';

import { Bus, LoaderCircle } from 'lucide-react';

type BusLine = {
  id_linha: number;
  nome_linha: string;
};

interface LineResultsProps {
  loading: boolean;
  lines: BusLine[];
}

export default function LineResults({ loading, lines }: LineResultsProps) {
  return (
    // Removido o card de fundo para integrar com o painel principal
    <div className="mt-4">
      {loading && (
        <div className="flex items-center justify-center text-gray-500 dark:text-gray-400 py-4">
          <LoaderCircle className="animate-spin h-5 w-5 mr-3" />
          Buscando linhas...
        </div>
      )}

      {!loading && lines.length > 0 && (
        <div>
          <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Linhas que atendem este local:</h3>
          <ul className="space-y-2">
            {lines.map((line) => (
              <li key={line.id_linha} className="flex items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                <Bus className="h-5 w-5 mr-3 text-teal-600 dark:text-teal-400" />
                <span className="font-medium text-gray-800 dark:text-gray-200">{line.nome_linha}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!loading && lines.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400 py-4">
          Nenhuma linha de ônibus encontrada para este destino.
        </div>
      )}
    </div>
  );
}