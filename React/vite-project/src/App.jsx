import { useState } from 'react'
import { Route,BrowserRouter,Routes } from 'react-router-dom'
import './App.css'
//import 'antd/dist/reset.css';
import Home from './components/Home'
import Login from './components/Utilisateur/Login'
import UserPage from './components/Utilisateur/UserPage'

import Layout from './components/Utilisateur/layout'
import Signin from "./components/Utilisateur/signin"
import WelcomePage from './components/Utilisateur/welcome'
import Materiels from './components/Utilisateur/materiels'
import Maintenance from './components/Utilisateur/maintenance'
import Apropos from './components/Utilisateur/apropos'
import Signup from './components/Utilisateur/signup'
import PrivateRoute from './Service/PrivateRoute'


function App() {
 
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Signin />} />
                <Route element={<PrivateRoute requiredRole='Administrateur' />}>
                  <Route path='/Admin' element={<Home />} />
                </Route>
                <Route path='/signup' element={<Signup/>}/>
                <Route element={<PrivateRoute requiredRole='Technicien' />}>
                <Route path='/user' element={<Layout />}>
                    <Route path='/user/home' element={<WelcomePage />} />
                    <Route path='/user/materiel' element={<Materiels />} />
                    <Route path='/user/maintenance' element={<Maintenance/>}/>
                    <Route path='/user/apropos' element={<Apropos/>} />
                </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
