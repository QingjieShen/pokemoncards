import React from "react";
import { Children } from "react";

export default function PokemonBriefInof(props) {

    return (
        <div key={props.key} className="pokemon-unit">
            <div className="pokemon-unit-img-container">
                {props.url? <img src={props.url}/> : <img src="../assets/images/circle-question-regular.svg" />}
            </div>
            <h3>{props.name}</h3>
            <button data-id={props.index} onClick={props.catchPokemon} className="catch-button">Catch</button>
        </div>
    )
}