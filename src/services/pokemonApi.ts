import { Pokemon, PokemonListResponse, PokemonType, EvolutionChain, PokemonSpecies, EvolutionInfo, EvolutionLink } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const pokemonApi = {
  async getPokemonList(limit: number = 20, offset: number = 0): Promise<PokemonListResponse> {
    const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
    if (!response.ok) {
      throw new Error('Failed to fetch Pokemon list');
    }
    return response.json();
  },

  async getPokemon(nameOrId: string | number): Promise<Pokemon> {
    const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch Pokemon');
    }
    return response.json();
  },

  async searchPokemon(query: string): Promise<Pokemon[]> {
    // For demo purposes, we'll search by exact name match
    // In a real app, you might want to implement a more sophisticated search
    try {
      const pokemon = await this.getPokemon(query.toLowerCase());
      return [pokemon];
    } catch {
      return [];
    }
  },

  async getAllTypes(): Promise<PokemonType[]> {
    const response = await fetch(`${BASE_URL}/type`);
    if (!response.ok) {
      throw new Error('Failed to fetch Pokemon types');
    }
    const data = await response.json();
    
    // Filter out unknown and shadow types for better UX
    const validTypes = data.results.filter((type: any) => 
      !['unknown', 'shadow'].includes(type.name)
    );
    
    return validTypes;
  },

  async getPokemonByType(typeName: string): Promise<Pokemon[]> {
    const response = await fetch(`${BASE_URL}/type/${typeName}`);
    if (!response.ok) {
      throw new Error('Failed to fetch Pokemon by type');
    }
    const data = await response.json();
    
    // Get first 50 Pokemon of this type to avoid overwhelming the UI
    const pokemonUrls = data.pokemon.slice(0, 50);
    
    const pokemonPromises = pokemonUrls.map(async (item: any) => {
      const id = item.pokemon.url.split('/').slice(-2, -1)[0];
      return this.getPokemon(id);
    });

    return Promise.all(pokemonPromises);
  },

  async getPokemonSpecies(nameOrId: string | number): Promise<PokemonSpecies> {
    const response = await fetch(`${BASE_URL}/pokemon-species/${nameOrId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch Pokemon species');
    }
    return response.json();
  },

  async getEvolutionChain(url: string): Promise<EvolutionChain> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch evolution chain');
    }
    return response.json();
  },

  async getPokemonEvolutions(nameOrId: string | number): Promise<EvolutionInfo[]> {
    try {
      const species = await this.getPokemonSpecies(nameOrId);
      const evolutionChain = await this.getEvolutionChain(species.evolution_chain.url);
      
      const evolutions: EvolutionInfo[] = [];
      
      const processEvolutionChain = async (chain: EvolutionLink, currentPokemon: string) => {
        for (const evolution of chain.evolves_to) {
          if (chain.species.name === currentPokemon) {
            try {
              const evolutionPokemon = await this.getPokemon(evolution.species.name);
              const evolutionDetail = evolution.evolution_details[0];
              
              evolutions.push({
                name: evolution.species.name,
                id: evolutionPokemon.id,
                sprite: evolutionPokemon.sprites.other['official-artwork'].front_default || evolutionPokemon.sprites.front_default,
                trigger: evolutionDetail?.trigger.name,
                level: evolutionDetail?.min_level,
                item: evolutionDetail?.item?.name
              });
            } catch (error) {
              console.warn(`Failed to fetch evolution data for ${evolution.species.name}`);
            }
          }
          
          // Recursively process further evolutions
          await processEvolutionChain(evolution, currentPokemon);
        }
      };
      
      await processEvolutionChain(evolutionChain.chain, species.name);
      return evolutions;
    } catch (error) {
      console.warn(`Failed to fetch evolution chain for ${nameOrId}`);
      return [];
    }
  }
};