import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import './Header.css';
import { AuthContext } from '../../AuthContext';

export default function Header() {
  const { userType, setUserType } = useContext(AuthContext);
  const [userName, setUserName] = useState(''); // Estado para o nome do usuário
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserType(decodedToken.userType);

        // Faz a requisição para buscar o nome do usuário
        fetch('http://localhost:3000/user-data', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Erro ao buscar os dados do usuário.');
            }
            return response.json();
          })
          .then((data) => {
            if (data.Nome_Cliente) {
              setUserName(data.Nome_Cliente);
            } else {
              setUserName('Usuário');
            }
          })
          .catch((error) => {
            console.error('Erro ao buscar os dados do usuário:', error);
          });
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        setUserType(null); // Garante que o estado seja ajustado
      }
    }
  }, [setUserType]);

  const handleLogout = () => {
    localStorage.clear();
    setUserType(null);
    setUserName(''); // Reseta o nome do usuário ao sair
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
        {userType && (
          <div className="user-info">
            <p>{userType === 'cliente' ? 'Cliente' : 'Funcionário'}</p>
            <p>{userName}</p>
          </div>
        )}
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
