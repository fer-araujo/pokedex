import type { NextPage, GetStaticProps } from "next";
import React from "react";
import {
  getPokemon,
  getPokemonList,
  getTypes,
} from "../api/api";
import { Pokemons } from "../components/elements/Pokemons";
import { Layout } from "../components/layouts";
import { Pokemon, Result } from "../interfaces/";
import { PokemonFull } from '../interfaces/pokemonFull';

interface Props {
  pokemons: Pokemon[];
  allTypes: Result[];
}

const Home: NextPage<Props> = ({ pokemons, allTypes }) => {
  return (
    <Layout title="Pokemons List">
      <Pokemons list={pokemons} types={allTypes} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await getPokemonList();
  const allTypes: Result[] = await getTypes();

  const allPokemons: PokemonFull[] = [];
  const pokemon = data.results;
  
  for (let i = 1; i <= pokemon.length + 1; i++) {
    const { data } = await getPokemon(`${i}`);
    allPokemons.push(data);
  }

  const pokemons: Pokemon[] = 
  
  allPokemons.map((poke, index) => {
    return ({
      id: poke.id,
      name: poke.name,
      image: poke.sprites.other?.dream_world.front_default || 'no-image.png',
      types: poke.types
    });
  });

  return {
    props: {
      pokemons,
      allTypes,
    },
  };
};

export default Home;
