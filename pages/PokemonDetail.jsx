import React from "react";
import { Link, useParams, useLocation } from "react-router-dom"

export default function PokemonDetail() {
    const pokemonId = useParams()
    const location = useLocation()
    /* const [currentPokemonDetail, setCurrentPokemonDetail] = React.useState({
        types: [],
        abilities: [],
        stats: []
    }) */
    // const [isLoading, setIsLoading] = React.useState(false)
    /* const [pokemonTypes, setPokemonTypes] = React.useState([])
    const [pokemonAbilities, setPokemonAbilities] = React.useState([])
    const [pokemonStats, setPokemonStats] = React.useState([]) */

    const localPokemons = JSON.parse(localStorage.getItem("myPokemons"))
    const currentPokemon = findPokemon(pokemonId.id)
    // const detailUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId.id}/`
    // console.log(currentPokemon)
    /* React.useEffect(() => {
        async function fetchPokemonDetail() {
            setIsLoading(true)
            try {
                const res = await fetch(detailUrl)
                const data = await res.json()
                console.log("data:", data)
                setCurrentPokemonDetail(data)
                setPokemonStats(data.stats)
                setPokemonAbilities(data.abilities)
                setPokemonTypes(data.types)
            } catch (err) {
                alert(err)
            } finally {
                console.log("currentPokemonDetail inside:", currentPokemonDetail)
                setIsLoading(false)
            }
        }
        fetchPokemonDetail()
    }, []) */

    // this function can be defined as a utility function
    function findPokemon(id) {
        let targetPokemon = null
        localPokemons.map(pokemon => {
            if (pokemon.id == id) {
                targetPokemon = pokemon
            }
        })
        return targetPokemon
    }

    // release Pokemon by ID
    function removePokemon(id) {
        let targetPokemonIndex = 0
        localPokemons.map((poke, index) => {
            if(poke.id == id) {
                targetPokemonIndex = index
            }
        })
        localPokemons.splice(targetPokemonIndex,1)
        localStorage.setItem("myPokemons", JSON.stringify(localPokemons))
    }

    const pokemonTypesEle = currentPokemon.types.map((type, index) => {
        return (<span key={index} className={type.type.name}>{type.type.name}</span>)
    })
    const pokemonAbilitiesEle = currentPokemon.abilities.map((ability, index) => {
        return (<span key={index} className={ability.ability.name}>{(ability.ability.name).replace(/-/g, " ")}</span>)
    })
    const pokemonStatsEle = currentPokemon.stats.map((stat, index) => {
        return (<div key={index}><span>{stat.stat.name}: </span><span>{stat.base_stat}</span></div>)
    })
    // console.log("all extra data set")

    const search = location.state?.search || ""
    const type = location.state?.type || "all"

    return (
        <div className="details-container">
            <Link to={`..${search}`} relative="path" className="back-btn">
            &larr; Back to {type} Pokemon
            </Link>
            <div className="pokemon-details">
                <div className="pokemon-info">
                    <div className="image-part">
                        <img className="detail-front-img" src={currentPokemon.sprites.other["official-artwork"]["front_default"]} alt="" />
                        <div className="type">
                            {pokemonTypesEle}
                        </div>
                    </div>
                    <div className="info-part">
                        {/* set the first letter to uppercase and replace - with a space */}
                        <h3 className="detail-name">{(currentPokemon.name.charAt(0).toUpperCase() + currentPokemon.name.slice(1)).replace(/-/g, " ")}</h3>
                        <div className="attributes">
                            <p><b>Star: </b><img className="star-img" src="../assets/images/star-solid.svg" alt="" /></p>
                            <p><b>ID: </b>{currentPokemon.id}</p>
                            <p><b>Height: </b>{currentPokemon.height}</p>
                            <p><b>Weight: </b>{currentPokemon.weight}</p>
                            <p><b>You have: </b>{currentPokemon.num}</p>
                        </div>
                        <div className="abilities">
                            {pokemonAbilitiesEle}
                        </div>
                    </div>
                </div>
                <div className="stats">
                    {pokemonStatsEle}
                </div>
                <Link to="../" relative="path">
                    <button className="release-btn" onClick={() => {removePokemon(pokemonId)}}>Release</button>
                </Link>
            </div>
            
        </div>
        
    )
}