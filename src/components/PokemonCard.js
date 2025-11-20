import React from 'react';
import { motion } from 'framer-motion';

function PokemonCard({ pokemon, index, onClick, darkMode }) {
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

  return (
    <motion.div
      className="pokemon-card"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ delay: index * 0.02 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      layout
    >
      <div className="pokemon-id">#{String(pokemon.id).padStart(3, '0')}</div>
      <img
        src={getSprite()}
        alt={pokemon.name}
        className="pokemon-image"
        loading="lazy"
      />
      <h3 className="pokemon-name">{pokemon.name}</h3>
      <div className="pokemon-types">
        {pokemon.types.map((typeInfo) => (
          <span
            key={typeInfo.type.name}
            className={`type-badge type-${typeInfo.type.name}`}
          >
            {typeInfo.type.name}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default PokemonCard;
