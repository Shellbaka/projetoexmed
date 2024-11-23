import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ConfirmacaoEmail.css';

function ConfirmacaoEmail() {
  const navigate = useNavigate();

  const handleGoToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="confirmacao-email-container">
      <div className="confirmacao-box">
        <h2>Confirmação de Cadastro</h2>
        <p>Verifique seu e-mail para confirmar o cadastro.</p>
        <p>Após confirmar o e-mail, clique no botão abaixo para fazer login.</p>
        <button onClick={handleGoToLogin} className="go-to-login-btn">Ir para Login</button>
      </div>
    </div>
  );
}

export default ConfirmacaoEmail;
