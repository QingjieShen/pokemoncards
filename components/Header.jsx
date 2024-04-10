import React from "react";
import { Link, NavLink } from "react-router-dom"

export default function Header() {
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    return (
        <header>
            <nav className="headerNav">
                <NavLink to="/" style={({isActive}) => isActive ? activeStyles : null}>Home</NavLink>
                <NavLink to="mypokemons" style={({isActive}) => isActive ? activeStyles : null}>My Pokemons</NavLink>
            </nav>
        </header>
    )
}