import Home from './components/Home'
import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './AppContext'
import './App.css'

function App() {

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
