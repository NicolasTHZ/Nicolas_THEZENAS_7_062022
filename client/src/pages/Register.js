import { useState } from 'react'
// import "./Register.css";

function Register() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const database = 'http://localhost:3000/api/auth/signup';
  
    async function registerUser(event) {
      event.preventDefault();

      console.log(name + password + email);
  
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
      console.log(data);
      if (data.ok){
        alert('Enregistrement réussi');
      }
      else{
        alert(response.error);
      }
    }
  
  
    return (
      <div className="App">
        <form onSubmit={registerUser} method="post">
          <div>
            <label htmlFor="name">
            <input type="text" className="name" id="name" placeholder="Nom"
            value={name} onChange={(e) => setName(e.target.value)}></input>
            </label>
          </div>
          <div>
            <label htmlFor="email">
            <input type="email" className="email" id="email" placeholder="Email"
            value={email} onChange={(e) => setEmail(e.target.value)}></input>
            </label>
          </div>
          <div>
            <label htmlFor="password">
            <input type="password" className="password" id="password" placeholder="Mot de passe"
            value={password} onChange={(e) => setPassword(e.target.value)}></input>
            </label>
          </div>
          <input type="submit"></input>
        </form>
      </div>
    );
  }

  export default Register