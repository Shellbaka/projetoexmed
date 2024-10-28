import React, { useState } from 'react';
import './Cadastro.css';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Este campo é obrigatório';
    if (!formData.password) newErrors.password = 'Este campo é obrigatório';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(formData);
      // Aqui você pode chamar uma função para enviar os dados do formulário
    }
  };

  return (
    <div className="page-container">
      {/* Imagem na metade esquerda */}
      <div className="image-section">
        <img
          src="https://d1k8mc291fp8hd.cloudfront.net/wp-content/uploads/2024/10/15015.jpg"
          alt="Imagem de fundo"
          className="background-image"
        />
      </div>

      {/* Formulário de Login na metade direita */}
      <div className="login-section">
        <div className="login-card">
          <h1 className="login-title">Criar Conta</h1>
          <p className="login-description">Cuidar da sua saúde nunca foi tão fácil.</p>
          
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="email"
              placeholder="Digite seu Email"
              value={formData.email}
              onChange={handleChange}
              className={`login-input ${errors.email ? 'input-error' : ''}`} // Adiciona classe de erro
              aria-label="Email"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
            
            <input
              type="password"
              name="password"
              placeholder="Senha"
              value={formData.password}
              onChange={handleChange}
              className={`login-input ${errors.password ? 'input-error' : ''}`} // Adiciona classe de erro
              aria-label="Senha"
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
            
            <button type="submit" className="login-button login-button-primary" disabled={Object.keys(errors).length > 0}>
              Entrar
            </button>
            
            
            <div className="forgot-password">
              <a href="/">Esqueceu a senha?</a>
            </div>
            
            <button type="button" className="login-button login-button-secondary" onClick={() => { /* Adicione a lógica de redirecionamento aqui */ }}>
              Cadastre-se
            </button>
          </form>
          
        </div>
      </div>
    </div>
  );
}
