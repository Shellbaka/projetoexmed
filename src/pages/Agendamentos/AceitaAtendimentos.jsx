// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import './AceitaAtendimentos.css';

function AceitaAtendimentos() {
    console.log('Componente AceitaAtendimentos está sendo renderizado!');

  const [pedidos, setPedidos] = useState([
    {
      id: 1,
      tipo: 'Vacina Variola',
      nome: 'João Silva',
      data: '2024-11-21',
      hora: '10:00',
      laboratorio: 'Lab Vida',
      valor: 170.0,
      telefone: '1234567890',
      endereco: 'Rua Lopes de Carvalho, 308, Pernambuco, PE',
      status: 'Pendente',
    },
    {
      id: 2,
      tipo: 'Exames Gerais',
      nome: 'Maria Oliveira',
      data: '2024-11-21',
      hora: '14:00',
      laboratorio: 'Lab 8',
      valor: 300.0,
      telefone: '0987654321',
      endereco: 'Av. Recife, 92, Pernambuco, PE',
      status: 'Pendente',
    },
    // Mais pedidos de exemplo
  ]);

  const aceitarPedido = (id) => {
    atualizarStatusPedido(id, 'Em Atendimento');
  };

  const rejeitarPedido = (id) => {
    atualizarStatusPedido(id, 'Rejeitado');
  };

  const atualizarStatusPedido = (id, status) => {
    const pedidoAtualizado = pedidos.find((pedido) => pedido.id === id);
    if (pedidoAtualizado) {
      const novoPedido = { ...pedidoAtualizado, status };

      const agendamentosSalvos = JSON.parse(localStorage.getItem('agendamentos')) || [];
      const agendamentosAtualizados = agendamentosSalvos.filter((item) => item.id !== id);

      localStorage.setItem('agendamentos', JSON.stringify([...agendamentosAtualizados, novoPedido]));

      const pedidosAtualizados = pedidos.map((pedido) =>
        pedido.id === id ? novoPedido : pedido
      );
      setPedidos(pedidosAtualizados);
    }
  };

  return (
    <div className="aceita-atendimentos-container">
      <h2>Pedidos de Atendimento</h2>
      <div className="pedidos-list">
        {pedidos.map((pedido) => (
          <div key={pedido.id} className="pedido-card">
            <h3>{pedido.tipo}</h3>
            <p><strong>Nome:</strong> {pedido.nome}</p>
            <p><strong>Data:</strong> {pedido.data}</p>
            <p><strong>Hora:</strong> {pedido.hora}</p>
            <p><strong>Valor:</strong> R$ {pedido.valor.toFixed(2)}</p>
            <p><strong>Laboratório:</strong> {pedido.laboratorio}</p>
            <p><strong>Telefone:</strong> {pedido.telefone}</p>
            <p><strong>Endereço:</strong> {pedido.endereco}</p>
            <p><strong>Status:</strong> {pedido.status}</p>

            {pedido.status === 'Pendente' && (
              <>
                <button onClick={() => aceitarPedido(pedido.id)} className="button-aceitar">
                  Aceitar
                </button>
                <button onClick={() => rejeitarPedido(pedido.id)} className="button-recusar">
                  Rejeitar
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AceitaAtendimentos;
