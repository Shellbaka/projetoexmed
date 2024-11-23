import React, { useState } from 'react';
import './EsqueceuSenha.css';

function EsqueceuSenha() {
  const [email, setEmail] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [erro, setErro] = useState('');
  const [emailEnviado, setEmailEnviado] = useState(false); 

  const handleSubmit = (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    if (!email) {
      setErro('Por favor, insira seu e-mail.');
      return;
    }

    console.log('Email para redefinir senha:', email);
    
    setSucesso('Instruções para redefinir a senha foram enviadas para seu e-mail.');
    setEmailEnviado(true); 
    setEmail('');
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Redefinir Senha</h2>
        {!emailEnviado && ( 
          <p>Insira seu e-mail para receber instruções de redefinição de senha.</p>
        )}
        {erro && <p className="error-message">{erro}</p>}
        {sucesso && (
          <span className="success-message">{sucesso}</span>
        )}
        {!emailEnviado && ( 
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
