import React, { useState } from 'react';
import './Header.css';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="logoexmed.svg" alt="Logo" />
      </div>
<<<<<<< HEAD
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/exame">Exames</Link>
        <Link to="/lista-coletores">Lista de Coletores</Link>
        <Link to="/CadClientes">Cadastro</Link>
        <Link to="/login">Login</Link>
=======
      <div className="hamburger" onClick={toggleMenu}>
        ☰
      </div>
      <nav className={`nav ${isOpen ? 'show' : ''}`}>
        <a href="/">Home</a>
        <a href="/exame">Exames</a>
        {/* <a href="/sobre-nos">Sobre Nós</a> */}
        {/* <a href="/central-de-ajuda">Central de Ajuda</a>*/}
        <a href="/CadClientes">Cadastro</a>
        <a href="/login">Login</a>
        <a href="/CadColetores">Coletores</a>
        {/* <a href="/Entrar">Entrar</a>*/}
        {/* <a href="/lista-coletores">Lista de Coletores</a>*/}
>>>>>>> 53968adc8cc75dfbb0cafdc86e2528818b0bc333
      </nav>
    </header>
  );
}
