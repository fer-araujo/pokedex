import { Type } from ".";

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
}