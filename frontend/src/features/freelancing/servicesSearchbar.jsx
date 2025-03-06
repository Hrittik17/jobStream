import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search services..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full p-3 border border-gray-300 rounded-md"
      />
      <span className="absolute right-3 top-3 text-gray-500">🔍</span>
    </div>
  );
};

export default SearchBar;
