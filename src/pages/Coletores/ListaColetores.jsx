import React, { useEffect, useState } from 'react';
import './ListaColetores.css';

function ListaColetores({ coletores }) {
  const [compras, setCompras] = useState([]);

  /* Carregar compras do localStorage ao inicializar */
  useEffect(() => {
    const storedCompras = JSON.parse(localStorage.getItem('compras')) || [];
    setCompras(storedCompras);
  }, []);

  /* Função para adicionar uma nova compra ao localStorage */
  const addPurchase = (newPurchase) => {
    const storedCompras = JSON.parse(localStorage.getItem('compras')) || [];
    const updatedCompras = [...storedCompras, newPurchase];
    localStorage.setItem('compras', JSON.stringify(updatedCompras));
    setCompras(updatedCompras);
    alert('Nova compra adicionada com sucesso!');
  };

  /* Função para atualizar o status de uma compra */
  const handleStatusChange = (purchaseId, status) => {
    const updatedCompras = compras.map((compra) =>
      compra.ID_Compra === purchaseId ? { ...compra, Status: status } : compra
    );
    setCompras(updatedCompras);
    localStorage.setItem('compras', JSON.stringify(updatedCompras));
    alert(`Status da compra ${purchaseId} atualizado para ${status}.`);
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

      <button
        onClick={() =>
          addPurchase({
            ID_Compra: Date.now(),
            Nome: 'Nova Compra',
            Status: 'pendente',
          })
        }
      >
        Adicionar Compra
      </button>
    </div>
  );
}

export default ListaColetores;
