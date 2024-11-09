import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginClientes.css';

function LoginClientes() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Verifica se o e-mail está exatamente no formato "11digitos@exmed.com"
    const emailPattern = /^\d{11}@exmed\.com$/;
    if (!emailPattern.test(email)) {
      setError('E-mail deve estar no formato "CPF@exmed.com"');
      return;
    }
    
    // Limpa a mensagem de erro se o formato estiver correto
    setError('');

    // Aqui você pode adicionar a lógica de autenticação, como enviar para uma API
    console.log('E-mail:', email);
    console.log('Senha:', password);
  };

  return (
    <div className="container">
      <div className="image-section">
        <img src="LoginClientes.jpg" alt="Teamwork" className="image" /> 
      </div>
      <div className="form-section">
        <h2>Faça seu Login</h2>
        <p>Conecte-se à sua saúde com a Exmed.</p>
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="CPF@exmed.com" 
            className="input-field" 
            value={email}
            onChange={handleEmailChange}
            required 
          />
          <input 
            type="password" 
            placeholder="Senha" 
            className="input-field" 
            value={password}
            onChange={handlePasswordChange}
            maxLength="8" 
            required 
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="btn-primary">Entrar</button>
          <p className="forgot-password">
            <Link to="/esqueceu-senha">Esqueceu a senha?</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginClientes;
