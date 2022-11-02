import type { NextPage, GetStaticProps } from "next";
import React, { useState } from "react";
import {
  getPokemonList,
  getPokemonSmall,
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

  const allPokemons: Pokemon[] = [];
  const pokemon = data.results;
  for (let i = 1; i <= pokemon.length ; i++) {
    const pokeObj = await getPokemonSmall(i);
    allPokemons.push(pokeObj);
  }

  const pokemons: Pokemon[] =  allPokemons
  

  return {
    props: {
      pokemons,
      allTypes,
    },
  };
};

export default Home;
