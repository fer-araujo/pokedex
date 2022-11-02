import { FC, useEffect, useState } from "react";
import { Card, Autocomplete, Filter } from "./";
import { Pokemon, Result } from "../../interfaces/";

interface Props {
  list: Pokemon[];
  types: Result[];
}

export const Pokemons: FC<Props> = ({ list, types }) => {
  const [showMsg, setShowMsg] = useState<boolean>(false);
  const [pokemons, setPokemons] = useState<Pokemon[]>(list);
  const [filterList, setFilterList] = useState<Pokemon[]>(list);
  const [searchList, setSearchList] = useState<Pokemon[]>(list);

  useEffect(() => {
    setSearchList(filterList);
  }, [filterList]);

  useEffect(() => {
    setPokemons(searchList);
  }, [searchList]);

  useEffect(() => {
    pokemons.length === 0 ? setShowMsg(true) : setShowMsg(false);
  }, [pokemons]);

  return (
    <div className="p-6 flex flex-col justify-center items-center ">
      <h1 className="font-Poppins font-black text-5xl text-neutral-700 dark:text-white">
        Pokemon List
      </h1>
      <div className="w-full flex flex-col justify-center items-center mt-8">
        <Autocomplete
          label="Find a Pokemon"
          options={searchList}
          callback={setPokemons}
        />
        <Filter types={types} options={list} callback={setFilterList} />
      </div>
      {showMsg && (
        <div className="w-full flex justify-center text-center bg-orange-300">
          <p>We couldn't find a Pokemon with that name</p>
        </div>
      )}

      <div className="w-full lg:w-3/4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 p-6 ">
        {pokemons.length > 0 &&
          pokemons?.map((poke) => {
            return (
              <Card
                key={poke.id}
                id={poke.id}
                name={poke.name}
                image={poke.image}
                types={poke.types}
              />
            );
          })}
      </div>
    </div>
  );
};
