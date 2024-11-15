import React, { useState } from 'react';
import './Cadastro.css';
import CadClientes from './CadClientes';
import CadColetores from './CadColetores';

function Cadastro() {
    const [tipo, setTipo] = useState('cliente');

    return (
        <div className="cadastro-container">
            <div className="opcoes-cadastro">
                <button
                    className={`btn-opcao ${tipo === 'cliente' ? 'ativo' : ''}`}
                    onClick={() => setTipo('cliente')}
                >
                    Cadastro de Cliente
                </button>
                <button
                    className={`btn-opcao ${tipo === 'coletor' ? 'ativo' : ''}`}
                    onClick={() => setTipo('coletor')}
                >
                    Cadastro de Coletor
                </button>
            </div>
            <div className="formulario-cadastro">
                {tipo === 'cliente' ? <CadClientes /> : <CadColetores />}
            </div>
        </div>
    );
}

export default Cadastro;
