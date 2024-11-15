import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Entrar.css';

function Entrar() {
    const navigate = useNavigate();

    return (
        <div className="entrar-container">
            <div className="entrar-box">
                <h1>Bem-vindo a Exmed!</h1>
                <p>Escolha o tipo de cadastro:</p>
                <div className="entrar-opcoes">
                    <button onClick={() => navigate('/cadclientes')} className="btn-opcao">
                        Cliente
                    </button>
                    <button onClick={() => navigate('/cadcoletores')} className="btn-opcao">
                        Coletor
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Entrar;
