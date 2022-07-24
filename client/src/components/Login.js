import { useState } from 'react'

function Login () {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const database = 'http://localhost:3000/api/auth/login';

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
        console.log(data);

        if (data) {
            alert('Login réussi')
            const tokenKey = JSON.stringify(data.token)
            localStorage.setItem('token', tokenKey)
        }
        else{
            alert("Erreur sur identifiants/mot de passe");
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={LoginUser}>
                <label htmlFor="email">
                    <input type="email" placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}>
                    </input>
                </label>
                <label htmlFor="password">
                    <input type="password" placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}>
                    </input>
                </label>
                <input type="Submit"></input>
            </form>
        </div>
    )
};

export default Login