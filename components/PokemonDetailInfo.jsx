import React from "react";
import { Link } from "react-router-dom"

export default function PokemonDetailInfo(props) {

    return (
        <div key={props.key} className="my-pokemon-unit">
            <Link 
                to={props.link} 
                state={props.state}
            >
                {props.front_default ? <div><img src={props.front_default} /></div> : <div><img src={props.url} /></div>}
                <h3>{props.name}</h3>
            </Link>
        </div>
    )
}