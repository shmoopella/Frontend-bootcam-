import React from "react";

function SearchBar({ setFilterText }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const value = event.target.elements.search.value.trim();
    if (value) {
      setFilterText(value);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="form-control mb-3 mt-3"
        type="text"
        name="search"
        placeholder="Search a pokemon..."
      />
    </form>
  );
}

export default React.memo(SearchBar);
