import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Home from './pages/Home'
import ActivityFeed from './pages/ActivityFeed'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/feeds' element={<ActivityFeed/>}/>
     </Routes>
    </>
  )
}

export default App
