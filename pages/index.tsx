import type { NextPage, GetStaticProps } from "next";
import React, { useState } from "react";
import {
  getPokemonImg,
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
  console.log(pokemons);
  return (
    <Layout title="Pokemons List">
      <Pokemons list={pokemons} types={allTypes} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await getPokemonList();

  const allTypes: Result[] = await getTypes();

  const pokemon = data.results;

  const pokemons: Pokemon[] =  pokemon.map((pokemon, index) => {

    return(
      {
        id: index + 1,
        name: pokemon.name,
        image: getPokemonImg(index + 1)
      }
    )
  })
  

  return {
    props: {
      pokemons,
      allTypes,
    },
  };
};

export default Home;
