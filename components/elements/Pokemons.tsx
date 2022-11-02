import { FC, useEffect, useState } from "react";
import { Card, Autocomplete, Filter, NoData, Navigation } from "./";
import { Pokemon, Result, Type } from "../../interfaces/";
import { motion } from "framer-motion";
import { getPokemonType } from "../../api/api";
interface Props {
  list: Pokemon[];
  types: Result[];
}

export const Pokemons: FC<Props> = ({ list, types }) => {
  const [showMsg, setShowMsg] = useState<boolean>(false);
  const [pokemons, setPokemons] = useState<Pokemon[]>(list);
  const [pokeTypes, setPokeTypes] = useState<Pokemon[]>([]);
  const [filterList, setFilterList] = useState<Pokemon[]>(list);
  const [searchList, setSearchList] = useState<Pokemon[]>(list);
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    setSearchList(filterList);
  }, [filterList]);

  useEffect(() => {
    setPokemons(searchList);
  }, [searchList]);

  useEffect(() => {
    pokemons.length === 0 ? setShowMsg(true) : setShowMsg(false);
  }, [pokemons]);

  useEffect(() => {
    addTypes();
  }, [])

  const pokemonsPaging = (): Pokemon[] => {
    return pokemons.slice(currentPage, currentPage + 25);
  };

  const nextPage = () => {
    if (pokemons.length > currentPage + 25)
      setCurrentPage((currentPage) => currentPage + 25);
  };

  const prevPage = () => {
    setCurrentPage((currentPage) =>
      currentPage - 25 >= 0 ? currentPage - 25 : 0
    );
  };

  const onSearch = (filter: Pokemon[]) => {
    setPokemons(filter);
    setCurrentPage(0);
  };

  const onFilter = (filter: Pokemon[]) => {
    setFilterList(filter);
    setCurrentPage(0);
  };

  const addTypes = async () => {
    const pokeIDs = list.map(poke =>{ return ({id:poke.id,name:poke.name,image: poke.image})})
    const typesArray = [];
    for (const poke of pokeIDs) {
      const types: Type[] = await getPokemonType(poke.id);
      const pokeObj = {id:poke.id,name:poke.name,image:poke.image,types:types}
      typesArray.push(pokeObj);
    }
    setPokeTypes(typesArray)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  return (
    <div className="p-6 flex flex-col justify-center items-center ">
      <h1 className="font-Poppins font-black text-5xl text-neutral-700 dark:text-white">
        Pokemon List
      </h1>
      <div className="w-full flex flex-col justify-center items-center mt-8">
        <Autocomplete
          label="Find a Pokemon"
          options={searchList}
          callback={onSearch}
        />
        <Filter types={types} options={pokeTypes} callback={onFilter} />
      </div>
      {showMsg && (
        <NoData message="We couldn't find a Pokemon with that name" />
      )}

      {pokemons.length >= 25 && (
        <Navigation prev={prevPage} next={nextPage} />
      )}

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full lg:w-3/4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 p-6 "
      >
        {pokemons.length > 0 &&
          pokemonsPaging()?.map((poke) => {
            return (
              <motion.div variants={item} key={poke.id}>
                <Card
                  id={poke?.id}
                  name={poke?.name}
                  image={poke?.image}
                />
              </motion.div>
            );
          })}
      </motion.div>
    </div>
  );
};
