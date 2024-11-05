import React, { useState } from 'react';
import './Login.css';

export default function LoginPage() {
    const [formData, setFormData] = useState({ cpf: '', password: '' });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Formatação do CPF
        if (name === 'cpf') {
            const formattedValue = value
                .replace(/\D/g, '') // Remove todos os caracteres não numéricos
                .slice(0, 11) // Limita a 11 dígitos
                .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona o primeiro ponto
                .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona o segundo ponto
                .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona o hífen

            setFormData({ ...formData, [name]: formattedValue });
        } else {
            // Limitar a senha a 8 caracteres
            const newValue = value.slice(0, 8);
            setFormData({ ...formData, [name]: newValue });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        // Validação do CPF e Senha
        if (!formData.cpf) newErrors.cpf = 'Este campo é obrigatório';
        if (!formData.password) newErrors.password = 'Este campo é obrigatório';
        if (formData.password.length > 8) newErrors.password = 'A senha deve ter no máximo 8 caracteres';
        if (formData.cpf.replace(/\D/g, '').length !== 11) newErrors.cpf = 'O CPF deve ter 11 dígitos';
        
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
            <div className="image-container">
                <img src="public/logoexmed.svg" alt="imglog" className="imglog" />
            </div>
            <div className="login-card">
                <p className="login-description">
                    Cuidar da sua saúde nunca foi tão fácil.
                </p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="cpf"
                        placeholder="Digite seu CPF"
                        value={formData.cpf}
                        onChange={handleChange}
                        className="login-input cpf-input" // Nova classe para CPF
                    />
                    {errors.cpf && <span className="error-message">{errors.cpf}</span>}
                    
                    <input
                        type="password"
                        name="password"
                        placeholder="Senha"
                        value={formData.password}
                        onChange={handleChange}
                        className="login-input password-input" // Nova classe para Senha
                    />
                    {errors.password && <span className="error-message">{errors.password}</span>}
                    
                    <button type="submit" className="login-button login-button-primary">Entrar</button>
                    
                    <div className="forgot-password">
                        <a href="/forgot-password">Esqueceu a senha?</a>
                    </div>
                    
                    <button type="button" className="login-button login-button-secondary">Cadastre-se</button>
                </form>
            </div>
        </div>
    );
}
