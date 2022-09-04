import { React, useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Switch,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import Header from "./pages/Header"
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'

const App = () => {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route exact path="/Dashboard" element={<Dashboard />}/>
          <Route path="/Login" element={<Login />}/>
          <Route path="/Register" element={<Register />}/>
        </Routes>
      </Router>
    </>
)
}

export default App;
