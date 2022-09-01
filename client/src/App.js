import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from "./pages/Header"
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

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
