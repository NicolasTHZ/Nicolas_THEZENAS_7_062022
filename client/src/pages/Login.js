import { useState } from 'react'
import { useNavigate, NavLink } from "react-router-dom";
import logo from "../images/logosanstexte.png"
import groupomaniatexte from "../images/nomlogo.png"
import "./styles.css"

function Login () {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const database = 'http://localhost:3000/api/auth/login';

    const navigate = useNavigate();

    async function LoginUser(event) {
        event.preventDefault();



        const response = await fetch(database, {
            method: 'POST' ,
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              password,
            }),
          })
          

        const data = await response.json()
        console.log(data.error);

        if (!data.error) {
            alert('Login réussi');
            const tokenKey = JSON.stringify(data);
            localStorage.setItem('token', tokenKey);
            navigate("../", { replace: true });
        }
        else{
            alert("Erreur sur identifiants/mot de passe");
        }

    };

    return (
        <div>
            <nav className="navbar">
                <div className="logo-container">
                     <img src={logo} alt="logo sans texte" className="logo"></img>
                </div>
                <NavLink activeclassname="active" className="link-home" to="/Dashboard">
                    <img src={groupomaniatexte} alt="groupomania" className="groupomaniatexte"></img>
                </NavLink>
                <div className="nav-login">
                    <NavLink className="nav-button" activeclassname="active" to="/Register">
                        S'enregistrer
                    </NavLink>
                </div>
            </nav>
                <form className="post-card" onSubmit={LoginUser}>
                    <h1>Se connecter sur Groupomania</h1>
                    <h3>votre adresse e-mail</h3>
                    <div>
                        <label htmlFor="email">
                            <input className="field-input" type="email" placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}>
                            </input>
                        </label>
                    </div>
                    <div>
                    <h3>votre mot de passe</h3>
                        <label htmlFor="password">
                            <input className="field-input" type="password" placeholder="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}>
                            </input>
                        </label>
                    </div>
                    <input className="button-log" type="Submit" value="Se Connecter"></input>
                </form>
            </div>
    )
};

export default Login