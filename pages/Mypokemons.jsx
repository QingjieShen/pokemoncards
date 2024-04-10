import React from "react"
import { Link } from "react-router-dom"


export default function MyPokemons() {
    const localPokemons = JSON.parse(localStorage.getItem("myPokemons"))
    // console.log(localPokemons)
    const pokemonsElements = localPokemons.map(localPokemon => (
        <div key={localPokemon.index} className="my-pokemon-unit">
            <Link to={localPokemon.index}>
                <img src={localPokemon.url} />
                <h3>{localPokemon.name}</h3>
            </Link>
        </div>
    ))

    return (
        <div>
            <div className="my-pokemons-wrapper">
                <h1>Here are your Pokemons</h1>
                <div className="pokemons-gallery">
                    {pokemonsElements}
                </div>
            </div>
        </div>
    );
}