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

// Home page
const Home: NextPage<Props> = ({ pokemons, allTypes }) => {
  return (
    <Layout title="Pokemons List">
      <Pokemons list={pokemons} types={allTypes} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {

  // All the 251 pokemons in an array of objects with the following structure:
  // results[{name: bulbasaur, url: 'http://pokeapi.co/pokemon/1'} ]
  const { data } = await getPokemonList();

  // All the types of pokemons in an array of objects with the following structure:
  // results[{id: 1, name: normal} ]
  const allTypes: Result[] = await getTypes();

  const pokemon = data.results;

  // Mapping the pokemons so we only get the data we need
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
