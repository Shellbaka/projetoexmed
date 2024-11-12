import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
        <img src="logoexmed.svg" alt="Logo" />
        </Link>
      </div>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/exame">Exames</Link>
        <Link to="/sobre-nos">Sobre Nós</Link>
        <Link to="/central-de-ajuda">Central de Ajuda</Link>
        <Link to="/CadClientes">Cadastro</Link>
        <Link to="/login">Login</Link>
        <Link to="/CadColetores">Coletores</Link>
        <Link to="/lista-coletores">Lista de Coletores</Link>
      </nav>
    </header>
  );
}
