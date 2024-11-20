import React, { useState, useEffect } from 'react';
import './Agendamentos.css';

function Agendamentos() {
  const [agendamentos, setAgendamentos] = useState(() => {
    const savedAgendamentos = localStorage.getItem('agendamentos');
    return savedAgendamentos
      ? JSON.parse(savedAgendamentos)
      : [
          {
            id: 1,
            tipo: 'Exame de Sangue',
            data: '11-11-2024',
            hora: '10:00',
            valor: 150.0,
            laboratorio: 'Lab Vida',
            atendido: false,
          },
          {
            id: 2,
            tipo: 'Vacina Gripe',
            data: '12-11-2024',
            hora: '14:00',
            valor: 80.0,
            laboratorio: 'Imuniza Fácil',
            atendido: false,
          },
          {
            id: 3,
            tipo: 'Exame de Imagem',
            data: '13-11-2024',
            hora: '09:00',
            valor: 300.0,
            laboratorio: 'Centro Radiológico',
            atendido: false,
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
  }, [agendamentos]);

  const alternarStatus = (id) => {
    setAgendamentos((prevAgendamentos) =>
      prevAgendamentos.map((agendamento) =>
        agendamento.id === id
          ? { ...agendamento, atendido: !agendamento.atendido }
          : agendamento
      )
    );
  };

  return (
    <div className="agendamentos-container">
      <div className="agendamento-titulo">Agendamentos</div>

      <h2>Pendentes</h2>
      <ul className="agendamentos-lista">
        {agendamentos
          .filter((agendamento) => !agendamento.atendido)
          .map((agendamento) => (
            <li key={agendamento.id} className="agendamento-item">
              <p><strong>Tipo:</strong> {agendamento.tipo}</p>
              <p><strong>Data:</strong> {agendamento.data}</p>
              <p><strong>Hora:</strong> {agendamento.hora}</p>
              <p><strong>Valor:</strong> R${agendamento.valor.toFixed(2)}</p>
              <p><strong>Laboratório:</strong> {agendamento.laboratorio}</p>
              <button
                className="botao-atendido"
                onClick={() => alternarStatus(agendamento.id)}
              >
                Marcar como Atendido
              </button>
            </li>
          ))}
      </ul>

      <h2>Atendidos</h2>
      <ul className="agendamentos-lista">
        {agendamentos
          .filter((agendamento) => agendamento.atendido)
          .map((agendamento) => (
            <li key={agendamento.id} className="agendamento-item atendido">
              <p><strong>Tipo:</strong> {agendamento.tipo}</p>
              <p><strong>Data:</strong> {agendamento.data}</p>
              <p><strong>Hora:</strong> {agendamento.hora}</p>
              <p><strong>Valor:</strong> R${agendamento.valor.toFixed(2)}</p>
              <p><strong>Laboratório:</strong> {agendamento.laboratorio}</p>
              <button
                className="botao-desmarcar"
                onClick={() => alternarStatus(agendamento.id)}
              >
                Desmarcar como Atendido
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Agendamentos;
