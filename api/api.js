export function parseUrl(url) {
    return url.substring(url.substring(0, url.length - 2).lastIndexOf('/') + 1, url.length - 1)
}

export function washData(data) {
    const washedData = data.map((d) => {
        return {
            ...d,
            url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${parseUrl(d.url)}.png`,
            index: parseUrl(d.url)
        }
    })
    return washedData
}

export function findPokemon(id, local) {
    let targetPokemon = null
    local.map(pokemon => {
        if (pokemon.id == id) {
            targetPokemon = pokemon
        }
    })
    return targetPokemon
}

export function disableCatchBtn(e, isSuccess) {
    e.target.disabled = true
    e.target.parentElement.className = isSuccess? "pokemon-unit-disabled" : "pokemon-unit-failed"
    e.target.textContent = isSuccess? "Capture SUCCEED" :"Capture FAILED"
}