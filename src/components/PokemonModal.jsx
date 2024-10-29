// src/components/PokemonModal.jsx
import React, { useEffect, useState } from 'react';
import { getPokemonSpecies } from '../services/pokemonService';

const PokemonModal = ({ pokemon, onClose }) => {
  const [speciesData, setSpeciesData] = useState(null);

  useEffect(() => {
    const fetchSpeciesData = async () => {
      const data = await getPokemonSpecies(pokemon.id);
      setSpeciesData(data);
    };

    fetchSpeciesData();
  }, [pokemon]);

  if (!pokemon) return null;

  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>{pokemon.name}</h2>
        <img src={imageUrl} alt={pokemon.name} />
        <p>Datos: {speciesData ? speciesData.flavor_text_entries.find(entry => entry.language.name === 'es').flavor_text : 'Información no disponible'}</p>
        <p>Involuciones: {speciesData ? speciesData.evolves_from_species?.name || 'No tiene evoluciones previas' : 'Información no disponible'}</p>
        {/* Agrega más información según sea necesario */}
      </div>
    </div>
  );
};

export default PokemonModal;
