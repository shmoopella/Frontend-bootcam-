import React from "react";
import { fetchPokeInfo } from "../pokemonApi";

function PokemonInfo({ url }) {
  console.log(url);
  const [pokemon, setPokemon] = React.useState(null);
  React.useEffect(() => {
    fetchPokeInfo(url, setPokemon);
  }, [url]);

  if (pokemon) {
    return (
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <img
            className="card-img-top"
            alt="Фото покемона"
            src={pokemon.photo}
          />
          <h4 className="card-title">{pokemon.name} </h4>
          <div className="card-text">
            <h6>Количество доступных форм: {pokemon.formsCount} </h6>
            <p>Список доступных форм: </p>
            <ul>
              {pokemon.formsList.map((form) => (
                <li>{form}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  } else {
    return <div className="alert alert-info">Загрузка...</div>;
  }
}

export default PokemonInfo;
