import { Species, Type } from ".";
import { Stat } from './pokemonFull';

export interface PokemonList {
    count:    number;
    next?:     string;
    previous?: string;
    results:  Pokemon[];
}

export interface Pokemon {
    id: number;
    name: string;
    image: string;
    types: Type[];
    height?: number;
    weight?: number;
    species?: Species;
    stats?: Stat[];
    url?: string;
}