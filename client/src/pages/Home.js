import { useState } from 'react'
import { useNavigaten, NavLink } from "react-router-dom";

function Home ()  {
    return (
        <>
            <nav className="navbar">
                <NavLink activeclassname="active" to="/Register">
                    Register
                </NavLink>
                <NavLink activeclassname="active" to="/Login">
                    Login
                </NavLink>
            </nav>
        </>
    )
}

export default Home