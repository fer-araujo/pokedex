import { FC, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Type } from "../../interfaces";
interface Props {
  id: number;
  name: string;
  image: string;
  types: Type[];
}

export const Card: FC<Props> = ({ id, name, image, types }) => {
  const [mainTypes, setMainTypes] = useState<string>("");

  const router = useRouter();

  const pokemonProfile = () => {
    router.push(`/pokemon/${id}`);
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

  const getTypes = async () => {
    const main = getBackground(types[0].type.name);
    setMainTypes(main);
  };

  useEffect(() => {
    getTypes();
  }, []);

  return (
    <div
      className={`max-w px-0 m-2 ${mainTypes} rounded-lg group relative cursor-pointer items-center justify-center overflow-hidden shadow-[0px_2px_8px_1px_rgba(120,120,120,0.75)] dark:shadow-[0px_2px_8px_1px_rgba(0,0,0,0.75)]`}
      onClick={pokemonProfile}
    >
      <div className="w-full h-3/4 px-6 py-8 flex justify-center items-center">
        <Image
          className="transition-transform duration-500 group-hover:rotate-3 group-hover:scale-110"
          src={image}
          alt={`${name}-${id}`}
          style={{ width: "100%", height: "90px" }}
          width={80}
          height={80}
        />
      </div>
      <div
        className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neutral-600/10 dark:to-neutral-500/20 
        transition duration-1000 group-hover:from-neutral-600/50 group-hover:via-neutral-600/50 group-hover:to-neutral-600/50`}
      ></div>

      <div className="w-full h-1/4 px-4 absolute bottom-0 flex translate-y-[0] flex-col items-center justify-between text-center transition-all duration-[600ms] group-hover:-translate-y-24">
        <div className="w-full flex flex-row justify-between items-center mt-2 group-hover: mt-0">
          <div className="font-Poppins font-bold text-md first-letter:uppercase text-white">
            {name}
          </div>
          <div className="font-Poppins font-extrabold text-md text-white">
            # {id}
          </div>
        </div>

        <div className="p-5 mt-12 flex opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {types?.map((t, index) => {
            const bg = getBackground(t.type.name);
            return (
              <span
                key={index}
                className={`first-letter:uppercase ${bg}  inline-block rounded-full px-3 py-1 text-sm font-semibold text-white group-hover:text-white mr-2`}
              >
                {t.type.name}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};
