import React from 'react';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src="public/logoexmed.svg" alt="Logo" />
      </div>
      <nav className="nav">
        <a href="#home">Home</a>
        <a href="#exames">Exames</a>
        <a href="#sobre-nos">Sobre Nós</a>
        <a href="#central-de-ajuda">Central de Ajuda</a>
        <a href="#minha-conta">Minha Conta</a>
      </nav>
    </header>
  );
};