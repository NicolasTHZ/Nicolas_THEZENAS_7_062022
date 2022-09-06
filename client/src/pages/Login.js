import { useState } from 'react'
import { useNavigate, NavLink } from "react-router-dom";

function Login () {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const database = 'http://localhost:3000/api/auth/login';

    const navigate = useNavigate();

    async function LoginUser(event) {
        event.preventDefault();
        console.log(email);
        console.log(password);



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
            navigate("../Dashboard", { replace: true });
        }
        else{
            alert("Erreur sur identifiants/mot de passe");
        }

    };

    return (
        <div>
            <nav className="navbar">
                <NavLink className="nav-button" activeclassname="active" to="/Register">
                    Register
                </NavLink>
                <NavLink className="nav-button" activeclassname="active" to="/Login">
                    Login
                </NavLink>
            </nav>
            <div className="post-card">
                <h1>Se connecter sur Groupomania</h1>
                <form className="flex column" onSubmit={LoginUser}>
                    <h3>votre adresse e-mail</h3>
                    <label htmlFor="email">
                        <input className="field-input" type="email" placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}>
                        </input>
                    </label>
                    <h3>votre mot de passe</h3>
                    <label htmlFor="password">
                        <input className="field-input" type="password" placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}>
                        </input>
                    </label>
                    <input className="button button-shrink" type="Submit" value="Se Connecter"></input>
                </form>
            </div>
        </div>
    )
};

export default Login