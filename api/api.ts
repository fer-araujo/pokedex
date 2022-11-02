import axios from "axios";
import { PokemonFull, PokemonList, Description, Types } from "../interfaces";

const pokeApi = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

export async function getPokemonList() {
  return pokeApi.get<PokemonList>("/pokemon?offset=0&limit=251");
}

export async function getTypes() {
  const { data } = await pokeApi.get<Types>("/type");
  return data.results;
}

export async function getPokemon(number: string) {
  return await pokeApi.get<PokemonFull>(`/pokemon/${number}`);
}

export async function getPokemonDescription(number: string) {
  const { data } = await pokeApi.get<Description>(`/pokemon-species/${number}`);
  const index = data.flavor_text_entries.findIndex(
    (text) => text.language.name === "en"
  );

  return data.flavor_text_entries[index].flavor_text.replace(/[\n\f]/g, " ");

}

