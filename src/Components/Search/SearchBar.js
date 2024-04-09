import React, { useEffect, useState } from "react";
import { headers } from '../../config.js';
import MoviesSearchList from '../List/MoviesSearchList.js';
import './searchbar.css';


export default function SearchBar() {

    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState('');
    const [inputFocus, setInputFocus] = useState(true);

    useEffect(() => {
        if (searchValue.length >= 3) {
            fetch(`https://api.themoviedb.org/3/search/movie?query=${searchValue}&include_adult=false&language=fr-FR&page=1`, { headers })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erreur lors de la récupération des données');
                    }
                    return response.json();
                })
                .then(searchData => {
                    if(searchData.results.length > 0){
                        setSearchResult(searchData.results);
                    }
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des données:', error);
                });
        }else{
            setSearchResult([]);
        }
    }, [searchValue]);

    const handleSearchInputChange = (event) => {
        setSearchValue(event.target.value);
    };
    
    const handleSearchShowStatus = (event) => {
        if(event.type == "focus"){
            setInputFocus(true)
        }else{
            setTimeout(() => {
                setInputFocus(false);
            }, 100);
        }
    }

    return (
        <div className="relative">
            <form id="searchbar" className="flex items-center p-2 gap-x-2">
                <svg width="20" aria-labelledby="title desc" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.9 19.7"><title id="title">Search Icon</title><desc id="desc">A magnifying glass icon.</desc><g className="search-path" fill="none" stroke="#848F91"><path strokeLinecap="square" d="M18.5 18.3l-5.4-5.4" /><circle cx="8" cy="8" r="7" /></g></svg>
                <input
                    type="text"
                    name="s"
                    className="w-full border-b-2 border-black/50"
                    value={searchValue}
                    onChange={handleSearchInputChange}
                    onFocus={handleSearchShowStatus}
                    onBlur={handleSearchShowStatus}
                />
            </form>
            {inputFocus && <MoviesSearchList searchResult={searchResult} searchValue={searchValue} />}
        </div>
    )

}
