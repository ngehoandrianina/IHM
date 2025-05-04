import { useState } from 'react'
import { Route,BrowserRouter,Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Layout from './components/Utilisateur/layout'
import Signin from "./components/Utilisateur/signin"
import WelcomePage from './components/Utilisateur/welcome'
import Materiels from './components/Utilisateur/materiels'
import Apropos from './components/Utilisateur/apropos'
import Signup from './components/Utilisateur/signup'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Signin />} />
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/user' element={<Layout />}>
                <Route index element={<WelcomePage />} />
                <Route path='/user/materiel' element={<Materiels />} />
                <Route path='/user/apropos' element={<Apropos/>} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
