import React from "react"
import { Link } from "react-router-dom"
import PokemonBriefInfo from "../components/PokemonBriefInfo"

import { parseUrl, washData, disableCatchBtn } from "../api/api"

export default function Home() {
    const [pokemons, setPokemons] = React.useState([])
    const [fetchingOffset, setFetchingOffset] = React.useState(Math.floor(Math.random() * 1292))
    const [isLoading, setIsLoading] = React.useState(false)
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${fetchingOffset}&limit=10`

    const localPokemons = React.useRef(JSON.parse(localStorage.getItem("myPokemon") || "[]" ))

    React.useEffect(() => {
        async function loadPokemons() {
            setIsLoading(true)
            const res = await fetch(url)
            if (!res.ok) {
                throw {
                    message: "Failed to fetch data"
                }
            }
            const data = await res.json()
            console.log("Data fetched:", data)
            setPokemons(washData(data.results))
            console.log("Pokemons Data after washing", pokemons)
            setIsLoading(false)
        }
        loadPokemons()
    }, [fetchingOffset])

    function refreshPokemons() {
        setFetchingOffset(Math.floor(Math.random() * 1292))
    }

    function catchPokemon(e) {
        if (Math.random() < 0.5) {
            disableCatchBtn(e, false)
        } else {
            let currentPokemonDetail = []
            e.target.textContent = "Capturing..."
            async function getPokemonDetail() {
                try {
                    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${e.target.dataset.id}/`)
                    const data = await res.json()
                    currentPokemonDetail = data
                    console.log("detail data:", currentPokemonDetail)
                } catch (err) {
                    alert(err)
                    disableCatchBtn(e, false)
                } finally {
                    // check if this pokemon is already in the list
                    if (localPokemons.current.length > 0) {
                        for (const localPokemon of localPokemons.current) {
                            if (localPokemon.id === currentPokemonDetail.id && localPokemon.star === 1) {
                                localPokemon.num++
                                console.log("update a pokemon")
                                return
                            }
                        }
                        localPokemons.current.push({
                            ...currentPokemonDetail,
                            num: 1,
                            star: 1
                        })
                        console.log("push a new pokemon")
                    } else {
                        localPokemons.current.push({
                            ...currentPokemonDetail,
                            num: 1,
                            star: 1
                        })
                        console.log("push the first pokemon")
                    }
                    // sort pokemons by index
                    localPokemons.current.sort((a, b) => {
                        return a.id - b.id
                    })
                    localStorage.setItem("myPokemon", JSON.stringify(localPokemons.current))
                    console.log("localPokemons:", localPokemons)
                    disableCatchBtn(e, true)
                }
            }
            getPokemonDetail()
        }
        
    }

    const pokemonsElements = pokemons.map(pokemon => (
        <PokemonBriefInfo key={pokemon.index} url={pokemon.url} name={(pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)).replace(/-/g, " ")} index={pokemon.index} catchPokemon={catchPokemon} />
    ))

    return (
        <div className="home-container">
            <h1>Some Pokemon are visiting your home</h1>
            <p>Click "Catch" to catch them.</p>
            {isLoading ? <h3>Loading Pokemon Data, Hold on...</h3> : 
            <div className="pokemon-wrapper">
                {pokemonsElements}
            </div>}
            <div className="home-btn-group">
                <button className="home-refresh-btn" onClick={refreshPokemons}>Refresh</button>
                <Link to="/mypokemons">
                    Check my Pokemon
                </Link>
            </div>
        </div>
    )
}