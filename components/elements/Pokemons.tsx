import { FC, useEffect, useState } from "react";
import { Card, Autocomplete, Filter, NoData } from "./";
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
        <Filter types={types} options={list} callback={onFilter} />
      </div>
      {showMsg && (
        <NoData message="We couldn't find a Pokemon with that name" />
      )}
      <div className="w-full relative lg:absolute z-20 flex flex-row justify-between items-center">
        <button className="fixed left-0 md:sticky rounded-full bg-neutral-600/80 hover:bg-neutral-800 p-2 flex items-center justify-between group/left ml-10" onClick={prevPage}>
          <p className="text-xl mx-2 group-hover/left:text-neutral-300 group-hover/left:-translate-x-0.5 transition-translate duration-500">
            &larr;
          </p>{" "}
          <p className="hidden md:block mx-2 group-hover/left:text-neutral-300 group-hover/left:translate-x-1 transition-translate duration-500">
            Previous
          </p>{" "}
        </button>
        &nbsp;
        <button className="fixed right-0 md:sticky rounded-full bg-neutral-600/80 hover:bg-neutral-800 p-2 flex items-center justify-between group/right mr-10" onClick={nextPage}>
          <p className="hidden md:block mx-2 group-hover/right:text-neutral-300 group-hover/right:-translate-x-0.5 transition-translate duration-500">
            Next
          </p>{" "}
          <p className="text-xl mx-2 group-hover/right:text-neutral-300 group-hover/right:translate-x-1 transition-translate duration-500">
            &rarr;
          </p>{" "}
        </button>
      </div>
      <div className="w-full lg:w-3/4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 p-6 ">
        {pokemons.length > 0 &&
          pokemonsPaging()?.map((poke) => {
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
