import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon, FaTable } from 'react-icons/fa';
import './TypeVisualizer.css';

const POKEMON_TYPES = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic',
  'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

function TypeVisualizer() {
  const [attackingType, setAttackingType] = useState(null);
  const [defendingTypes, setDefendingTypes] = useState([]);
  const [lightMode, setLightMode] = useState(false);
  const [showMatrix, setShowMatrix] = useState(false);

  // Fetch type data for attacking type
  const { data: attackingTypeData } = useQuery({
    queryKey: ['type-data', attackingType],
    queryFn: async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/type/${attackingType}`);
      if (!response.ok) throw new Error('Failed to fetch type data');
      return response.json();
    },
    enabled: !!attackingType,
    staleTime: 1000 * 60 * 10,
  });

  // Fetch type data for all types (for matrix view)
  const { data: allTypesData } = useQuery({
    queryKey: ['all-types'],
    queryFn: async () => {
      const promises = POKEMON_TYPES.map(async (type) => {
        const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
        return response.json();
      });
      return Promise.all(promises);
    },
    staleTime: 1000 * 60 * 10,
  });

  // Calculate effectiveness
  const effectiveness = useMemo(() => {
    if (!attackingTypeData || defendingTypes.length === 0) return null;

    const damageRelations = attackingTypeData.damage_relations;
    let multiplier = 1;
    const breakdown = [];

    defendingTypes.forEach(defType => {
      let typeMultiplier = 1;

      // Check double damage
      if (damageRelations.double_damage_to.some(t => t.name === defType)) {
        typeMultiplier = 2;
      }
      // Check half damage
      else if (damageRelations.half_damage_to.some(t => t.name === defType)) {
        typeMultiplier = 0.5;
      }
      // Check no damage
      else if (damageRelations.no_damage_to.some(t => t.name === defType)) {
        typeMultiplier = 0;
      }

      breakdown.push({ type: defType, multiplier: typeMultiplier });
      multiplier *= typeMultiplier;
    });

    return { multiplier, breakdown };
  }, [attackingTypeData, defendingTypes]);

  // Get Pokemon with the defending types
  const { data: pokemonWithTypes } = useQuery({
    queryKey: ['pokemon-with-types', defendingTypes],
    queryFn: async () => {
      if (defendingTypes.length === 0) return [];

      // Fetch Pokemon for first type
      const response = await fetch(`https://pokeapi.co/api/v2/type/${defendingTypes[0]}`);
      const data = await response.json();

      // If two types, filter for Pokemon that have both
      if (defendingTypes.length === 2) {
        const secondTypeResponse = await fetch(`https://pokeapi.co/api/v2/type/${defendingTypes[1]}`);
        const secondTypeData = await secondTypeResponse.json();
        
        const firstTypePokemon = new Set(data.pokemon.map(p => p.pokemon.name));
        const bothTypes = secondTypeData.pokemon.filter(p => firstTypePokemon.has(p.pokemon.name));
        
        // Fetch details for up to 20 Pokemon
        const detailsPromises = bothTypes.slice(0, 20).map(async (p) => {
          const res = await fetch(p.pokemon.url);
          return res.json();
        });
        return Promise.all(detailsPromises);
      }

      // Fetch details for up to 20 Pokemon of single type
      const detailsPromises = data.pokemon.slice(0, 20).map(async (p) => {
        const res = await fetch(p.pokemon.url);
        return res.json();
      });
      return Promise.all(detailsPromises);
    },
    enabled: defendingTypes.length > 0,
    staleTime: 1000 * 60 * 5,
  });

  const handleDefendingTypeToggle = (type) => {
    if (defendingTypes.includes(type)) {
      setDefendingTypes(defendingTypes.filter(t => t !== type));
    } else if (defendingTypes.length < 2) {
      setDefendingTypes([...defendingTypes, type]);
    }
  };

  const getEffectivenessLabel = (multiplier) => {
    if (multiplier === 0) return 'No Effect';
    if (multiplier >= 4) return '4× SUPER EFFECTIVE';
    if (multiplier >= 2) return '2× Super Effective';
    if (multiplier === 1) return 'Normal Damage';
    if (multiplier >= 0.5) return '½× Not Very Effective';
    return '¼× Not Very Effective';
  };

  const getEffectivenessClass = (multiplier) => {
    if (multiplier === 0) return 'no-effect';
    if (multiplier >= 2) return 'super-effective';
    if (multiplier < 1) return 'not-very-effective';
    return '';
  };

  const getSprite = (pokemon) => {
    return (
      pokemon.sprites.other?.['official-artwork']?.front_default ||
      pokemon.sprites.other?.home?.front_default ||
      pokemon.sprites.other?.['showdown']?.front_default ||
      pokemon.sprites.front_default ||
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png'
    );
  };

  // Calculate type matchup for matrix
  const getTypeMatchup = (attackType, defendType) => {
    if (!allTypesData) return 1;
    
    const attackData = allTypesData.find(t => t.name === attackType);
    if (!attackData) return 1;

    const relations = attackData.damage_relations;
    
    if (relations.double_damage_to.some(t => t.name === defendType)) return 2;
    if (relations.half_damage_to.some(t => t.name === defendType)) return 0.5;
    if (relations.no_damage_to.some(t => t.name === defendType)) return 0;
    
    return 1;
  };

  if (showMatrix) {
    return (
      <div className={`type-visualizer-page ${lightMode ? 'light-mode' : ''}`}>
        <div className="toolbar">
          <button 
            className={`toolbar-btn ${lightMode ? 'light' : ''}`}
            onClick={() => setLightMode(!lightMode)}
            aria-label="Toggle light mode"
          >
            {lightMode ? <FaMoon /> : <FaSun />}
          </button>
          <button 
            className="toolbar-btn"
            onClick={() => setShowMatrix(false)}
            aria-label="Close matrix view"
          >
            ×
          </button>
        </div>

        <motion.header 
          className="type-viz-header"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="type-viz-title">Full Type Effectiveness Grid</h1>
          <p className="type-viz-subtitle">Complete type matchup chart</p>
        </motion.header>

        <div className="main-content">
          <motion.div 
            className="matrix-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <table className="matrix-table">
              <thead>
                <tr>
                  <th>ATK → DEF ↓</th>
                  {POKEMON_TYPES.map(type => (
                    <th key={type} className={`type-${type}`}>{type}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {POKEMON_TYPES.map(defendType => (
                  <tr key={defendType}>
                    <th className={`type-${defendType}`}>{defendType}</th>
                    {POKEMON_TYPES.map(attackType => {
                      const multiplier = getTypeMatchup(attackType, defendType);
                      let className = '';
                      if (multiplier === 2) className = 'super-effective';
                      else if (multiplier === 0.5) className = 'not-very-effective';
                      else if (multiplier === 0) className = 'no-effect';
                      
                      return (
                        <td key={attackType} className={className}>
                          {multiplier === 0.5 ? '½×' : multiplier === 0 ? '0×' : `${multiplier}×`}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className={`type-visualizer-page ${lightMode ? 'light-mode' : ''}`}>
      <div className="toolbar">
        <button 
          className={`toolbar-btn ${lightMode ? 'light' : ''}`}
          onClick={() => setLightMode(!lightMode)}
          aria-label="Toggle light mode"
        >
          {lightMode ? <FaMoon /> : <FaSun />}
        </button>
        <button 
          className="toolbar-btn"
          onClick={() => setShowMatrix(true)}
          aria-label="View type effectiveness matrix"
          title="View Full Matrix"
        >
          <FaTable />
        </button>
      </div>

      <motion.header 
        className="type-viz-header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="type-viz-title">Type Match-Up Visualizer</h1>
        <p className="type-viz-subtitle">Calculate type effectiveness and damage multipliers</p>
      </motion.header>

      <div className="main-content">
        <motion.div 
          className="selector-container"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="selector-section">
            <label className="selector-label">Attacking Type:</label>
            <div className="type-selector-grid">
              {POKEMON_TYPES.map(type => (
                <button
                  key={type}
                  className={`type-select-btn type-${type} ${attackingType === type ? 'selected' : ''}`}
                  onClick={() => setAttackingType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="selector-section">
            <label className="selector-label">Defending Type(s): {defendingTypes.length > 0 && `(${defendingTypes.length}/2)`}</label>
            <div className="defending-types-display">
              {defendingTypes.length > 0 ? (
                defendingTypes.map(type => (
                  <span key={type} className={`defending-type-chip type-${type}`}>
                    {type}
                    <button 
                      className="remove-type-btn"
                      onClick={() => handleDefendingTypeToggle(type)}
                    >
                      ×
                    </button>
                  </span>
                ))
              ) : (
                <span style={{ opacity: 0.5 }}>Select up to 2 defending types</span>
              )}
            </div>
            <div className="type-selector-grid" style={{ marginTop: '15px' }}>
              {POKEMON_TYPES.map(type => (
                <button
                  key={type}
                  className={`type-select-btn type-${type} ${
                    defendingTypes.includes(type) ? 'selected' : ''
                  } ${defendingTypes.length >= 2 && !defendingTypes.includes(type) ? 'disabled' : ''}`}
                  onClick={() => handleDefendingTypeToggle(type)}
                  disabled={defendingTypes.length >= 2 && !defendingTypes.includes(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {effectiveness && (
            <motion.div 
              className="results-container"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h2 className="result-title">Result</h2>
              
              <div className="effectiveness-display">
                <div className={`effectiveness-value ${getEffectivenessClass(effectiveness.multiplier)}`}>
                  {effectiveness.multiplier === 0 ? '0×' : effectiveness.multiplier === 0.5 ? '½×' : effectiveness.multiplier === 0.25 ? '¼×' : `${effectiveness.multiplier}×`}
                </div>
                <div className="effectiveness-label">
                  {getEffectivenessLabel(effectiveness.multiplier)}
                </div>
                <p style={{ fontSize: '16px', opacity: 0.8 }}>
                  {attackingType && `${attackingType.charAt(0).toUpperCase() + attackingType.slice(1)} against ${defendingTypes.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(' + ')}`}
                </p>
              </div>

              {effectiveness.breakdown.length > 1 && (
                <div className="damage-breakdown">
                  <h3 style={{ marginBottom: '15px' }}>Damage Breakdown:</h3>
                  {effectiveness.breakdown.map(item => (
                    <div key={item.type} className="breakdown-item">
                      <span className="breakdown-types">
                        {attackingType} vs {item.type}
                      </span>
                      <span className="breakdown-multiplier">
                        {item.multiplier === 0 ? '0×' : item.multiplier === 0.5 ? '½×' : `${item.multiplier}×`}
                      </span>
                    </div>
                  ))}
                  <div className="breakdown-item" style={{ background: 'rgba(74, 144, 226, 0.2)', marginTop: '10px' }}>
                    <span className="breakdown-types" style={{ fontWeight: 'bold' }}>Combined</span>
                    <span className="breakdown-multiplier" style={{ fontSize: '24px' }}>
                      {effectiveness.multiplier === 0 ? '0×' : effectiveness.multiplier === 0.5 ? '½×' : effectiveness.multiplier === 0.25 ? '¼×' : `${effectiveness.multiplier}×`}
                    </span>
                  </div>
                </div>
              )}

              <div className="visual-chart">
                <h3 style={{ marginBottom: '15px' }}>Visual Chart:</h3>
                {[4, 2, 1, 0.5, 0].map(mult => (
                  <div key={mult} className="chart-bar">
                    <span className="chart-label">{mult === 0.5 ? '½×' : mult === 0 ? '0×' : `${mult}×`}</span>
                    <div 
                      className="chart-bar-fill"
                      style={{ 
                        width: effectiveness.multiplier === mult ? `${mult === 0 ? 5 : mult * 25}%` : '0%',
                        minWidth: effectiveness.multiplier === mult ? '100px' : '0',
                      }}
                    >
                      {effectiveness.multiplier === mult && (mult === 0 ? '(No effect)' : '')}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {pokemonWithTypes && pokemonWithTypes.length > 0 && (
            <motion.div 
              className="results-container pokemon-with-types"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
            >
              <h2 className="result-title">Pokémon with These Types</h2>
              <div className="pokemon-types-grid">
                {pokemonWithTypes.map(pokemon => (
                  <div key={pokemon.id} className="pokemon-type-item">
                    <img 
                      src={getSprite(pokemon)} 
                      alt={pokemon.name}
                      className="pokemon-type-sprite"
                    />
                    <div className="pokemon-type-name">{pokemon.name}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!attackingType || defendingTypes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">⚔️</div>
            <div className="empty-state-text">
              Select an attacking type and at least one defending type to see effectiveness
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default TypeVisualizer;
