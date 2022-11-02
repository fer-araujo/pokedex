import { FC, useState, useEffect } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

interface Props {
  isFavorite: boolean;
  toggleFavorite: Function;
}

export const Favorite: FC<Props> = ({ isFavorite, toggleFavorite }) => {

    const [favorite,setFavorite] = useState<boolean>(false);

    useEffect(() => {
        setFavorite(isFavorite)
    },[]);
    
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
        <>
          <p className="text-sm font-thin mx-2">Favorite</p>
          <AiFillStar className="text-yellow-500" size={18} />
        </>
      ) : (
        <>
          <p className="text-sm font-thin mx-2">Add to Favorites</p>
          <AiOutlineStar className="text-yellow-500" size={18} />
        </>
      )}
    </div>
  );
};
