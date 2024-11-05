import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import Exame from './pages/Exames/Exame';
import BuscarExames from './pages/Exames/BuscarExames';
import Cadastro from './pages/Cadastro/Cadastro';
import Cadastro2 from './pages/Cadastro2/Cadastro2';
import Login from './pages/Login/Login';
import TextoFlex from './components/h2/TextoFlex';
import TextNav from './pages/Exames/TextNav';
import ForgotPasswordPage from './pages/Login/ForgotPasswordPage';

function App() {
  return (
    <Router>
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exame" element={<TextNav />} />
          <Route path="/textnav" element={<TextNav />} />
          <Route path="/buscar-resultado" element={<BuscarExames />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/cadastro2" element={<Cadastro2 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} /> {/* Nova Rota */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
