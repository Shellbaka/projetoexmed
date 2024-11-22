import React, { useEffect, useState } from 'react';
import './ListaColetores.css';
import axios from 'axios';

function ListaColetores({ coletores }) {
  const [compras, setCompras] = useState([]);

  /* Busca as compras pendentes */
  useEffect(() => {
    axios.get('/api/purchases')
      .then((response) => {
        setCompras(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar compras:', error);
      });
  }, []);

  /* Atualiza o status de uma compra */
  const handleStatusChange = (purchaseId, status) => {
    axios.post('/updatePurchaseStatus', { purchaseId, status })
      .then((response) => {
        alert(response.data.message);
        setCompras((prevCompras) =>
          prevCompras.map((compra) =>
            compra.ID_Compra === purchaseId ? { ...compra, Status: status } : compra
          )
        );
      })
      .catch((error) => {
        console.error('Erro ao atualizar status:', error);
      });
  };

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

      <h2>Compras Pendentes</h2>
      {compras.length === 0 ? (
        <p>Nenhuma compra pendente.</p>
      ) : (
        <ul>
          {compras.map((compra) => (
            <li key={compra.ID_Compra}>
              <strong>Compra:</strong> {compra.Nome} <br />
              <strong>Status:</strong> {compra.Status} <br />
              <button onClick={() => handleStatusChange(compra.ID_Compra, 'atendido')}>
                Atender
              </button>
              <button onClick={() => handleStatusChange(compra.ID_Compra, 'rejeitado')}>
                Rejeitar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListaColetores;
