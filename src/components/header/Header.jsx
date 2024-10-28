import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src="public/logoexmed.svg" alt="Logo" />
      </div>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/exame">Exames</Link>
        <Link to="/sobre-nos">Sobre Nós</Link>
        <Link to="/central-de-ajuda">Central de Ajuda</Link>
        <Link to="/minha-conta">Minha Conta</Link>
      </nav>
    </header>
  );
}
