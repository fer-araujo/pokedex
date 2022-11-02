import { type } from "os";
import { FC, useState } from "react";
import { Pokemon, Result } from "../../interfaces";

interface Props {
  types: Result[];
  options: Pokemon[];
  callback: Function;
}

export const Filter: FC<Props> = ({ types, options, callback }) => {

  const [activeElement, setActiveElement] = useState('All');
  console.log(options)
  const handleFilter = (type: string) => {
    if (type === "All") {
      callback(options);
      setActiveElement("All")
    } else {
      const filtered = options.filter((pokemon) =>
        pokemon.types?.some((t) => t.type.name === type)
      );
      callback(filtered);
      setActiveElement(type);
    }
  };

  const getBackground = (type: string) => {
    const pokeTypes = {
      normal: "bg-normal",
      fire: "bg-fire",
      water: "bg-water",
      electric: "bg-electric",
      grass: "bg-grass",
      ice: "bg-ice",
      fighting: "bg-fighting",
      poison: "bg-poison",
      ground: "bg-ground",
      flying: "bg-flying",
      psychic: "bg-psychic",
      bug: "bg-bug",
      rock: "bg-rock",
      ghost: "bg-ghost",
      dragon: "bg-dragon",
      dark: "bg-dark",
      steel: "bg-steel",
      fairy: "bg-fairy",
      unknown: "bg-neutral-800",
      shadow: "bg-purple-900",
    };

    let bg = "";

    Object.entries(pokeTypes).find(([key, value]) => {
      if (key === type) {
        bg = value;
        return true;
      }

      return false;
    });

    return bg;
  };

  return (
    <div className="w-full flex justify-center items-center mt-4">
      <div className=" w-full lg:w-4/6 flex flex-nowrap lg:flex-wrap justify-start lg:justify-center items-center overflow-x-auto">
        <span
          key={types.length + 1}
          className={`first-letter:uppercase cursor-pointer bg-neutral-400 ${ activeElement !== "All" ? "bg-opacity-60" : ""} hover:bg-opacity-40 inline-block rounded-full px-4 py-1 text-md font-semibold text-white my-4 mr-2`}
          onClick={() => handleFilter("All")}
        >
          All
        </span>
        {types?.map((type, index) => {
          const bg = getBackground(type.name);
          return (
            <span
              key={index}
              className={`first-letter:uppercase cursor-pointer ${bg} ${ activeElement !== type.name ? "bg-opacity-60" : ""} hover:bg-opacity-40 inline-block rounded-full px-4 py-1 text-md font-semibold text-white my-4 mr-2`}
              onClick={() => handleFilter(type.name)}
            >
              {type.name}
            </span>
          );
        })}
      </div>
    </div>
  );
};
