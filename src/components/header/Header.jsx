import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './Header.css';
import { AuthContext } from '../../AuthContext';

export default function Header() {
  const { userType, setUserType } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserType(decodedToken.userType);
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
      }
    }
  }, [setUserType]);

  const handleLogout = () => {
    localStorage.clear();
    setUserType(null);
    navigate('/');
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src="logoexmed.svg" alt="Logo" />
        </Link>
      </div>
      <nav className="nav">
        {userType === 'cliente' && (
          <>
            <Link to="/">Home</Link>
            <Link to="/exame">Exames</Link>
            <button className="nav-button" onClick={handleLogout}>
              Sair
            </button>
          </>
        )}
        {userType === 'funcionario' && (
          <>
            <Link to="/">Home</Link>
            <Link to="/CadColetores">Cadastro</Link>
            <Link to="/Atendidos">Pedidos</Link>
            <button className="nav-button" onClick={handleLogout}>
              Sair
            </button>
          </>
        )}
        {!userType && (
          <>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/CadClientes">Cadastro</Link>
          </>
        )}
      </nav>
    </header>
  );
}
