import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { FaTimes } from 'react-icons/fa';
import './PokemonModal.css';

function PokemonModal({ pokemon, onClose, darkMode }) {
  // Get best available sprite with fallback chain
  const getSprite = () => {
    return (
      pokemon.sprites.other?.['official-artwork']?.front_default ||
      pokemon.sprites.other?.home?.front_default ||
      pokemon.sprites.other?.['showdown']?.front_default ||
      pokemon.sprites.front_default ||
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png'
    );
  };

  // Fetch evolution chain
  const { data: evolutionData } = useQuery({
    queryKey: ['evolution', pokemon.id],
    queryFn: async () => {
      // First get species data
      const speciesRes = await fetch(pokemon.species.url);
      const speciesData = await speciesRes.json();
      
      // Then get evolution chain
      const evolutionRes = await fetch(speciesData.evolution_chain.url);
      const evolutionChain = await evolutionRes.json();
      
      return evolutionChain;
    },
    enabled: !!pokemon,
  });

  const parseEvolutionChain = (chain) => {
    const evolutions = [];
    let current = chain;
    
    while (current) {
      evolutions.push({
        name: current.species.name,
        url: current.species.url,
      });
      current = current.evolves_to[0];
    }
    
    return evolutions;
  };

  const evolutions = evolutionData ? parseEvolutionChain(evolutionData.chain) : [];

  const maxStat = Math.max(...pokemon.stats.map(s => s.base_stat));

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={`pokemon-modal ${darkMode ? 'dark-mode' : ''}`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="modal-header">
          <div className="modal-pokemon-id">#{String(pokemon.id).padStart(3, '0')}</div>
          <h2 className="modal-pokemon-name">{pokemon.name}</h2>
          <img
            src={getSprite()}
            alt={pokemon.name}
            className="modal-pokemon-image"
          />
          <div className="modal-types">
            {pokemon.types.map((typeInfo) => (
              <span
                key={typeInfo.type.name}
                className={`modal-type-badge type-${typeInfo.type.name}`}
              >
                {typeInfo.type.name}
              </span>
            ))}
          </div>
        </div>

        <div className="modal-content">
          {/* Physical Info */}
          <div className="modal-section">
            <h3 className="section-title">Physical Attributes</h3>
            <div className="info-grid">
              <div className="info-item">
                <div className="info-label">Height</div>
                <div className="info-value">{(pokemon.height / 10).toFixed(1)} m</div>
              </div>
              <div className="info-item">
                <div className="info-label">Weight</div>
                <div className="info-value">{(pokemon.weight / 10).toFixed(1)} kg</div>
              </div>
              <div className="info-item">
                <div className="info-label">Base Experience</div>
                <div className="info-value">{pokemon.base_experience}</div>
              </div>
            </div>
          </div>

          {/* Base Stats */}
          <div className="modal-section">
            <h3 className="section-title">Base Stats</h3>
            <div className="stats-grid">
              {pokemon.stats.map((stat) => (
                <motion.div
                  key={stat.stat.name}
                  className="stat-row"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <span className="stat-name">{stat.stat.name.replace('-', ' ')}</span>
                  <div className="stat-bar-container">
                    <motion.div
                      className="stat-bar"
                      initial={{ width: 0 }}
                      animate={{ width: `${(stat.base_stat / maxStat) * 100}%` }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {stat.base_stat}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Abilities */}
          <div className="modal-section">
            <h3 className="section-title">Abilities</h3>
            <div className="abilities-list">
              {pokemon.abilities.map((ability) => (
                <span
                  key={ability.ability.name}
                  className={`ability-badge ${ability.is_hidden ? 'hidden' : ''}`}
                >
                  {ability.ability.name.replace('-', ' ')}
                  {ability.is_hidden && ' (Hidden)'}
                </span>
              ))}
            </div>
          </div>

          {/* Evolution Chain */}
          {evolutions.length > 0 && (
            <div className="modal-section">
              <h3 className="section-title">Evolution Chain</h3>
              <div className="evolution-chain">
                {evolutions.map((evo, index) => (
                  <React.Fragment key={evo.name}>
                    <div className="evolution-item">
                      <div className="evolution-image">
                        <img
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                            evo.url.split('/')[6]
                          }.png`}
                          alt={evo.name}
                          style={{ width: '100%', height: '100%' }}
                        />
                      </div>
                      <div className="evolution-name">{evo.name}</div>
                    </div>
                    {index < evolutions.length - 1 && (
                      <div className="evolution-arrow">→</div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default PokemonModal;
