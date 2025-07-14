import React from 'react';
import { Pokemon } from '../types/pokemon';
import PokemonCard from './PokemonCard';

interface PokemonGridProps {
  pokemon: Pokemon[];
  isLoading: boolean;
  onViewDetails?: (pokemon: Pokemon) => void;
}

const PokemonGrid: React.FC<PokemonGridProps> = ({ pokemon, isLoading, onViewDetails }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gray-200 animate-pulse h-48" />
            <div className="p-6">
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-4" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {pokemon.map((poke) => (
        <PokemonCard key={poke.id} pokemon={poke} onViewDetails={onViewDetails} />
      ))}
    </div>
  );
};

export default PokemonGrid;