import React from "react";
import SearchBar from "./SearchBar";
import PokemonList from "./PokemonList";
import { fetchFirstPokemons, fetchPokemon } from "../pokemonApi";

function FilterablePokemonList() {
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [pokeList, setPokeList] = React.useState([]);
  const [filterText, setFilterText] = React.useState("");

  React.useEffect(() => {
    setError(null);
    setIsLoading(true);
    fetchFirstPokemons(setPokeList)
      .catch(() => {
        setError("Ошибка при получении данных!");
      })
      .finally(() => setIsLoading(false));
  }, []);

  React.useEffect(() => {
    if (filterText.trim() !== "") {
      setIsLoading(true);
      setError(null);
      fetchPokemon(filterText, setPokeList)
        .catch(() => {
          setError("Такой покемон не найден!");
        })
        .finally(() => setIsLoading(false));
    }
  }, [filterText]);

  return (
    <div className="container">
      {isLoading && <div className="alert alert-info">Загрузка...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <SearchBar setFilterText={setFilterText} />

      <PokemonList
        className="container"
        pokemons={pokeList}
        setPokemons={setPokeList}
      />
    </div>
  );
}

export default FilterablePokemonList;
