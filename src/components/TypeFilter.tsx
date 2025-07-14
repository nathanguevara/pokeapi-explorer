import React from 'react';
import { getTypeColor, getTypeGradient } from '../utils/colors';

interface TypeFilterProps {
  selectedType: string | null;
  onTypeSelect: (type: string | null) => void;
}

const POKEMON_TYPES = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
  'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

const TypeFilter: React.FC<TypeFilterProps> = ({ selectedType, onTypeSelect }) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-white mb-4 text-center">
        Filter by Type
      </h3>
      <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
        <button
          onClick={() => onTypeSelect(null)}
          className={`px-4 py-2 rounded-full font-medium transition-all duration-200 transform hover:scale-105 ${
            selectedType === null
              ? 'bg-white text-gray-800 shadow-lg'
              : 'bg-white/20 text-white hover:bg-white/30'
          }`}
        >
          All Types
        </button>
        {POKEMON_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => onTypeSelect(type)}
            className={`px-4 py-2 rounded-full font-medium capitalize transition-all duration-200 transform hover:scale-105 ${
              selectedType === type
                ? `bg-gradient-to-r ${getTypeGradient(type)} text-white shadow-lg ring-2 ring-white/50`
                : `${getTypeColor(type)} text-white hover:shadow-md bg-opacity-80 hover:bg-opacity-100`
            }`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TypeFilter;