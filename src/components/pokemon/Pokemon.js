// Pokemon.js

import React, { useEffect, useState } from 'react';
import classes from './Pokemon.module.sass';
import PokemonModal from '../pokemonModal/PokemonModal'; // Импортируем компонент модального окна

const Pokemon = ({ pokemon }) => {
    const [loading, setLoading] = useState(true);
    const [pokemonDetails, setPokemonDetails] = useState(null);
    const [modalOpened, setModalOpened] = useState(false); // Состояние для открытия/закрытия модального окна

    const getApi = async () => {
        try {
            const response = await fetch(pokemon.url);
            const data = await response.json();
            setPokemonDetails(data);
        } catch (e) {
            console.log('Error', e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getApi();
    }, []);

    useEffect(() => {
        const handleKeydown = (event) => {
            if (modalOpened && event.key === 'Escape') {
                setModalOpened(false);
            }
        };

        document.addEventListener('keydown', handleKeydown);

        return () => {
            document.removeEventListener('keydown', handleKeydown);
        };
    }, [modalOpened]);

    const openModal = () => {
        if (!modalOpened) { // Проверяем, не открыто ли уже модальное окно
            setModalOpened(true);
        }
    };

    const closeModal = () => {
        setModalOpened(false);
    };

    return (
        <li className={classes.pokemonItem}>
            <div className={modalOpened ? classes.overlay : ''} onClick={closeModal}></div> {/* Элемент для темного заднего фона */}
            {modalOpened && pokemonDetails && (
                <PokemonModal pokemon={pokemonDetails} onClose={closeModal} />
            )}
            <>
                <div className={classes.pokemonItem_info}>
                    {!loading && (
                        <>
                            <img
                                src={pokemonDetails?.sprites?.other?.dream_world?.front_default}
                                alt="pokemon"
                                className={classes.img}
                            />
                            <p className={classes.name}>{pokemon.name}</p>
                        </>
                    )}
                </div>
                <button className={classes.btn} onClick={openModal}>
                    Подробнее
                </button>
            </>
        </li>
    );
};

export default Pokemon;
