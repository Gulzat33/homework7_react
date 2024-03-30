import React from 'react';
import classes from './PokemonList.module.sass';
import Pokemon from '../pokemon/Pokemon';

const PokemonList = ({pokemonList, onPokemonClick}) => {
    return (
        <ul className={classes.list}>
            {pokemonList.map(pokemon => (
                <Pokemon key={pokemon.name} pokemon={pokemon} onPokemonClick={onPokemonClick} />
            ))}
        </ul>
    );
};


export default PokemonList;