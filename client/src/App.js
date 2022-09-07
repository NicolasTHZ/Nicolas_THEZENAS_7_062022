import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

const App = () => {

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Dashboard />}/>
          <Route path="/Login" element={<Login />}/>
          <Route path="/Register" element={<Register />}/>
        </Routes>
      </Router>
    </>
)
}

export default App;
