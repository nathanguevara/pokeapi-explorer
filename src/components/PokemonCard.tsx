import React, { useState, useEffect } from 'react';
import { Pokemon } from '../types/pokemon';
import { EvolutionInfo } from '../types/pokemon';
import { pokemonApi } from '../services/pokemonApi';
import { getTypeColor, getTypeGradient } from '../utils/colors';
import { ArrowRight, Zap, Star, Eye } from 'lucide-react';

interface PokemonCardProps {
  pokemon: Pokemon;
  onViewDetails?: (pokemon: Pokemon) => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onViewDetails }) => {
  const [evolutions, setEvolutions] = useState<EvolutionInfo[]>([]);
  const [isLoadingEvolutions, setIsLoadingEvolutions] = useState(false);
  
  const primaryType = pokemon.types[0]?.type.name || 'normal';
  const imageUrl = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;

  useEffect(() => {
    loadEvolutions();
  }, [pokemon.id]);

  const loadEvolutions = async () => {
    setIsLoadingEvolutions(true);
    try {
      const evolutionData = await pokemonApi.getPokemonEvolutions(pokemon.id);
      setEvolutions(evolutionData);
    } catch (error) {
      console.warn('Failed to load evolution data');
    } finally {
      setIsLoadingEvolutions(false);
    }
  };

  const formatStatName = (statName: string): string => {
    return statName.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getEvolutionTriggerIcon = (trigger?: string) => {
    switch (trigger) {
      case 'level-up':
        return <Star className="w-3 h-3" />;
      case 'use-item':
        return <Zap className="w-3 h-3" />;
      default:
        return <ArrowRight className="w-3 h-3" />;
    }
  };

  const formatEvolutionMethod = (evolution: EvolutionInfo): string => {
    if (evolution.level) {
      return `Level ${evolution.level}`;
    }
    if (evolution.item) {
      return evolution.item.replace('-', ' ');
    }
    if (evolution.trigger) {
      return evolution.trigger.replace('-', ' ');
    }
    return 'Evolution';
  };

  return (
    <div 
      className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden relative group ${
        onViewDetails ? 'cursor-pointer hover:ring-2 hover:ring-blue-300' : ''
      }`}
      onClick={onViewDetails ? () => onViewDetails(pokemon) : undefined}
      title={onViewDetails ? "Click to view API data" : undefined}
    >
      <div className={`bg-gradient-to-br ${getTypeGradient(primaryType)} p-6 text-white relative`}>
        <div className="absolute top-2 right-12 text-white/70 font-bold text-lg">
          #{pokemon.id.toString().padStart(3, '0')}
        </div>
        <h3 className="text-2xl font-bold mb-2 capitalize">{pokemon.name}</h3>
        <div className="flex gap-2 mb-4">
          {pokemon.types.map((type) => (
            <span
              key={type.type.name}
              className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(type.type.name)} bg-opacity-80`}
            >
              {type.type.name}
            </span>
          ))}
        </div>
        <div className="flex justify-center">
          <img
            src={imageUrl}
            alt={pokemon.name}
            className="w-32 h-32 object-contain filter drop-shadow-lg"
          />
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">{pokemon.height / 10}m</div>
            <div className="text-sm text-gray-600">Height</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">{pokemon.weight / 10}kg</div>
            <div className="text-sm text-gray-600">Weight</div>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2 text-gray-800">Stats</h4>
          <div className="space-y-2">
            {pokemon.stats.map((stat) => (
              <div key={stat.stat.name} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 capitalize font-medium">
                  {formatStatName(stat.stat.name)}
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className={`bg-gradient-to-r ${getTypeGradient(primaryType)} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${Math.min((stat.base_stat / 150) * 100, 100)}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-gray-800 w-8">
                    {stat.base_stat}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2 text-gray-800">Abilities</h4>
          <div className="flex flex-wrap gap-2">
            {pokemon.abilities.map((ability) => (
              <span
                key={ability.ability.name}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700 capitalize"
              >
                {ability.ability.name.replace('-', ' ')}
              </span>
            ))}
          </div>
        </div>

        {evolutions.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="text-lg font-semibold mb-3 text-gray-800">Evolves Into</h4>
            <div className="space-y-3">
              {evolutions.map((evolution) => (
                <div key={evolution.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <img
                    src={evolution.sprite}
                    alt={evolution.name}
                    className="w-12 h-12 object-contain"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800 capitalize">
                      {evolution.name}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      {getEvolutionTriggerIcon(evolution.trigger)}
                      <span className="capitalize">
                        {formatEvolutionMethod(evolution)}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    #{evolution.id.toString().padStart(3, '0')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {isLoadingEvolutions && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-center py-4">
              <div className="w-4 h-4 border-2 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
              <span className="ml-2 text-sm text-gray-600">Loading evolutions...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonCard;