import React, { useState, useEffect } from 'react';
import { Pokemon } from '../types/pokemon';
import { EvolutionInfo } from '../types/pokemon';
import { pokemonApi } from '../services/pokemonApi';
import { getTypeColor, getTypeGradient } from '../utils/colors';
import { ArrowRight, Zap, Star, MousePointer } from 'lucide-react';

interface InteractivePokemonCardProps {
  pokemon: Pokemon;
  onDataClick: (path: string, description: string) => void;
}

const InteractivePokemonCard: React.FC<InteractivePokemonCardProps> = ({ pokemon, onDataClick }) => {
  const [evolutions, setEvolutions] = useState<EvolutionInfo[]>([]);
  const [isLoadingEvolutions, setIsLoadingEvolutions] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  
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

  const handleElementClick = (path: string, description: string) => {
    onDataClick(path, description);
  };

  const InteractiveElement: React.FC<{
    children: React.ReactNode;
    path: string;
    description: string;
    className?: string;
  }> = ({ children, path, description, className = "" }) => (
    <div
      className={`${className} cursor-pointer transition-all duration-200 hover:bg-blue-100/50 hover:ring-2 hover:ring-blue-300 rounded-md relative group`}
      onClick={() => handleElementClick(path, description)}
      onMouseEnter={() => setHoveredElement(path)}
      onMouseLeave={() => setHoveredElement(null)}
    >
      {children}
      {hoveredElement === path && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
          <MousePointer className="w-3 h-3 inline mr-1" />
          Click to view in JSON
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-blue-50 p-3 border-b border-blue-200">
        <div className="flex items-center gap-2 text-blue-700">
          <MousePointer className="w-4 h-4" />
          <span className="text-sm font-medium">Click any element to see its JSON data</span>
        </div>
      </div>

      <div className={`bg-gradient-to-br ${getTypeGradient(primaryType)} p-6 text-white relative`}>
        <InteractiveElement
          path="id"
          description="Pokemon ID number"
          className="absolute top-2 right-2 px-2 py-1"
        >
          <div className="text-white/70 font-bold text-lg">
            #{pokemon.id.toString().padStart(3, '0')}
          </div>
        </InteractiveElement>

        <InteractiveElement
          path="name"
          description="Pokemon name"
          className="mb-2 inline-block px-2 py-1"
        >
          <h3 className="text-2xl font-bold capitalize">{pokemon.name}</h3>
        </InteractiveElement>

        <div className="flex gap-2 mb-4">
          {pokemon.types.map((type, index) => (
            <InteractiveElement
              key={type.type.name}
              path={`types[${index}].type.name`}
              description={`Pokemon type: ${type.type.name}`}
              className="px-3 py-1 rounded-full"
            >
              <span className={`text-sm font-medium ${getTypeColor(type.type.name)} bg-opacity-80`}>
                {type.type.name}
              </span>
            </InteractiveElement>
          ))}
        </div>

        <InteractiveElement
          path="sprites.other.official-artwork.front_default"
          description="Pokemon artwork image URL"
          className="flex justify-center p-2"
        >
          <img
            src={imageUrl}
            alt={pokemon.name}
            className="w-32 h-32 object-contain filter drop-shadow-lg"
          />
        </InteractiveElement>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <InteractiveElement
            path="height"
            description="Pokemon height in decimeters"
            className="text-center p-2"
          >
            <div className="text-2xl font-bold text-gray-800">{pokemon.height / 10}m</div>
            <div className="text-sm text-gray-600">Height</div>
          </InteractiveElement>
          
          <InteractiveElement
            path="weight"
            description="Pokemon weight in hectograms"
            className="text-center p-2"
          >
            <div className="text-2xl font-bold text-gray-800">{pokemon.weight / 10}kg</div>
            <div className="text-sm text-gray-600">Weight</div>
          </InteractiveElement>
        </div>

        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2 text-gray-800">Stats</h4>
          <div className="space-y-2">
            {pokemon.stats.map((stat, index) => (
              <div key={stat.stat.name} className="flex items-center justify-between">
                <InteractiveElement
                  path={`stats[${index}].stat.name`}
                  description={`Stat name: ${stat.stat.name}`}
                  className="px-2 py-1"
                >
                  <span className="text-sm text-gray-600 capitalize font-medium">
                    {formatStatName(stat.stat.name)}
                  </span>
                </InteractiveElement>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className={`bg-gradient-to-r ${getTypeGradient(primaryType)} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${Math.min((stat.base_stat / 150) * 100, 100)}%` }}
                    />
                  </div>
                  <InteractiveElement
                    path={`stats[${index}].base_stat`}
                    description={`Base stat value for ${stat.stat.name}`}
                    className="px-1"
                  >
                    <span className="text-sm font-bold text-gray-800 w-8">
                      {stat.base_stat}
                    </span>
                  </InteractiveElement>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2 text-gray-800">Abilities</h4>
          <div className="flex flex-wrap gap-2">
            {pokemon.abilities.map((ability, index) => (
              <InteractiveElement
                key={ability.ability.name}
                path={`abilities[${index}].ability.name`}
                description={`Pokemon ability: ${ability.ability.name}`}
                className="px-3 py-1 rounded-full"
              >
                <span className="bg-gray-100 text-sm font-medium text-gray-700 capitalize">
                  {ability.ability.name.replace('-', ' ')}
                </span>
              </InteractiveElement>
            ))}
          </div>
        </div>

        {evolutions.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="text-lg font-semibold mb-3 text-gray-800">Evolves Into</h4>
            <div className="space-y-3">
              {evolutions.map((evolution, index) => (
                <div key={evolution.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <InteractiveElement
                    path={`evolution_chain.chain.evolves_to[${index}].species.name`}
                    description="Evolution species name from evolution chain API"
                    className="p-1"
                  >
                    <img
                      src={evolution.sprite}
                      alt={evolution.name}
                      className="w-12 h-12 object-contain"
                    />
                  </InteractiveElement>
                  <div className="flex-1">
                    <InteractiveElement
                      path={`evolution_chain.chain.evolves_to[${index}].species.name`}
                      description="Evolution name from species data"
                      className="px-2 py-1 inline-block"
                    >
                      <div className="font-semibold text-gray-800 capitalize">
                        {evolution.name}
                      </div>
                    </InteractiveElement>
                    <InteractiveElement
                      path={`evolution_chain.chain.evolves_to[${index}].evolution_details[0]`}
                      description="Evolution requirements and trigger method"
                      className="px-2 py-1 inline-block"
                    >
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        {getEvolutionTriggerIcon(evolution.trigger)}
                        <span className="capitalize">
                          {formatEvolutionMethod(evolution)}
                        </span>
                      </div>
                    </InteractiveElement>
                  </div>
                  <InteractiveElement
                    path={`evolution_chain.chain.evolves_to[${index}].species.url`}
                    description="Evolution Pokemon ID extracted from species URL"
                    className="px-2 py-1"
                  >
                    <div className="text-xs text-gray-500">
                      #{evolution.id.toString().padStart(3, '0')}
                    </div>
                  </InteractiveElement>
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

export default InteractivePokemonCard;