import { useState } from 'react'
import './App.css'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Home from './pages/home/Home'
import Exame from './pages/Exames/Exame'
import AgendarExame from './pages/Exames/AgendarExame'
import BuscarResultado from './pages/Exames/BuscarResultado'
import Cadastro from './pages/Cadastro/Cadastro'
import Cadastro2 from './pages/Cadastro2/Cadastro2'
import Loguin from './pages/Loguin/Loguin'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <Loguin/>
      <Footer/>
      
    </>
  )
}

export default App