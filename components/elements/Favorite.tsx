import { FC, useState, useEffect } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { motion } from "framer-motion";
interface Props {
  isFavorite: boolean;
  toggleFavorite: Function;
}

export const Favorite: FC<Props> = ({ isFavorite, toggleFavorite }) => {
  const [favorite, setFavorite] = useState<boolean>(false);

  useEffect(() => {
    setFavorite(isFavorite);
  }, [isFavorite]);

  return (
    <div
      className="flex flex-row justify-between items-center cursor-pointer relative 
                before:content-[''] before:absolute before:block before:w-full before:h-[1px] 
                before:-bottom-2 before:left-0 before:bg-neutral-800 dark:before:bg-white
                before:hover:scale-x-100 before:scale-x-0 before:origin-top-left
                before:transition before:ease-in-out before:duration-300"
      onClick={() => toggleFavorite()}
    >
      {favorite ? (
        <motion.div whileHover="hover" className="flex">
          <p className="text-sm font-thin mx-2">Favorite</p>
          <motion.div
            variants={{
              hover: {
                scale: [1, 2, 2, 1, 1],
                rotate: [0, 0, 270, 270, 0],
                borderRadius: ["20%", "20%", "50%", "50%", "20%"],
              },
            }}
          >
            <AiFillStar className="text-yellow-500" size={18} />
          </motion.div>
        </motion.div>
      ) : (
        <motion.div whileHover="hover" className="flex">
          <p className="text-sm font-thin mx-2">Add to Favorites</p>
          <motion.div
            variants={{
              hover: {
                scale: [1, 2, 2, 1, 1],
                rotate: [0, 0, 270, 270, 0],
                borderRadius: ["20%", "20%", "50%", "50%", "20%"],
              },
            }}
          >
            <AiOutlineStar className="text-yellow-500" size={18} />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};
