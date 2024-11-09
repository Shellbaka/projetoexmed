import React, { useState } from 'react';
import './CadColetores.css';

function CadastroColetores() {
  const [nome, setNome] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [vinculacaoCentro, setVinculacaoCentro] = useState('');
  const [coletores, setColetores] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const novoColetor = { nome, especialidade, vinculacaoCentro };
    setColetores([...coletores, novoColetor]);
    setNome('');
    setEspecialidade('');
    setVinculacaoCentro('');
  };

  return (
    <div className="app">
      <div className="exmed-logo">
        <img src="public/logoexmed.svg" alt="imglog" className="imglog" />
      </div>

      <div className="form-list-container">
        <div className="form-container">
          <h2>Cadastro de Coletores</h2>
          <p>Seja um novo coletor Exmed</p>
          <hr className="title-line" />

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="input-standard"
              placeholder="Nome do Coletor"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
            <input
              type="text"
              className="input-standard"
              placeholder="Especialidade"
              value={especialidade}
              onChange={(e) => setEspecialidade(e.target.value)}
              required
            />
            <input
              type="text"
              className="input-standard"
              placeholder="Vinculação Centro de Diagnóstico"
              value={vinculacaoCentro}
              onChange={(e) => setVinculacaoCentro(e.target.value)}
              required
            />
            <button type="submit" className="submit-btn">Cadastre-se</button>
          </form>
        </div>

        {/* Listagem de Coletores ao Lado */}
        <div className="collectors-list">
          <h3>Coletores Registrados</h3>
          <ul>
            {coletores.map((coletor, index) => (
              <li key={index} className="collector-item">
                <span><strong>Nome:</strong> {coletor.nome} </span>
                <span><strong>Especialidade:</strong> {coletor.especialidade} </span>
                <span><strong>Vinculação Centro:</strong> {coletor.vinculacaoCentro}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CadastroColetores;