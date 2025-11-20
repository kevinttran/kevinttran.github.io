import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import PokemonCard from '../components/PokemonCard';
import PokemonModal from '../components/PokemonModal';
import './Pokedex.css';

const POKEMON_TYPES = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic',
  'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

function Pokedex() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [limit, setLimit] = useState(50);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const observerTarget = useRef(null);

  // Fetch Pokemon list
  const { data: pokemonList, isLoading, error } = useQuery({
    queryKey: ['pokemon', limit],
    queryFn: async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
      if (!response.ok) throw new Error('Failed to fetch Pokemon');
      const data = await response.json();
      
      // Fetch details for each Pokemon
      const detailsPromises = data.results.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        return res.json();
      });
      
      return Promise.all(detailsPromises);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: selectedType === 'all', // Only fetch when showing all types
  });

  // Fetch Pokemon by type
  const { data: typePokemonList, isLoading: isLoadingType } = useQuery({
    queryKey: ['pokemon-type', selectedType],
    queryFn: async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/type/${selectedType}`);
      if (!response.ok) throw new Error('Failed to fetch Pokemon by type');
      const data = await response.json();
      
      // Fetch details for each Pokemon in this type
      const detailsPromises = data.pokemon.map(async (p) => {
        const res = await fetch(p.pokemon.url);
        return res.json();
      });
      
      return Promise.all(detailsPromises);
    },
    staleTime: 1000 * 60 * 5,
    enabled: selectedType !== 'all', // Only fetch when a type is selected
  });

  // Fetch Pokemon by ID when searching by number
  const { data: searchedPokemon, isLoading: isSearching } = useQuery({
    queryKey: ['pokemon-search', searchTerm],
    queryFn: async () => {
      const trimmed = searchTerm.trim();
      // Check if search term is a number
      if (/^\d+$/.test(trimmed)) {
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${trimmed}`);
          if (!response.ok) return null;
          return [await response.json()];
        } catch {
          return null;
        }
      }
      return null;
    },
    enabled: searchTerm.trim().length > 0 && /^\d+$/.test(searchTerm.trim()),
    staleTime: 1000 * 60 * 5,
  });

  // Filter Pokemon based on search and type
  const filteredPokemon = useMemo(() => {
    // If searching by ID and we got a result from API
    if (searchedPokemon) {
      return searchedPokemon;
    }

    // If a type is selected, use type-specific list
    if (selectedType !== 'all' && typePokemonList) {
      if (searchTerm === '') {
        return typePokemonList;
      }
      // Filter type results by search term
      return typePokemonList.filter(pokemon => 
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pokemon.id.toString().includes(searchTerm)
      );
    }

    // Otherwise use the main list
    if (!pokemonList) return [];
    
    return pokemonList.filter(pokemon => {
      const matchesSearch = searchTerm === '' || 
                           pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           pokemon.id.toString().includes(searchTerm);
      
      return matchesSearch;
    });
  }, [pokemonList, searchTerm, selectedType, searchedPokemon, typePokemonList]);

  // Infinite scroll observer
  const handleLoadMore = useCallback(() => {
    if (!isLoading && limit < 1000 && !searchTerm && selectedType === 'all') {
      setLimit(prev => prev + 50);
    }
  }, [isLoading, limit, searchTerm, selectedType]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          handleLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [handleLoadMore]);

  if (error) {
    return (
      <div className={`pokedex-page ${darkMode ? 'dark-mode' : ''}`}>
        <div className="error-state">
          <h2>Error loading Pokémon data</h2>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  const isLoadingData = (selectedType === 'all' ? isLoading : isLoadingType) && limit === 50;

  return (
    <div className={`pokedex-page ${darkMode ? 'dark-mode' : ''}`}>
      <button 
        className="theme-toggle-btn"
        onClick={() => setDarkMode(!darkMode)}
        aria-label="Toggle dark mode"
      >
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>

      <motion.header 
        className="pokedex-header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="pokedex-title">Pokédex Explorer</h1>
        <p className="pokedex-subtitle">Discover and explore all Pokémon</p>
      </motion.header>

      <motion.div 
        className="pokedex-controls"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <input
          type="text"
          className="search-box"
          placeholder="Search Pokémon by name or number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="type-filters">
          <button
            className={`type-filter-btn ${selectedType === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedType('all')}
          >
            All Types
          </button>
          {POKEMON_TYPES.map(type => (
            <button
              key={type}
              className={`type-filter-btn ${selectedType === type ? 'active' : ''}`}
              onClick={() => setSelectedType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </motion.div>

      {isLoadingData ? (
        <div className="loading-state">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            🔴
          </motion.div>
          <p>Loading Pokémon...</p>
        </div>
      ) : (
        <>
          <motion.div 
            className="pokemon-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <AnimatePresence>
              {filteredPokemon.map((pokemon, index) => (
                <PokemonCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  index={index}
                  onClick={() => setSelectedPokemon(pokemon)}
                  darkMode={darkMode}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredPokemon.length === 0 && !isSearching && (
            <div className="loading-state">
              <p>No Pokémon found matching your search criteria.</p>
            </div>
          )}

          {isSearching && (
            <div className="loading-state">
              <p>Searching for Pokémon...</p>
            </div>
          )}

          {/* Infinite scroll trigger */}
          {!searchTerm && selectedType === 'all' && limit < 1000 && (
            <div ref={observerTarget} className="scroll-trigger">
              {isLoading && (
                <div className="loading-state">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    🔴
                  </motion.div>
                  <p>Loading more Pokémon...</p>
                </div>
              )}
            </div>
          )}
        </>
      )}

      <AnimatePresence>
        {selectedPokemon && (
          <PokemonModal
            pokemon={selectedPokemon}
            onClose={() => setSelectedPokemon(null)}
            darkMode={darkMode}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Pokedex;
