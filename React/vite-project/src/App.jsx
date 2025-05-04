import { useState } from 'react'
import { Route,BrowserRouter,Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Login from './components/Utilisateur/Login'
import UserPage from './components/Utilisateur/UserPage'


function App() {
  const [count, setCount] = useState(0)

  return (
<BrowserRouter>
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/User' element={<UserPage />} />
    </Routes>
</BrowserRouter>
  )
}

export default App
