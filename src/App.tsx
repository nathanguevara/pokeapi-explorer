import React, { useState, useEffect } from 'react';
import { Pokemon, PokemonListItem } from './types/pokemon';
import { pokemonApi } from './services/pokemonApi';
import SearchBar from './components/SearchBar';
import PokemonGrid from './components/PokemonGrid';
import Pagination from './components/Pagination';
import LoadingSpinner from './components/LoadingSpinner';
import TypeFilter from './components/TypeFilter';
import PokemonDetailModal from './components/PokemonDetailModal';
import EducationModal from './components/EducationModal';

const ITEMS_PER_PAGE = 12;

function App() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);

  // Load initial Pokemon list
  useEffect(() => {
    loadPokemonList();
  }, []);

  // Load Pokemon data when page changes
  useEffect(() => {
    if (pokemonList.length > 0 && !searchQuery && !selectedType) {
      loadPokemonForCurrentPage();
    }
  }, [currentPage, pokemonList, selectedType]);

  // Handle search
  useEffect(() => {
    if (searchQuery) {
      handleSearch();
    } else {
      setFilteredPokemon(pokemon);
    }
  }, [searchQuery, pokemon]);

  // Handle type filtering
  useEffect(() => {
    if (selectedType) {
      loadPokemonByType();
    } else if (!searchQuery) {
      setFilteredPokemon(pokemon);
    }
  }, [selectedType, pokemon]);

  const loadPokemonList = async () => {
    try {
      setIsInitialLoading(true);
      const response = await pokemonApi.getPokemonList(1000, 0);
      setPokemonList(response.results);
      setTotalCount(response.count);
    } catch (err) {
      setError('Failed to load Pokemon list');
    } finally {
      setIsInitialLoading(false);
    }
  };

  const loadPokemonForCurrentPage = async () => {
    try {
      setIsLoading(true);
      const start = (currentPage - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;
      const currentPagePokemon = pokemonList.slice(start, end);
      
      const pokemonPromises = currentPagePokemon.map(async (item) => {
        const id = item.url.split('/').slice(-2, -1)[0];
        return pokemonApi.getPokemon(id);
      });

      const pokemonData = await Promise.all(pokemonPromises);
      setPokemon(pokemonData);
      setError(null);
    } catch (err) {
      setError('Failed to load Pokemon');
    } finally {
      setIsLoading(false);
    }
  };

  const loadPokemonByType = async () => {
    if (!selectedType) return;
    
    try {
      setIsLoading(true);
      const typePokemon = await pokemonApi.getPokemonByType(selectedType);
      setFilteredPokemon(typePokemon);
      setError(null);
    } catch (err) {
      setError(`Failed to load ${selectedType} type Pokémon`);
      setFilteredPokemon([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      const sortedPokemon = sortPokemon(pokemon);
      setFilteredPokemon(sortedPokemon);
      return;
    }

    try {
      setIsLoading(true);
      const searchResults = await pokemonApi.searchPokemon(searchQuery);
      setFilteredPokemon(searchResults);
    } catch {
      setFilteredPokemon([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (value) {
      setCurrentPage(1);
      setSelectedType(null); // Clear type filter when searching
    }
  };

  const handleSearchClear = () => {
    setSearchQuery('');
    setFilteredPokemon(pokemon);
  };

  const handleTypeSelect = (type: string | null) => {
    setSelectedType(type);
    setSearchQuery(''); // Clear search when filtering by type
    setCurrentPage(1);
  };

  const handleViewDetails = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailModalOpen(false);
    setSelectedPokemon(null);
  };

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  const showPagination = !searchQuery && !selectedType && !isLoading;

  if (isInitialLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="large" />
          <p className="mt-4 text-white text-lg font-semibold">Loading Pokémon...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            PokéAPI Explorer
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Learn APIs visually through interactive Pokémon data exploration
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <button
              onClick={() => setIsEducationModalOpen(true)}
              className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 backdrop-blur-sm border border-white/20"
            >
              📚 Learn About APIs
            </button>
          </div>
          <SearchBar
            value={searchQuery}
            onChange={handleSearchChange}
            onClear={handleSearchClear}
            placeholder="Search Pokémon by name..."
          />
        </header>

        <div className="mb-8">
          <TypeFilter
            selectedType={selectedType}
            onTypeSelect={handleTypeSelect}
          />
        </div>

        {error && (
          <div className="bg-red-500/80 backdrop-blur-sm text-white p-4 rounded-lg mb-8 text-center">
            {error}
          </div>
        )}

        <main>
          <PokemonGrid 
            pokemon={filteredPokemon} 
            isLoading={isLoading} 
            onViewDetails={handleViewDetails}
          />
          
          {showPagination && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              isLoading={isLoading}
            />
          )}
        </main>

        <footer className="text-center mt-12 text-white/70">
          <p>Built with React & TypeScript • Data from PokéAPI</p>
        </footer>

        {selectedPokemon && (
          <PokemonDetailModal
            pokemon={selectedPokemon}
            isOpen={isDetailModalOpen}
            onClose={handleCloseDetails}
          />
        )}

        <EducationModal
          isOpen={isEducationModalOpen}
          onClose={() => setIsEducationModalOpen(false)}
        />
      </div>
    </div>
  );
}

export default App;