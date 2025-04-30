import { useState } from 'react'
import { Route,BrowserRouter,Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'


function App() {
  const [count, setCount] = useState(0)

  return (
<BrowserRouter>
    <Routes>
        <Route path='/' element={<Home />} />
    </Routes>
</BrowserRouter>
  )
}

export default App
