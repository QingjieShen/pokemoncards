import React from "react"
import { Link, useSearchParams } from "react-router-dom"


export default function MyPokemons() {
    // const [searchParams, useSearchParams] = useSearchParams()

    // const typeFilter = searchParams.get("type")
    const localPokemons = JSON.parse(localStorage.getItem("myPokemons")) || []
    // console.log(localPokemons)
    let pokemonsElements = []

    if(localPokemons.length > 0) {
        pokemonsElements= localPokemons.map(localPokemon => (
            <div key={localPokemon.index} className="my-pokemon-unit">
                <Link to={localPokemon.index}>
                    <img src={localPokemon.url} />
                    <h3>{localPokemon.name}</h3>
                </Link>
            </div>
        ))
    }

    return (
        <div>
            <div className="my-pokemons-wrapper">
                {localPokemons.length > 0 ? <h1>Here are your Pokemons</h1> : <h1>You don't have any Pokemon</h1>}
                {pokemonsElements.length > 0 ?(<div className="pokemons-gallery">
                    {pokemonsElements}
                </div>) : (
                    <div className="no-pokemon-div">
                    <p>Please go to Home page to catch some.</p>
                    <Link to="/">
                        <button className="go-home-btn">Catch Pokemons</button>
                    </Link>
                </div>)}
            </div>
        </div>
    );
}