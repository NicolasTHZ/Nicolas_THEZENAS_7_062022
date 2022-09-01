import logo from '../images/logo.png';
import { useState } from 'react';
import { NavLink } from "react-router-dom";
import "./styles.css";


function Header(){
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    let tokenKey = JSON.parse(localStorage.getItem('token'));
    console.log(tokenKey);
    console.log("blabla");

    // function logout () {
    //     localStorage.clear();
    //     tokenKey = null;
    // }

    return(
    <header className="flex">
        <div className="divLogo">
            <img src={logo} className="logo" alt="logo"></img>
        </div>
        {!tokenKey ?
        <nav className="navbar">
            <NavLink activeclassname="active" to="/Register">
                Register
            </NavLink>
            <NavLink activeclassname="active" to="/Login">
                Login
            </NavLink>
        </nav>
        :
        <nav className="navbar">
            <NavLink activeclassname="active" to="/Dashboard">
                Dashboard
            </NavLink>
            <NavLink  to="/Login">
                Logout
            </NavLink>
        </nav>}
    </header>
    )
}

export default Header