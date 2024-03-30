import React from 'react';
import classes from './PokemonModal.module.sass';

const PokemonModal = ({ pokemon, onClose }) => {
    return (
        <div className={classes.modal}>
            <div className={classes.modalContent}>
                <span className={classes.close} onClick={onClose}>
                    &times;
                </span>
                <img
                    src={pokemon?.sprites?.other?.dream_world?.front_default}
                    alt="pokemon"
                    className={classes.img}
                />
                <h2>{pokemon.name}</h2>
                <p>Height: {pokemon.height}</p>
                <p>Weight: {pokemon.weight}</p>
            </div>
        </div>
    );
};

export default PokemonModal;
