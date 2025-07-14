export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    front_shiny: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  abilities: Array<{
    ability: {
      name: string;
    };
  }>;
  height: number;
  weight: number;
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonType {
  id: number;
  name: string;
  pokemon: Array<{
    pokemon: {
      name: string;
      url: string;
    };
  }>;
}

export interface EvolutionChain {
  id: number;
  chain: EvolutionLink;
}

export interface EvolutionLink {
  is_baby: boolean;
  species: {
    name: string;
    url: string;
  };
  evolves_to: EvolutionLink[];
  evolution_details: Array<{
    min_level?: number;
    trigger: {
      name: string;
    };
    item?: {
      name: string;
    };
  }>;
}

export interface PokemonSpecies {
  id: number;
  name: string;
  evolution_chain: {
    url: string;
  };
}

export interface EvolutionInfo {
  name: string;
  id: number;
  sprite: string;
  trigger?: string;
  level?: number;
  item?: string;
}