import { useEffect, useState } from "react";
import type { NextPage, GetStaticProps } from "next";
import { getTypes } from "../../api/api";
import { NoData, Back } from "../../components/elements";
import { Pokemons } from "../../components/elements/Pokemons";
import { Layout } from "../../components/layouts";
import { Pokemon, Result } from "../../interfaces";
import { localFavorites } from "../../utils";

interface Props {
  allTypes: Result[];
}

const Favorites: NextPage<Props> = ({ allTypes }) => {
  const [favoritePokemons, setFavoritePokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    setFavoritePokemons(localFavorites.pokemons());
  }, []);

  return (
    <Layout title="Favorites Pokemon">
      <Back />
      {favoritePokemons.length === 0 ? (
        <NoData message="No favorites Pokemons found." />
      ) : (
        <Pokemons list={favoritePokemons} types={allTypes} />
      )}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const allTypes: Result[] = await getTypes();

  return {
    props: {
      allTypes,
    },
  };
};

export default Favorites;
