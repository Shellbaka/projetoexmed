import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
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
import Agendamentos from './pages/Agendamentos/Agendamentos';
import AceitaAtendimentos from './pages/Agendamentos/AceitaAtendimentos';

function App() {
  const [atendimentosSalvos, setAtendimentosSalvos] = useState([]);

  const adicionarAtendido = (novoAtendimento) => {
    setAtendimentosSalvos((prev) => [...prev, novoAtendimento]);
  };

  return (
    <Router>
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exame" element={<TextNav />} />
          <Route path="/textnav" element={<TextNav />} />
          <Route path="/buscar-resultado" element={<BuscarExames />} />
          <Route path="/cadcoletores" element={<CadColetores />} />
          <Route path="/cadclientes" element={<CadClientes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/resultado" element={<BuscarExames />} />
          <Route
            path="/atendidos"
            element={<Atendidos atendimentosSalvos={atendimentosSalvos} />}
          />
          <Route
            path="/agendamentos"
            element={<Agendamentos adicionarAtendido={adicionarAtendido} />}
          />
          <Route
            path="/aceita-atendimentos" // Nova rota
            element={<AceitaAtendimentos />}
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
