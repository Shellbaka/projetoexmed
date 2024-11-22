import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Importa o CSS do calendário
import './Agendamentos.css';

function Agendamentos() {
  const [agendamentos, setAgendamentos] = useState([
    {
      id: 1,
      tipo: 'Exame 1',
      data: '2024-11-21',
      hora: '10:00',
      nome: 'João Silva',
      telefone: '1234567890',
      status: 'Pendente',
      motivoNegado: '',
    },
    {
      id: 2,
      tipo: 'Exame 2',
      data: '2024-11-21',
      hora: '14:00',
      nome: 'Maria Oliveira',
      telefone: '0987654321',
      status: 'Pendente',
      motivoNegado: '',
    },
  ]);

  const [motivoNegado, setMotivoNegado] = useState('');
  const [dataSelecionada, setDataSelecionada] = useState(new Date());

  const salvarNoLocalStorage = (id, status, motivo = '') => {
    const itemAtualizado = agendamentos.find((item) => item.id === id);
    if (itemAtualizado) {
      const novoItem = { ...itemAtualizado, status, motivoNegado: motivo };

      const atendimentosSalvos = JSON.parse(localStorage.getItem('atendimentos')) || [];
      const atendimentosAtualizados = atendimentosSalvos.filter((item) => item.id !== id);

      localStorage.setItem('atendimentos', JSON.stringify([...atendimentosAtualizados, novoItem]));

      const agendamentosAtualizados = agendamentos.map((item) =>
        item.id === id ? novoItem : item
      );
      setAgendamentos(agendamentosAtualizados);
    }
  };

  const aceitarAgendamento = (id) => {
    salvarNoLocalStorage(id, 'Aceito');
  };

  const recusarAgendamento = (id) => {
    if (!motivoNegado.trim()) {
      alert('Por favor, forneça um motivo para recusar.');
      return;
    }
    salvarNoLocalStorage(id, 'Negado', motivoNegado);
    setMotivoNegado('');
  };

  const formatarData = (data) => new Date(data).toISOString().split('T')[0];

  const atendimentosFiltrados = agendamentos.filter(
    (item) => formatarData(item.data) === formatarData(dataSelecionada)
  );

  return (
    <div className="agendamentos-container">
      <h2>Status de Agendamentos</h2>
      
      <div className="calendario-container">
        <Calendar
          onChange={setDataSelecionada}
          value={dataSelecionada}
          className="custom-calendar"
        />
        <div className="data-selecionada">
          <strong>Data Selecionada:</strong> {dataSelecionada.toLocaleDateString()}
        </div>
      </div>

      <div className="agendamentos-list">
        {atendimentosFiltrados.map((agendamento) => (
          <div key={agendamento.id} className="agendamento-card">
            <h3>{agendamento.tipo}</h3>
            <p><strong>Data:</strong> {agendamento.data}</p>
            <p><strong>Hora:</strong> {agendamento.hora}</p>
            <p><strong>Nome:</strong> {agendamento.nome}</p>
            <p><strong>Telefone:</strong> {agendamento.telefone}</p>
            <p><strong>Status:</strong> {agendamento.status}</p>

            {agendamento.status === 'Pendente' && (
              <>
                <button onClick={() => aceitarAgendamento(agendamento.id)}>Aceitar</button>
                <button
                  onClick={() => recusarAgendamento(agendamento.id)}
                  className={motivoNegado.trim() ? 'button-recusar' : 'button-recusar-disabled'}
                >
                  Recusar
                </button>
                {agendamento.status === 'Negado' && (
                  <div>
                    <strong>Negado por:</strong> {agendamento.motivoNegado}
                  </div>
                )}
                {agendamento.status === 'Pendente' && (
                  <div>
                    <input
                      type="text"
                      placeholder="Informe o motivo"
                      value={motivoNegado}
                      onChange={(e) => setMotivoNegado(e.target.value)}
                    />
                    <button
                      onClick={() => recusarAgendamento(agendamento.id)}
                      disabled={!motivoNegado.trim()}
                      className="confirmar-recusa"
                    >
                      Confirmar Recusa
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Agendamentos;
