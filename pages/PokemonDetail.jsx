import React from "react";
import { Link, useParams, useLocation, useSearchParams } from "react-router-dom"

export default function PokemonDetail() {
    const pokemonId = useParams()
    const [currentPokemonDetail, setCurrentPokemonDetail] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)
    const [pokemonTypes, setPokemonTypes] = React.useState(null)
    const [pokemonAbilities, setPokemonAbilities] = React.useState(null)

    const localPokemons = JSON.parse(localStorage.getItem("myPokemons"))
    const currentPokemon = findPokemon(pokemonId.id)
    const detailUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId.id}/`
    // console.log(currentPokemon)
    React.useEffect(() => {
        setIsLoading(true)
        async function fetchPokemonDetail() {
            const res = await fetch(detailUrl)
            const data = await res.json()
            console.log("data:", data)
            setCurrentPokemonDetail(() => {
                console.log("currentPokemonDetail:", currentPokemonDetail)
                return data
            })
        }
        fetchPokemonDetail()
        
        setIsLoading(false)
        
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

    if (currentPokemonDetail.length > 0) {
        setPokemonTypes(currentPokemonDetail.types.map((poke, index) => {
            return (<span key={index} className={poke.type.name}>{poke.type.name}</span>)
        }))
        setPokemonAbilities(currentPokemonDetail.abilities.map((poke, index) => {
            return (<span key={index} className={poke.ability.name}>{poke.ability.name}</span>)
        }))
    }

    return (
        <div className="details-container">
            <Link to="../" relative="path" className="back-btn">
                Back to all Pokemons
            </Link>
            {isLoading ? 
            <h3>Loading Pokemon Detail Info, Hold on...</h3> : 
            (
                <div className="pokemon-details">
                    <div className="pokemon-info">
                        <div className="image-part">
                            <img className="detail-front-img" src={currentPokemon.url} alt="" />
                            <div className="type">
                                {pokemonTypes}
                            </div>
                        </div>
                        <div className="info-part">
                            {/* set the first letter to uppercase and replace - with a space */}
                            <h3 className="detail-name">{(currentPokemon.name.charAt(0).toUpperCase() + currentPokemon.name.slice(1)).replace(/-/g, " ")}</h3>
                            <div className="attributes">
                                <p><b>Star: </b><img className="star-img" src="../assets/images/star-solid.svg" alt="" /></p>
                                <p><b>ID: </b>{currentPokemonDetail.id}</p>
                                <p><b>Height: </b>{currentPokemonDetail.height}</p>
                                <p><b>Weight: </b>{currentPokemonDetail.weight}</p>
                                <p><b>You have: </b>{currentPokemon.num}</p>
                            </div>
                            <div className="abilities">
                                {pokemonAbilities}
                            </div>
                        </div>
                    </div>
                    <div className="stat">
                        <p>hp</p>
                        <p>attack</p>
                        <p>defense</p>
                        <p>special-attack</p>
                        <p>special-defense</p>
                        <p>speed</p>
                    </div>
                    <button className="release-btn">Release</button>
                </div>
            ) }
            
        </div>
        
    )
}