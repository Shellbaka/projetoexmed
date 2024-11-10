import React from 'react';
import './ListaColetores.css';

function ListaColetores({ coletores }) {
  return (
    <div className="list-container">
      <h2>Coletores Registrados</h2>
      {coletores.length === 0 ? (
        <p>Nenhum coletor registrado ainda.</p>
      ) : (
        <ul>
          {coletores.map((coletor, index) => (
            <li key={index}>
              <strong>Nome:</strong> {coletor.nome} <br />
              <strong>Especialidade:</strong> {coletor.especialidade} <br />
              <strong>Vinculação Centro:</strong> {coletor.vinculacaoCentro}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListaColetores;
