import React, { useState } from 'react';
import './EsqueceuSenha.css';

function EsqueceuSenha() {
  const [email, setEmail] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [erro, setErro] = useState('');
  const [emailEnviado, setEmailEnviado] = useState(false); // Para controlar a visibilidade do campo de e-mail

  const handleSubmit = (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    // Exemplo de validação simples
    if (!email) {
      setErro('Por favor, insira seu e-mail.');
      return;
    }

    // Aqui você pode adicionar a lógica para enviar o e-mail de redefinição
    console.log('Email para redefinir senha:', email);
    
    // Simula o envio de e-mail
    setSucesso('Instruções para redefinir a senha foram enviadas para seu e-mail.');
    setEmailEnviado(true); // Oculta o campo de e-mail após o envio
    setEmail(''); // Limpa o campo de e-mail após o envio
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Redefinir Senha</h2>
        {!emailEnviado && ( // Exibe a mensagem apenas se o e-mail não foi enviado
          <p>Insira seu e-mail para receber instruções de redefinição de senha.</p>
        )}
        {erro && <p className="error-message">{erro}</p>}
        {sucesso && (
          <span className="success-message">{sucesso}</span>
        )}
        {!emailEnviado && ( // Verifica se o e-mail não foi enviado
          <form onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="E-mail" 
              className="input-field" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />
            <button type="submit" className="btn-primary">Enviar</button>
          </form>
        )}
        
        <p className="back-to-login"><a href="#">Voltar ao Login</a></p>
      </div>
    </div>
  );
}

export default EsqueceuSenha;
