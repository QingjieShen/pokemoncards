import React from "react"
import { Link } from "react-router-dom"

export default function Home() {
    const [pokemons, setPokemons] = React.useState([])
    // const [pokemonsElements, setPokemonsElements] = React.useState()
    const [fetchingOffset, setFetchingOffset] = React.useState(Math.floor(Math.random() * 1292))
    const [isLoading, setIsLoading] = React.useState(false)
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${fetchingOffset}&limit=10`

    const localPokemons = React.useRef(JSON.parse(localStorage.getItem("myPokemons") || "[]" ))
    
    console.log(localPokemons)

    React.useEffect(() => {
        async function loadPokemons() {
            setIsLoading(true)
            try {
                const res = await fetch(url)
                const data = await res.json()
                console.log("Data fetched:", data)
                let detail = []
                data.results.map(poke => {
                    async function fetchDetails() {
                        const response = await fetch(poke.url)
                        const pokeDetail = await response.json()
                        console.log("pokeDetail fetched", pokeDetail)
                        detail.push(pokeDetail)
                        console.log("detail after push", detail)
                        setPokemons(detail)
                        console.log("Pokemon detail Data", pokemons)
                    }
                    fetchDetails()
                })
            } catch (err) {
                alert(err)
            }
        }
        loadPokemons()
        setIsLoading(false)
    }, [fetchingOffset])

    function refreshPokemons() {
        setFetchingOffset(Math.floor(Math.random() * 1292))
    }

    function getOriginalPokemon(id) {
        let currentPokemon = null
        pokemons.map(pokemon => {
            if (pokemon.id === id) {
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
                if (localPokemon.id === currentPokemon.id && localPokemon.star === 1) {
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
            return a.id - b.id
        })
        localStorage.setItem("myPokemons", JSON.stringify(localPokemons.current))
        console.log("localPokemons:", localPokemons)
    }
/*     React.useEffect(() => {
        setPokemonsElements(pokemons.map(pokemon => (
            <div key={pokemon.id} className="pokemon-unit">
                <img src={pokemon.sprites.other.showdown.front_default} />
                <h3>{pokemon.name}</h3>
                <button data-id={pokemon.id} onClick={catchPokemon} className="catch-button">Catch</button>
            </div>
        )))
    }, [pokemons]) */
    const pokemonsElements = pokemons.map(pokemon => { return (
        <div key={pokemon.id} className="pokemon-unit">
            <div className="pokemon-unit-img-container">
                <img src={pokemon.sprites.other.showdown.front_default} />
            </div>
            <h3>{pokemon.name}</h3>
            <button data-id={pokemon.id} onClick={catchPokemon} className="catch-button">Catch</button>
        </div>
    )})
    
    console.log("pokemonsElements set up. here is the pokemonsElements", pokemonsElements)

    return (
        <div className="home-container">
            <h1>Some Pokemon are visiting your home</h1>
            <p>Click "Catch" to catch them.</p>
            {isLoading ? <h3>Loading Pokemons Data, Hold on...</h3> : 
            <div className="pokemon-wrapper">
                {pokemonsElements}
            </div>}
            {console.log("Actually inserted pokemon elements", pokemonsElements)}
            <div className="home-btn-group">
                <button className="home-refresh-btn" onClick={refreshPokemons}>Refresh</button>
                <Link to="/mypokemons">
                Check my Pokemon
                </Link>
            </div>
        </div>
    )
}