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
            <nav>
                <NavLink to="home" >Home</NavLink>
            </nav>
        </header>
    )
}