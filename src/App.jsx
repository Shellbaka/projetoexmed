import { useState } from 'react'
import './App.css'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Home from './pages/home/Home'
import Exame from './pages/Exames/Exame'
import AgendarExame from './pages/Exames/AgendarExame'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <AgendarExame></AgendarExame>
      <Footer/>
    </>
  )
}

export default App