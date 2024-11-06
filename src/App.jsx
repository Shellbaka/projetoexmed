import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import Exame from './pages/Exames/Exame';
import BuscarExames from './pages/Exames/BuscarExames';
import CadColetores from './pages/CadColetores/CadColetores';
import CadClientes from './pages/CadClientes/CadClientes';
import Login from './pages/Login/Login';
import TextoFlex from './components/h2/TextoFlex';
import TextNav from './pages/Exames/TextNav';
import ForgotPasswordPage from './pages/Login/ForgotPasswordPage'; // Adição da germaria-branch

function App() {
  return (
    <Router>
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exame" element={<Exame />} /> {/* Da main */}
          <Route path="/textnav" element={<TextNav />} /> {/* Da germaria-branch */}
          <Route path="/buscar-resultado" element={<BuscarExames />} />
          <Route path="/cadcoletores" element={<CadColetores />} />
          <Route path="/cadclientes" element={<CadClientes />} /> {/* Da germaria-branch */}
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} /> {/* Da germaria-branch */}
          <Route path="/resultado" element={<BuscarExames />} /> {/* Da main */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
