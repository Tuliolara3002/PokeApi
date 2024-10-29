// src/services/pokemonService.jsx
import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2/';

export const getPokemonData = async (pokemon) => {
  try {
    const response = await axios.get(`${API_URL}pokemon/${pokemon}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    return null;
  }
};

export const getPokemonList = async (limit = 151) => {
  try {
    const response = await axios.get(`${API_URL}pokemon?limit=${limit}`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching Pokémon list:', error);
    return [];
  }
};

export const getPokemonSpecies = async (pokemonId) => {
  try {
    const response = await axios.get(`${API_URL}pokemon-species/${pokemonId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokémon species data:', error);
    return null;
  }
};
