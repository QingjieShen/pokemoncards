import React from "react";
import { Link, useParams, useLocation, useSearchParams } from "react-router-dom"

export default function PokemonDetail() {
    const pokemonId = useParams()
    const [currentPokemonDetail, setCurrentPokemonDetail] = React.useState(null)

    const localPokemons = JSON.parse(localStorage.getItem("myPokemons"))
    const currentPokemon = findPokemon(pokemonId.id)
    const detailUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId.id}/`
    // console.log(currentPokemon)
    React.useEffect(() => {
        async function getPokemonDetails() {
            const res = await fetch(detailUrl)
            const data = await res.json()
            console.log(data)
            setCurrentPokemonDetail(data)
        }
        getPokemonDetails()
    }, [])

    // this function can be defined as a utility function
    function findPokemon(id) {
        let targetPokemon = null
        localPokemons.map(pokemon => {
            if (pokemon.index === id) {
                targetPokemon = pokemon
            }
        })
        return targetPokemon
    }

    return (
        <div className="details-container">
            <Link to="../" relative="path" className="back-btn">
                Back to all Pokemons
            </Link>
            <div className="pokemon-details">
                <img className="detail-front-img" src={currentPokemon.url} alt="" />
                <h3 className="detail-name">{currentPokemon.name.charAt(0).toUpperCase() + currentPokemon.name.slice(1)}</h3>
                <div className="abilities">

                </div>
            </div>
        </div>
        
    )
}