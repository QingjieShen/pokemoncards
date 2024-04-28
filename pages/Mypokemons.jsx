import React from "react"
import PokemonDetailInfo from "../components/PokemonDetailInfo"
import { Link, useSearchParams } from "react-router-dom"

// import {handleFilterChange} from "../api/api"


export default function MyPokemons() {
    const [searchParams, setSearchParams] = useSearchParams()
    const typeFilter = searchParams.get("type")

    const localPokemons = JSON.parse(localStorage.getItem("myPokemon")) || []
    const displayPokemon = localPokemons.length > 0 ? (typeFilter ? localPokemons.filter(poke => {
        for (const type of poke.types) {
            if (type.type.name === typeFilter) {
                return true
            }
        }
        return false
    }) : localPokemons) : localPokemons
    let pokemonsElements = []
    let displayTitle = `
        <h1>Here are your Pokemon</h1>
    `

    if(displayPokemon.length > 0) {
        pokemonsElements= displayPokemon.map(localPokemon => (
            <PokemonDetailInfo 
                key={localPokemon.id}
                link={`./${localPokemon.id}`}
                state={{
                    search: `?${searchParams.toString()}`, 
                    type: typeFilter
                }}
                front_default={localPokemon.sprites.other.showdown.front_default}
                url={localPokemon.sprites.other["official-artwork"].front_default}
                name={(localPokemon.name.charAt(0).toUpperCase() + localPokemon.name.slice(1)).replace(/-/g, " ")}
            />
        ))
    }

    if (typeFilter && displayPokemon.length > 0) {
        displayTitle = 
        <h1>Here are all {typeFilter.toUpperCase()} Pokemon</h1>
    
    } else if (typeFilter && !displayPokemon.length) {
        displayTitle = 
        <h1>You don't have any {typeFilter.toUpperCase()} Pokemon</h1>
    
    } else if (!typeFilter && !displayPokemon.length) {
        displayTitle = 
        <h1>You don't have any Pokemon</h1>
    
    } else {
        displayTitle = 
        <h1>Here are your Pokemon</h1>
    
    }

    function handleFilterChange(key, value) {
        setSearchParams(prevParams => {
            if (!value) {
                prevParams.delete(key)
            } else {
                prevParams.set(key, value)
            }
            return prevParams
        })
    }

    return (
        <div>
            <div className="my-pokemons-wrapper">
                {displayTitle}
                <div className="pokemon-type-filter-btns">
                    <button onClick={() => handleFilterChange("type", "normal")} className="pokemon-type-normal">
                        Normal
                    </button>
                    <button onClick={() => handleFilterChange("type", "fighting")} className="pokemon-type-fighting">
                        Fighting
                    </button>
                    <button onClick={() => handleFilterChange("type", "flying")} className="pokemon-type-flying">
                        Flying
                    </button>
                    <button onClick={() => handleFilterChange("type", "poison")} className="pokemon-type-poison">
                        Poison
                    </button>
                    <button onClick={() => handleFilterChange("type", "ground")} className="pokemon-type-ground">
                        Ground
                    </button>
                    <button onClick={() => handleFilterChange("type", "rock")} className="pokemon-type-rock">
                        Rock
                    </button>
                    <button onClick={() => handleFilterChange("type", "bug")} className="pokemon-type-bug">
                        Bug
                    </button>
                    <button onClick={() => handleFilterChange("type", "ghost")} className="pokemon-type-ghost">
                        Ghost
                    </button>
                    <button onClick={() => handleFilterChange("type", "steel")} className="pokemon-type-steel">
                        Steel
                    </button>
                    <button onClick={() => handleFilterChange("type", "fire")} className="pokemon-type-fire">
                        Fire
                    </button>
                    <button onClick={() => handleFilterChange("type", "water")} className="pokemon-type-water">
                        Water
                    </button>
                    <button onClick={() => handleFilterChange("type", "grass")} className="pokemon-type-grass">
                        Grass
                    </button>
                    <button onClick={() => handleFilterChange("type", "electric")} className="pokemon-type-electric">
                        Electric
                    </button>
                    <button onClick={() => handleFilterChange("type", "psychic")} className="pokemon-type-psychic">
                        Psychic
                    </button>
                    <button onClick={() => handleFilterChange("type", "ice")} className="pokemon-type-ice">
                        Ice
                    </button>
                    <button onClick={() => handleFilterChange("type", "dragon")} className="pokemon-type-dragon">
                        Dragon
                    </button>
                    <button onClick={() => handleFilterChange("type", "dark")} className="pokemon-type-dark">
                        Dark
                    </button>
                    <button onClick={() => handleFilterChange("type", "fairy")} className="pokemon-type-fairy">
                        Fairy
                    </button>
                    <button onClick={() => handleFilterChange("type", "unknown")} className="pokemon-type-unknown">
                        Unknown
                    </button>
                    <button onClick={() => handleFilterChange("type", "shadow")} className="pokemon-type-shadow">
                        Shadow
                    </button>
                </div>
                {typeFilter ? (
                        <button onClick={() => handleFilterChange("type", null)} className="pokemon-type-clear">
                        Clear filter</button>
                    ) : null}
                {pokemonsElements.length > 0 ?(<div className="pokemons-gallery">
                    {pokemonsElements}
                </div>) : (
                    <div className="no-pokemon-div">
                    <p>Please go to Home page to catch some.</p>
                    <Link to="/">
                        <button className="go-home-btn">Catch Pokemon</button>
                    </Link>
                </div>)}
            </div>
        </div>
    );
}