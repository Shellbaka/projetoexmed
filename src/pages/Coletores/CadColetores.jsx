import React, { useState } from 'react';
import './CadColetores.css';

function CadColetores({ setColetores }) {
  const [nome, setNome] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [vinculacaoCentro, setVinculacaoCentro] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const novoColetor = { nome, especialidade, vinculacaoCentro };
    setColetores((prevColetores) => [...prevColetores, novoColetor]);
    setNome('');
    setEspecialidade('');
    setVinculacaoCentro('');
  };

  return (
    <div className="form-container">
      <h2>Cadastro de Coletores</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome do Coletor"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Especialidade"
          value={especialidade}
          onChange={(e) => setEspecialidade(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Vinculação Centro de Diagnóstico"
          value={vinculacaoCentro}
          onChange={(e) => setVinculacaoCentro(e.target.value)}
          required
        />
       <button type="submit" className="submit-btn">Cadastre-se</button>

      </form>
    </div>
  );
}

export default CadColetores;
