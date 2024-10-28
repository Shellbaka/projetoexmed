import { useState } from 'react'
import './App.css'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Home from './pages/home/Home'
import Exame from './pages/Exames/Exame'
import AgendarExame from './pages/Exames/AgendarExame'
import BuscarResultado from './pages/Exames/BuscarResultado'
import Cadastro from './pages/Cadastro/Cadastro'
import Login from './pages/Login/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header/>
      <div className="main-content">

     <BuscarResultado/>
      </div>
      <Footer/>
    </>
  )
}

export default App