import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Home from './pages/home/Home'
import Exame from './pages/Exames/Exame'
import AgendarExame from './pages/Exames/AgendarExame'
import BuscarResultado from './pages/Exames/BuscarResultado'
import Cadastro from './pages/Cadastro/Cadastro'
import Cadastro2 from './pages/Cadastro2/Cadastro2'
import Login from './pages/Login/Login'
import TextoFlex from './components/h2/TextoFlex'
import TextNav from './pages/Exames/TextNav'

function App() {
  return (
   
<Router>
     
<Header />
      
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exame" element={<TextNav />} />
          <Route path="/agendar-exame" element={<AgendarExame />} />
          <Route path="/buscar-resultado" element={<BuscarResultado />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Exame />} />
          <Route path="/agendar" element={<AgendarExame />} />
          <Route path="/resultado" element={<BuscarResultado />} />
        </Routes>
       
      </div>
      <Footer />

    </Router>
  )
}

export default App
