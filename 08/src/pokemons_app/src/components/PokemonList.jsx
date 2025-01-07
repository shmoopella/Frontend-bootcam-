import React from "react";
import DeleteButton from "./DeleteButton";
import CustomAlert from "./CustomAlert";
import PokemonInfo from "./PokemonInfo";

function PokemonList({ pokemons, setPokemons }) {
  const [showInfo, setShowInfo] = React.useState([]);

  const handleShowInfo = React.useCallback((name) => {
    setShowInfo((prevState) => [...prevState, name]);
  }, []);
  const handleCloseInfo = React.useCallback((name) => {
    setShowInfo((prevState) => prevState.filter((item) => item !== name));
  }, []);

  const handleDelete = React.useCallback((name) => {
    setPokemons((prevPokemons) =>
      prevPokemons.filter((pokemon) => pokemon.name !== name),
    );
    setShowInfo((prevState) => prevState.filter((item) => item !== name));
  }, []);

  if (pokemons.length > 0) {
    return pokemons.map((pokemon) => (
      <div className="row" key={pokemon.name}>
        <div className="col">
          <div>{pokemon.name}</div>
          <button
            className="btn btn-info"
            onClick={() => handleShowInfo(pokemon.name)}
          >
            Подробнее
          </button>
          {showInfo.includes(pokemon.name) && (
            <CustomAlert onClose={() => handleCloseInfo(pokemon.name)}>
              <PokemonInfo url={pokemon.url} />
            </CustomAlert>
          )}
        </div>
        <div className="col mt-3">
          <DeleteButton onDelete={() => handleDelete(pokemon.name)} />
        </div>
      </div>
    ));
  } else {
    return (
      <div className="alert alert-info">
        Список покемонов пустой: обновите страницу или введите нового покемона
        через поисковую строку.
      </div>
    );
  }
}

export default PokemonList;
