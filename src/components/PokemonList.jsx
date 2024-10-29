import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import PokemonCard from './PokemonCard';
import { getPokemonList, getPokemonData } from '../services/pokemonService';
import translation from '../services/translation';
import pokemonTypes from '../services/pokemonTypes';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const list = await getPokemonList();
      const detailedList = await Promise.all(
        list.map(async (pokemon) => {
          const data = await getPokemonData(pokemon.name);
          return data;
        })
      );
      setPokemonList(detailedList);
      setFilteredPokemon(detailedList); // Muestra todos los Pokémon al inicio
    };
    fetchData();
  }, []);

  // Filtrar la lista de Pokémon cuando cambia el estado de búsqueda o de tipos seleccionados
  useEffect(() => {
    const filterByTypeAndName = () => {
      const results = pokemonList.filter((pokemon) => {
        const nameMatch = pokemon.name.toLowerCase().includes(searchQuery);
        const typeMatch = selectedTypes.length === 0 || selectedTypes.every((selectedType) =>
          pokemon.types.some((typeInfo) => typeInfo.type.name === selectedType)
        );
        return nameMatch && typeMatch;
      });
      setFilteredPokemon(results);
    };

    filterByTypeAndName();
  }, [searchQuery, selectedTypes, pokemonList]);

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const toggleType = (type) => {
    const updatedTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type];

    setSelectedTypes(updatedTypes);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      
      <div className="type-buttons">
  {pokemonTypes.map((type) => (
    <button
      key={type}
      className={`type-button ${selectedTypes.includes(type) ? 'selected' : ''}`}
      onClick={() => toggleType(type)}
    >
      {translation.types[type] || type} {/* Aquí se traduce el tipo */}
    </button>
  ))}
</div>


      <div className="pokemon-grid">
        {filteredPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
