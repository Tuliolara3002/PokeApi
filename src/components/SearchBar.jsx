import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    onSearch(query); // Enviar el término de búsqueda en tiempo real
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search Pokémon by name, type or ID..."
        value={searchQuery}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
