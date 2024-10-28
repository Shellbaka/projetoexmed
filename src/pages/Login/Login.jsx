import React, { useState } from 'react';
import './Login.css';

export default function LoginPage() {
  const [formData, setFormData] = useState({ cpf: '', password: '' });
  const [errors, setErrors] = useState({});

  const formatCPF = (value) => {
    // Remove caracteres não numéricos
    const digits = value.replace(/\D/g, '');

    // Aplica a formatação
    const formatted = digits
      .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após os 3 primeiros dígitos
      .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após os próximos 3 dígitos
      .replace(/(\d{3})(\d)/, '$1-$2'); // Adiciona hífen antes dos últimos 2 dígitos

    return formatted.length > 14 ? formatted.slice(0, 14) : formatted; // Limita a 14 caracteres
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'cpf') {
      const formattedValue = formatCPF(value);
      setFormData({ ...formData, [name]: formattedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.cpf) newErrors.cpf = 'Este campo é obrigatório';
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
        .
       </p> 
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="cpf"
            placeholder="Digite seu CPF"
            value={formData.cpf}
            onChange={handleChange}
            className="login-input"
            maxLength="14" // Limita a entrada a 14 caracteres para o CPF formatado
          />
          {errors.cpf && <span className="error-message">{errors.cpf}</span>}
          
          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
            className="login-input"
            maxLength="8" // Limita a entrada a 8 caracteres para a senha
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
