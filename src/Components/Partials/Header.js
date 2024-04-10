import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../Search/SearchBar";

export default function Header() {
    return (
        <header className="border-b flex items-center justify-between p-3 container">
            <div className='flex items-center'>
                <h1 className="text-4xl">Movie Tracker</h1>
                    
                <ul className="flex justify-center space-x-10 ml-20">
                    <li><Link to="/" className="list">Accueil</Link></li>
                    <li><Link to="/films" className="list">Films</Link></li>
                    <li><Link to="/categories" className="list">Categories</Link></li>
                    <li><Link to="/favoris" className="list">Favoris</Link></li>
                </ul>
            </div>

            <SearchBar />
        </header>
    )
}