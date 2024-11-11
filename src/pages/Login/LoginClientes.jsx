import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginClientes.css';

function LoginClientes() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [attemptCount, setAttemptCount] = useState(0);
  const maxAttempts = 4;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (attemptCount >= maxAttempts) {
      setError('');
      return;
    }

    const emailPattern = /^\d{11}@exmed\.com$/;
    if (!emailPattern.test(email)) {
      setError('E-mail deve estar no formato "CPF@exmed.com"');
      setAttemptCount((prevCount) => prevCount + 1); 
      return;
    }

    setError('');
    setAttemptCount(0);

    console.log('E-mail:', email);
    console.log('Senha:', password);
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
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="CPF@exmed.com" 
            className="input-field" 
            value={email}
            onChange={handleEmailChange}
            required 
            disabled={attemptCount >= maxAttempts} 
          />
          <input 
            type="password" 
            placeholder="Senha" 
            className="input-field" 
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
          <Link to="/criar-conta">
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