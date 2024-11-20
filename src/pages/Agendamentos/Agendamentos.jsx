import React from 'react';
import './Agendamentos.css';

function Agendamentos() {
  const agendamentos = [
    {
      id: 1,
      tipo: 'Exame de Sangue',
      data: '11-11-2024',
      hora: '10:00',
      valor: 150.0,
      laboratorio: 'Lab Vida',
    },
    {
      id: 2,
      tipo: 'Vacina Gripe',
      data: '12-11-2024',
      hora: '14:00',
      valor: 80.0,
      laboratorio: 'Imuniza Fácil',
    },
    {
      id: 3,
      tipo: 'Exame de Imagem',
      data: '13-11-2024',
      hora: '09:00',
      valor: 300.0,
      laboratorio: 'Centro Radiológico',
    },
  ];

  return (
    <div className="agendamentos-container">
      {/* Título modificado */}
      <div className="agendamento-titulo">Agendamentos</div>
      <ul className="agendamentos-lista">
        {agendamentos.map((agendamento) => (
          <li key={agendamento.id} className="agendamento-item">
            <p><strong>Tipo:</strong> {agendamento.tipo}</p>
            <p><strong>Data:</strong> {agendamento.data}</p>
            <p><strong>Hora:</strong> {agendamento.hora}</p>
            <p><strong>Valor:</strong> R${agendamento.valor.toFixed(2)}</p>
            <p><strong>Laboratório:</strong> {agendamento.laboratorio}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Agendamentos;