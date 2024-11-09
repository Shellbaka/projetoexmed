
import React from 'react';
import './ListaColetores.css';

function ListaColetores({ coletores }) {
  return (
    <div className="app">
      {/* Logo da Exmed sempre visível no topo */}
      <div className="exmed-logo">
        <img src="public/logoexmed.svg" alt="Exmed Logo" className="imglog" />
      </div>

      <div className="list-container">
        <h2>Coletores Registrados</h2>
        <hr className="title-line" />

        {/* Mensagem de lista vazia ou exibição dos coletores */}
        {coletores.length === 0 ? (
          <p className="empty-message">Nenhum coletor registrado ainda.</p>
        ) : (
          <ul className="collectors-list">
            {coletores.map((coletor, index) => (
              <li key={index} className="collector-item">
                <span><strong>Nome:</strong> {coletor.nome} </span>
                <span><strong>Especialidade:</strong> {coletor.especialidade} </span>
                <span><strong>Vinculação Centro:</strong> {coletor.vinculacaoCentro}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ListaColetores;
