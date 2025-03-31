import { useState } from 'react'

import Home from './components/Home'
import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './AppContext'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AppProvider>
        <Routes>
          <Route element={<Home />} path='/' />
        </Routes>
      </AppProvider>
    </>
  )
}

export default App
