import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { getPokemon, getPokemonDescription } from "../../api/api";
import { Layout } from "../../components/layouts";
import { PokemonFull } from "../../interfaces";
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

interface Props {
  pokemon: PokemonFull;
  description: string;
}

const PokemonProfile: NextPage<Props> = ({ pokemon, description }) => {
  const router = useRouter();
  const handlePage = (page: string) => {
    page === "next"
      ? router.push(`/pokemon/${pokemon.id + 1}`)
      : router.push(`/pokemon/${pokemon.id - 1}`);
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

  const toggleFavorite = () => {

  }

  return (
    <Layout title={pokemon.name}>
      <div className="w-full h-full lg:h-screen flex flex-col justify-start items-center ">
        <div className="flex flex-row justify-center items-center my-10 md:my-2 md:mt-10">
          <span className="mr-4 text-4xl font-black capitalize font-Poppins">
            #{pokemon.id}
          </span>
          <p className="text-4xl font-black capitalize font-Poppins">
            {pokemon.name}
          </p>
        </div>
        <div className="w-full mb-8 md:m-0 flex flex-row justify-around items-center ">
          <a
            className="cursor-pointer flex items-center justify-between group/left"
            onClick={() => handlePage("prev")}
          >
            <p className="text-xl mx-2 group-hover/left:text-neutral-300 group-hover/left:-translate-x-0.5 transition-translate duration-500">
              &larr;
            </p>{" "}
            <p className="mx-2 group-hover/left:text-neutral-300 group-hover/left:translate-x-1 transition-translate duration-500">
              Previous
            </p>{" "}
          </a>
          <a className="cursor-pointer flex items-center justify-between group/right" onClick={() => handlePage("next")}>
          <p className="mx-2 group-hover/right:text-neutral-300 group-hover/right:-translate-x-0.5 transition-translate duration-500">
              Next
            </p>{" "}
            <p className="text-xl mx-2 group-hover/right:text-neutral-300 group-hover/right:translate-x-1 transition-translate duration-500">
              &rarr;
            </p>{" "}
          </a>
        </div>
        <div className="w-full h-full lg:h-4/5 md:py-6  mb-6 flex flex-col lg:flex-row justify-around items-center">
          <div className="w-full lg:w-3/4 xl:w-3/5 h-full bg-neutral-100/50 dark:bg-neutral-500/50 flex flex-col lg:flex-row justify-center items-center shadow-[1px_0px_10px_4px_rgba(0,0,0,0.16)] dark:shadow-[0px_2px_10px_10px_rgba(0,0,0,0.15)] rounded-xl">
            <div className="w-2/5 sm:w-2/6 md:w-1/3 lg:w-2/5 h-full md:h-1/4 lg:h-1/2 md:py-6 lg:py-0 lg:px-6 flex flex-col justify-between items-center">
              <Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  "/no-image.png"
                }
                alt={`${pokemon.name}-${pokemon.id}`}
                style={{ width: "100%", height: "300px" }}
                width={100}
                height={100}
                priority
              />
            </div>

            <div className="w-full lg:w-3/5 flex flex-col justify-between items-start py-4 px-6 lg:pr-10">
              <div className="w-full flex flex-row justify-between items-center my-2">
                <div className="flex flex-row justify-center items-center ">
                  <span className="mr-4 text-xl font-black capitalize font-Poppins">
                    Species:
                  </span>
                  <p className="text-xl font-thin capitalize">
                    {pokemon.species.name}
                  </p>
                </div>

                <div className="flex flex-row justify-between items-center cursor-pointer relative 
              before:content-[''] before:absolute before:block before:w-full before:h-[1px] 
              before:-bottom-2 before:left-0 before:bg-neutral-800 dark:before:bg-white
              before:hover:scale-x-100 before:scale-x-0 before:origin-top-left
              before:transition before:ease-in-out before:duration-300"
              onClick={toggleFavorite}
              >
                  <p className="text-sm font-thin mx-2">Add to Favorites</p>
                  <p className="text-sm font-thin mx-2">Favorite</p>
                  <AiOutlineStar className="text-yellow-500" size={18}/>
                  <AiFillStar className="text-yellow-500" size={18}/>
                </div>
              </div>

              <p className="text-lg font-thin my-1">{description}</p>

              <div className="flex flex-row justify-center items-center my-2">
                <span className="mr-4 text-xl font-black capitalize font-Poppins">
                  Height:
                </span>
                <p className="text-lg font-normal">
                  {(pokemon.height / 10).toFixed(2)} m
                </p>
              </div>
              <div className="flex flex-row justify-center items-center my-2">
                <span className="mr-4 text-xl font-black capitalize font-Poppins">
                  Weight:
                </span>
                <p className="text-lg font-normal">
                  {(pokemon.weight / 10).toFixed(2)} Kg
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
                        <div
                          style={{ width: `${stats.base_stat}%` }}
                          className={`${bg} flex flex-col text-center whitespace-nowrap justify-center transition-width duration-500`}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
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

  const { data } = await getPokemon(id);
  const description = await getPokemonDescription(id);

  return {
    props: {
      pokemon: data,
      description: description,
    },
  };
};

export default PokemonProfile;
