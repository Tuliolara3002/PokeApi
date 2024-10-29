// src/components/PokemonCard.jsx
import React from 'react';
import translation from '../services/translation';

const PokemonCard = ({ pokemon, onClick }) => {
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  return (
    <div className="pokemon-card" onClick={() => onClick(pokemon)}>
      <h2>{pokemon.name}</h2>
      <img src={imageUrl} alt={pokemon.name} />
      <p>Tipos:</p>
      <ul>
        {pokemon.types.map((typeInfo, index) => (
          <li key={index}>
            {translation.types[typeInfo.type.name] || typeInfo.type.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonCard;
