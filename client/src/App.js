import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from "./components/Header"
import Register from './components/Register'
import Login from './components/Login'
import Dashboard from './components/Dashboard'

const App = () => {
  return (
    <>
      <Router>
        < Header/>
        <Routes>
          <Route exact path="/Dashboard" element={<Dashboard />}/>
          <Route path="/Login" element={<Login />}/>
          <Route path="/Register" element={<Register />}/>
        </Routes>
      </Router>
    </>
)
}

export default App;
