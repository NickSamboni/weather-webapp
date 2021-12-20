import React from "react"
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/pages/Login'
import Signup from './components/pages/Signup'
import Home from './components/pages/Home'
import Maps from './components/pages/Maps'

import Navbar from "./components/Navbar"
import './App.css';

function App () {
  
  return ( 
  <BrowserRouter>
   <Navbar />
    <Routes>
      <Route path='/home' exact element={<Home />} />
      <Route path='/maps' exact element={<Maps />} />
      <Route path='/login' exact element={<Login />} />
      <Route path="/signup" exact element={<Signup />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App



