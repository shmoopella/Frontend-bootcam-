export async function fetchFirstPokemons(setList) {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon");
  if (!response.ok) {
    throw new Error("Не удалось загрузить данные.");
  }
  const pokemons = await response.json();
  const data = pokemons.results;
  setList(data);
}
export async function fetchPokemon(pokemonName, setList) {
  const url = "https://pokeapi.co/api/v2/pokemon/" + pokemonName;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Не удалось загрузить данные.");
  }
  const data = await response.json();
  const newPokemon = { name: data.name, url: url };
  setList((prevList) =>
    prevList.some((item) => item.name === newPokemon.name)
      ? prevList
      : [newPokemon, ...prevList],
  );
}

export async function fetchPokeInfo(url, setPokemon) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Ошибка HTTP: ${response.status} (${response.statusText})`);
  }

  const pokemonInfo = await response.json();
  const id = pokemonInfo.id;
  const speciesResponse = await fetch(
    "https://pokeapi.co/api/v2/pokemon-species/" + id,
  );
  const speciesInfo = await speciesResponse.json();
  const varieties = speciesInfo.varieties;

  setPokemon({
    name: pokemonInfo.name,
    photo: pokemonInfo.sprites.front_default,
    formsCount: varieties.length,
    formsList: varieties.map((item) => {
      return item.pokemon.name;
    }),
  });
}
