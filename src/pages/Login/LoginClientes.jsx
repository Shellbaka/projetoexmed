import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './LoginClientes.css';

function LoginClientes() {
  const [userType, setUserType] = useState('cliente');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [attemptCount, setAttemptCount] = useState(0);
  const maxAttempts = 4;
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (attemptCount >= maxAttempts) {
      setError('Número máximo de tentativas atingido. Tente novamente mais tarde.');
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setError('Por favor, insira um e-mail válido no formato usuario@exmed.com');
      setAttemptCount((prevCount) => prevCount + 1);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/login', {
        email,
        password,
        userType,
      });

      const { token, userType: userTypeFromServer } = response.data;

      localStorage.setItem('authToken', token);

      setError('');
      setAttemptCount(0);

      if (userTypeFromServer === 'cliente') {
        navigate('/');
      } else if (userTypeFromServer === 'funcionario') {
        navigate('/');
      } else {
        setError('Erro ao determinar o tipo de usuário. Contate o suporte.');
      }
    } catch (err) {
      setError('Credenciais inválidas. Verifique seu e-mail ou senha.');
      setAttemptCount((prevCount) => prevCount + 1);
    }
  };

  const attemptsRemaining = maxAttempts - attemptCount;

  return (
    <div className="container">
      <div className="image-section">
        <img src="LoginClientes.jpg" alt="Teamwork" className="image" />
      </div>
      <div className="form-section">
        <h2>Faça seu Login</h2>
        <p>Conecte-se com sua saúde através da Exmed.</p>

        <div className="user-type-selector">
          <label>
            <input
              type="radio"
              value="cliente"
              checked={userType === 'cliente'}
              onChange={handleUserTypeChange}
            />
            Cliente
          </label>
          <label>
            <input
              type="radio"
              value="funcionario"
              checked={userType === 'funcionario'}
              onChange={handleUserTypeChange}
            />
            Funcionário
          </label>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="usuario@exmed.com"
            className="input-field"
            value={email}
            onChange={handleEmailChange}
            required
            disabled={attemptCount >= maxAttempts}
          />
          <input
            type="password"
            placeholder="Senha"
            className="input-field password-field"
            value={password}
            onChange={handlePasswordChange}
            maxLength="8"
            required
            disabled={attemptCount >= maxAttempts}
          />
          {error && attemptsRemaining > 0 && <p className="error-message">{error}</p>}
          {attemptCount > 0 && attemptsRemaining > 0 && (
            <p className="attempt-message">Tentativas restantes: {attemptsRemaining}</p>
          )}
          {attemptsRemaining === 0 && (
            <p className="error-message">Número máximo de tentativas alcançado. Tente novamente mais tarde.</p>
          )}
          <button type="submit" className="btn-primary" disabled={attemptCount >= maxAttempts}>
            Entrar
          </button>
          <p className="forgot-password">
            <Link to="/esqueceu-senha">Esqueceu a senha?</Link>
          </p>
          <div className="separator"></div>
          <Link to="/cadclientes">
            <button type="button" className="btn-secondary">
              Criar nova conta
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default LoginClientes;
