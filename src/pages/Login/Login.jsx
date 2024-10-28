import React, { useState } from 'react';
import './Login.css';

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
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <img src="public/logoexmed.svg" alt="imglog" className="imglog" />
        <p className="login-description">
        Cuidar da sua saúde nunca foi tão fácil.
        </p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            placeholder="Digite seu Email"
            value={formData.email}
            onChange={handleChange}
            className="login-input"
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
          
          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
            className="login-input"
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
          
          <button type="submit" className="login-button login-button-primary">Entrar</button>
          
          <div className="forgot-password">
            <a href="/">Esqueceu a senha?</a>
          </div>
          
          <button type="button" className="login-button login-button-secondary">Cadastre-se</button>
        </form>
        
      </div>
    </div>
  );
}