import React, { useEffect, useState } from 'react';
import classes from './PokemonPage.module.sass';
import PokemonList from '../../components/pokemonList/PokemonList';
import PaginationPokemon from '../../components/paginationPokemon/PaginationPokemon';
import Pagination from '../../components/pagination/Pagination';


const PokemonPage = () => {
    const [ pokemonList, setPokemonList ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    const [ limit, setLimit ] = useState(12);
    const [ offset, setOffset ] = useState(0);

    const page = Math.floor(offset / limit) + 1;
    console.log(offset);
    const handlePrev = () => {
        if (offset > 0) return setOffset(prev => prev - limit);
    };

    const handleNext = () => {
        setOffset(prev=> prev+limit)
    }


    const getApi = async(offset, limit) => {
        setLoading(true);
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`);
            const data = await response.json();
            return data.results;
        } catch(e) {
            console.log('Error', e.message);
        } finally {
            setLoading(false);
        }


    };

    useEffect(() => {
        getApi(offset, limit).then(pokemons => setPokemonList(pokemons));
    }, [offset, limit]);

    return (

        <div className={classes.wrapper}>
            <p className={classes.title}>Pokemon</p>
            {loading ? 'loading' : <PokemonList pokemonList={pokemonList}/>}
            <PaginationPokemon prev={handlePrev} page={page} next={handleNext}/>
        </div>
    );
};

export default PokemonPage;