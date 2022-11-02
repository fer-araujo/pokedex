import { useState } from "react";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { Navigation, Back, Favorite } from "../../components/elements";
import { getPokemonBig, getPokemonDescription } from "../../api/api";
import { Layout } from "../../components/layouts";
import { Pokemon } from "../../interfaces";
import { localFavorites } from "../../utils";

interface Props {
  pokemon: Pokemon;
  description: string;
}

const PokemonProfile: NextPage<Props> = ({ pokemon, description }) => {
  const [isInFavorites, setIsInFavorites] = useState(
    localFavorites.existInFavorites(pokemon.id)
  );

  const router = useRouter();

  const prevPage = () => {
    const prev = pokemon.id - 1 > 0 ? pokemon.id - 1 : 1;
    router.push(`${prev}`);
  };

  const nextPage = () => {
    const next = pokemon.id + 1 < 252 ? pokemon.id + 1 : 251;
    router.push(`${next}`);
  };

  const handleToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id, {
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.image,
      types: pokemon.types,
    });
    setIsInFavorites(!isInFavorites);
  };

  const getBackground = (type: string) => {
    let item = "";

    if (type === "special-attack") {
      item = "spattack";
    } else if (type === "special-defense") {
      item = "spdefense";
    } else {
      item = type;
    }

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
      hp: "bg-lime-500",
      attack: "bg-red-500",
      defense: "bg-yellow-500",
      spattack: "bg-orange-500",
      spdefense: "bg-sky-500",
      speed: "bg-purple-500",
    };

    let bg = "";

    Object.entries(pokeTypes).find(([key, value]) => {
      if (key === item) {
        bg = value;
        return true;
      }

      return false;
    });
    return bg;
  };

  return (
    <Layout title={pokemon.name}>
      <Back />

      <div className="w-full h-full lg:h-screen flex flex-col justify-start items-center ">
        <div className="flex flex-row justify-center items-center my-10 md:my-2 md:mt-10">
          <span className="mr-4 text-4xl font-black capitalize font-Poppins">
            #{pokemon.id}
          </span>
          <p className="text-4xl font-black capitalize font-Poppins">
            {pokemon.name}
          </p>
        </div>
        <div className="w-3/5 relative mb-12 lg:mb-[7%] xl:mb-10 flex flex-row justify-around items-center ">
          <Navigation prev={prevPage} next={nextPage} />
        </div>
        <div className="w-full h-full lg:h-4/5 md:py-6 lg:py-0 xl:py-5 2xl:py-9 mb-6 flex flex-col lg:flex-row justify-around items-center">
          <motion.div
            animate={{ opacity: [0, 1] }}
            transition={{ delay: 0.1 }}
            className="w-full lg:w-3/4 xl:w-3/5 h-full bg-neutral-100/50 dark:bg-neutral-500/50 flex flex-col lg:flex-row justify-center items-center shadow-[1px_0px_10px_4px_rgba(0,0,0,0.16)] dark:shadow-[0px_2px_10px_10px_rgba(0,0,0,0.15)] rounded-xl"
          >
            <motion.div
              animate={{ opacity: [0, 1] }}
              transition={{ delay: 0.5 }}
              className="w-2/5 sm:w-2/6 md:w-1/3 lg:w-2/5 h-full md:h-1/4 lg:h-1/2 md:py-6 lg:py-0 lg:px-6 flex flex-col justify-between items-center"
            >
              <Image
                src={pokemon.image}
                alt={`${pokemon.name}-${pokemon.id}`}
                style={{ width: "100%", height: "300px" }}
                width={100}
                height={100}
                priority
              />
            </motion.div>

            <div className="w-full lg:w-3/5 flex flex-col justify-between items-start py-4 px-6 lg:pr-10">
              <div className="w-full flex flex-row justify-between items-center my-2">
                <div className="flex flex-row justify-center items-center ">
                  <span className="mr-4 text-xl font-black capitalize font-Poppins">
                    Species:
                  </span>
                  <p className="text-xl font-thin capitalize">
                    {pokemon.species?.name}
                  </p>
                </div>

                <Favorite
                  isFavorite={isInFavorites}
                  toggleFavorite={handleToggleFavorite}
                />
              </div>

              <p className="text-lg font-thin my-1">{description}</p>

              <div className="flex flex-row justify-center items-center my-2">
                <span className="mr-4 text-xl font-black capitalize font-Poppins">
                  Height:
                </span>
                <p className="text-lg font-normal">
                  {((pokemon.height || 10) / 10).toFixed(2)} m
                </p>
              </div>
              <div className="flex flex-row justify-center items-center my-2">
                <span className="mr-4 text-xl font-black capitalize font-Poppins">
                  Weight:
                </span>
                <p className="text-lg font-normal">
                  {((pokemon.weight || 10) / 10).toFixed(2)} Kg
                </p>
              </div>
              <div>
                {pokemon.types?.map((obj, index) => {
                  const bg = getBackground(obj.type.name);
                  return (
                    <span
                      key={index}
                      className={`first-letter:uppercase ${bg} inline-block rounded-full px-4 py-1 text-md font-semibold text-white my-4 mr-2`}
                    >
                      {obj.type.name}
                    </span>
                  );
                })}
              </div>
              <div className="w-full flex flex-col">
                {pokemon.stats?.map((stats, index) => {
                  const bg = getBackground(stats.stat.name);
                  return (
                    <div key={index} className="w-full pt-1">
                      <div className="w-full flex justify-between items-center mb-1">
                        <p className="text-sm font-black font-Poppins capitalize">
                          {stats.stat.name}
                        </p>
                        <p className="text-md font-thin">{stats.base_stat}</p>
                      </div>

                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-neutral-300 dark:bg-neutral-200">
                        <motion.div
                          animate={{ width: ["0%", `${stats.base_stat}%`] }}
                          className={`${bg} flex flex-col text-center whitespace-nowrap justify-center transition-width duration-500`}
                        ></motion.div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemon = [...Array(251)].map((poke, index) => `${index + 1}`);

  return {
    paths: pokemon.map((id) => ({
      params: { id },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  const poke = await getPokemonBig(id);
  const description = await getPokemonDescription(id);

  return {
    props: {
      key: id,
      pokemon: poke,
      description: description,
    },
  };
};

export default PokemonProfile;
