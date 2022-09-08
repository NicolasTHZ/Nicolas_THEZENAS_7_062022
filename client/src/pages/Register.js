import { useState } from 'react'
import { useNavigate, NavLink } from "react-router-dom";
import logo from "../images/logosanstexte.png"
import groupomaniatexte from "../images/nomlogo.png"
import "./styles.css"

function Register() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const database = 'http://localhost:3000/api/auth/signup';

    const navigate = useNavigate();

    async function registerUser(event) {
      event.preventDefault();
  
      const response = await fetch(database, {
        method: 'POST' ,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })
      
      
      const data = await response.json()
      if (!data.error){
        navigate("../", { replace: true });
      }
      else{
        alert("votre adresse mail est déjà enregistré");
      }
    }
  
  
    return (
      <div className="App">
        <nav className="navbar">
          <div className="logo-container">
            <img src={logo} alt="logo sans texte" className="logo"></img>
          </div>
          <NavLink activeclassname="active" className="link-home" to="/Dashboard">
            <img src={groupomaniatexte} alt="groupomania" className="groupomaniatexte"></img>
          </NavLink>
          <div className="nav-login">
            <NavLink className="nav-button" activeclassname="active" to="/Login">
                Login
            </NavLink>
          </div>
        </nav>
        <form className="post-card" onSubmit={registerUser} method="post">
          <h2>Créer un compte</h2>
          <div>
            <h3>Votre nom</h3>
            <label htmlFor="name">
            <input type="text" className="name" id="name" placeholder="Nom"
            value={name} onChange={(e) => setName(e.target.value)}></input>
            </label>
          </div>
          <div>
            <h3>Votre adresse e-mail</h3>
            <label htmlFor="email">
            <input type="email" className="email" id="email" placeholder="Email"
            value={email} onChange={(e) => setEmail(e.target.value)}></input>
            </label>
          </div>
          <div>
            <h3>Votre mot de passe</h3>
            <label htmlFor="password">
            <input type="password" className="password" id="password" placeholder="Mot de passe"
            value={password} onChange={(e) => setPassword(e.target.value)}></input>
            </label>
          </div>
          <input className="button-log" type="submit" value="S'enregistrer"></input>
        </form>
      </div>
    );
  }

  export default Register