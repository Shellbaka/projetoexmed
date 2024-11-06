import React from 'react';
import './CadColetores.css';

function CadColetores() {
  return (
    <div className="container">
      <div className="image-section">
        <img src="https://d1k8mc291fp8hd.cloudfront.net/wp-content/uploads/2024/10/15015.jpg"
          alt="Teamwork" className="image" /> 
      </div>
      <div className="form-section">
        <h2>Criar Conta</h2>
        <p>Conecte-se à sua saúde com a Exmed.</p>
        <form>
          <input type="email" placeholder="Digite seu Email" className="input-field" required />
          <input type="password" placeholder="Digite sua Senha" className="input-field" required />
          <button type="submit" className="btn-primary">Entrar</button>
          <p className="forgot-password"><a href="#">Esqueceu a senha?</a></p>
          {/* Linha de separação */}
          <div className="separator"></div>
          
          <button type="button" className="btn-secondary">Cadastre-se</button>
        </form>
      </div>
    </div>
  );
}

export default CadColetores;
          
         