import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Home from './pages/home/Home'
import Exame from './pages/Exames/Exame'
import AgendarExame from './pages/Exames/AgendarExame'
import BuscarResultado from './pages/Exames/BuscarResultado'
import Cadastro from './pages/Cadastro/Cadastro'
import Login from './pages/Login/Login'
import TextoFlex from './components/h2/TextoFlex'

function App() {
  return (
    
<Router>
      <Header />
    <Login />
      
    </Router>
  )
}

export default App
