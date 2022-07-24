import logo from './images/logo.png';
import { NavLink } from "react-router-dom";
import "./styles.css";


function Header(){
    return(
    <header className="flex">
        <div className="divLogo">
            <img src={logo} className="logo"></img>
        </div>
        <nav className="navbar">
            <NavLink activeclassname="active" to="/Dashboard">
                Dashboard
            </NavLink>
            <NavLink activeclassname="active" to="/Register">
                Register
            </NavLink>
            <NavLink activeclassname="active" to="/Login">
                Login
            </NavLink>
        </nav>
    </header>
    )
}

export default Header