import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import BuscarExames from './pages/Exames/BuscarExames';
import CadClientes from './pages/Clientes/CadClientes';
import CadColetores from './pages/Coletores/CadColetores';
import Login from './pages/Login/LoginClientes';
import TextNav from './pages/Exames/TextNav';
import Atendidos from './pages/Agendamentos/Atendidos';

function App() {
  return (
    <Router>
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exame" element={<TextNav/>} />
          <Route path="/textnav" element={<TextNav />} />
          <Route path="/buscar-resultado" element={<BuscarExames />} />
          <Route path="/cadcoletores" element={<CadColetores />} />
          <Route path="/cadclientes" element={<CadClientes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/resultado" element={<BuscarExames />} />
          <Route path='/Atendidos' element={<Atendidos/>}/>
          <Route path='/Resultado' element={<BuscarExames/>}/>
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
