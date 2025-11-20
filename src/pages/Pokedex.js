import React, { useState, useMemo } from 'react';
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
  });

  // Filter Pokemon based on search and type
  const filteredPokemon = useMemo(() => {
    if (!pokemonList) return [];
    
    return pokemonList.filter(pokemon => {
      const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           pokemon.id.toString().includes(searchTerm);
      
      const matchesType = selectedType === 'all' || 
                         pokemon.types.some(t => t.type.name === selectedType);
      
      return matchesSearch && matchesType;
    });
  }, [pokemonList, searchTerm, selectedType]);

  const handleLoadMore = () => {
    setLimit(prev => prev + 50);
  };

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

      {isLoading ? (
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

          {filteredPokemon.length === 0 && (
            <div className="loading-state">
              <p>No Pokémon found matching your search criteria.</p>
            </div>
          )}

          {!searchTerm && selectedType === 'all' && limit < 1000 && (
            <button
              className="load-more-btn"
              onClick={handleLoadMore}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Load More Pokémon'}
            </button>
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
