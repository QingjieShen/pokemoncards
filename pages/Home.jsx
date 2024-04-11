import React from "react"
import { Link } from "react-router-dom"

export default function Home() {
    const [pokemons, setPokemons] = React.useState([])
    const [fetchingOffset, setFetchingOffset] = React.useState(Math.floor(Math.random() * 1292))
    const [isLoading, setIsLoading] = React.useState(false)
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${fetchingOffset}&limit=10`

    const localPokemons = React.useRef(JSON.parse(localStorage.getItem("myPokemons") || "[]" ))
    
    console.log(localPokemons)

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

    function parseUrl(url) {
        return url.substring(url.substring(0, url.length - 2).lastIndexOf('/') + 1, url.length - 1)
    }

    function washData(data) {
        const washedData = data.map((d) => {
            return {
                ...d,
                url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${parseUrl(d.url)}.png`,
                index: parseUrl(d.url)
            }
        })
        return washedData
    }

    function refreshPokemons() {
        setFetchingOffset(Math.floor(Math.random() * 1292))
    }

    function getOriginalPokemon(id) {
        let currentPokemon = null
        pokemons.map(pokemon => {
            if (pokemon.index === id) {
                currentPokemon = pokemon
            }
        })
        return currentPokemon
    }

    function updateCatchStatus(e) {
        e.target.disabled = true
        e.target.parentElement.className = "pokemon-unit-disabled"
        e.target.textContent = "Captured"
    }

    function catchPokemon(e) {
        // find the right pokemon by it's id.
        const currentPokemon = getOriginalPokemon(e.target.dataset.id)
        // update catch status
        updateCatchStatus(e)
        // check if this pokemon is already in the list
        if (localPokemons.current.length > 0) {
            for (const localPokemon of localPokemons.current) {
                if (localPokemon.index === currentPokemon.index && localPokemon.star === 1) {
                    localPokemon.num++
                    console.log("update a pokemon")
                    return
                }
            }
            localPokemons.current.push({
                ...currentPokemon,
                num: 1,
                star: 1
            })
            console.log("push a new pokemon")
        } else {
            localPokemons.current.push({
                ...currentPokemon,
                num: 1,
                star: 1
            })
            console.log("push the first pokemon")
        }
        // sort pokemons by index
        localPokemons.current.sort((a, b) => {
            return a.index - b.index
        })
        localStorage.setItem("myPokemons", JSON.stringify(localPokemons.current))
        console.log("localPokemons:", localPokemons)
    }

    const pokemonsElements = pokemons.map(pokemon => (
        <div key={pokemon.index} className="pokemon-unit">
            <img src={pokemon.url} />
            <h3>{pokemon.name}</h3>
            <button data-id={pokemon.index} onClick={catchPokemon} className="catch-button">Catch</button>
        </div>
    ))

    return (
        <div className="home-container">
            <h1>Some Pokemons are visiting your home</h1>
            <p>Click "Catch" to catch them.</p>
            {isLoading ? <h3>Loading Pokemons Data, Hold on...</h3> : 
            <div className="pokemon-wrapper">
                {pokemonsElements}
            </div>}
            <div className="home-btn-group">
                <button className="home-refresh-btn" onClick={refreshPokemons}>Refresh</button>
                <Link to="/mypokemons">
                Check my Pokemons
                </Link>
            </div>
        </div>
    )
}