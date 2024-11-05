import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css';

function ForgotPasswordPage() {
    const [cpf, setCpf] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/auth/forgot-password', { cpf });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Erro ao solicitar recuperação de senha');
        }
    };

    return (
        <div className="forgot-password-page">
            <div className="forgot-password-card">
                <p className="forgot-password-description">
                    Insira seu CPF para solicitar a recuperação de senha.
                </p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Digite seu CPF"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        className="forgot-password-input"
                    />
                    <button type="submit" className="forgot-password-button">Enviar</button>
                </form>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
}

export default ForgotPasswordPage;
