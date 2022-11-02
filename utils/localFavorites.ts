import { Pokemon } from "../interfaces";

const toggleFavorite = (id: number, obj:Pokemon) => {
  if (typeof window === 'undefined') return false;

  let favorites: Pokemon[] = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );
    const exist = favorites.filter(f => f.id === id);
  if (exist.length > 0) {
    favorites = favorites.filter((pokeId) => pokeId.id !== id);
  } else {
    favorites.push(obj);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
};

const existInFavorites = (id: number): boolean => {

  if (typeof window === 'undefined') return false;

  const favorites: Pokemon[] = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );

  const exist = favorites.filter(f => f.id === id);

  if(exist.length > 0) return true;

  return false;
};

const pokemons = (): Pokemon[] => {
    return JSON.parse(localStorage.getItem("favorites") || "[]")
}

export default {
  existInFavorites,
  toggleFavorite,
  pokemons,
};
