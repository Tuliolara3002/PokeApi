// src/App.jsx
import React, { useEffect, useState } from 'react';
import { getPokemonData, getPokemonList } from './services/pokemonService';
import PokemonCard from './components/PokemonCard';
import SearchBar from './components/SearchBar';
import PokemonModal from './components/PokemonModal';
import './app.css';
import translation from './services/translation';

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const pokemonTypes = [
    "normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison",
    "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy"
  ];

  useEffect(() => {
    const fetchPokemon = async () => {
      const list = await getPokemonList();
      const dataPromises = list.map((pokemon) => getPokemonData(pokemon.name));
      const allPokemonData = await Promise.all(dataPromises);
      setPokemonList(allPokemonData);
      setFilteredPokemon(allPokemonData);
    };

    fetchPokemon();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);

    const results = pokemonList.filter((pokemon) =>
      pokemon.name.includes(query) ||
      pokemon.types.some((type) => type.type.name.includes(query)) ||
      pokemon.id.toString() === query
    );

    setFilteredPokemon(results);
  };

  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const filteredByType = selectedTypes.length > 0 
    ? filteredPokemon.filter((pokemon) => 
        pokemon.types.some((typeInfo) => selectedTypes.includes(typeInfo.type.name))
      )
    : filteredPokemon;

  const handleCardClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleCloseModal = () => {
    setSelectedPokemon(null);
  };

  return (
    <div className="app">
      <h1>Pokémon Search</h1>
      <div className="type-buttons">
        {pokemonTypes.map((type) => (
          <button
            key={type}
            className={`type-button ${selectedTypes.includes(type) ? 'selected' : ''}`}
            onClick={() => toggleType(type)}
          >
            {translation.types[type] || type}
          </button>
        ))}
      </div>

      <SearchBar onSearch={handleSearch} />
      <div className="pokemon-grid">
        {filteredByType.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} onClick={handleCardClick} />
        ))}
      </div>

      {selectedPokemon && (
        <PokemonModal pokemon={selectedPokemon} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
