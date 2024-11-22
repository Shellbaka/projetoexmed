import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import './Agendamentos.css';

function Agendamentos() {
  const [agendamentos, setAgendamentos] = useState([
    {
      id: 1,
      tipo: 'Vacina Variola',
      nome: 'João Silva',
      data: '2024-11-21',
      hora: '10:00',
      laboratorio: 'Lab Vida',
      valor: 170.00,
      telefone: '1234567890',
      endereco: 'Rua Lopes de Carvalho, 308, Pernambuco, PE',
      status: 'Pendente',
      motivoNegado: '',
    },
    {
      id: 2,
      tipo: 'Exames Gerais',
      nome: 'Maria Oliveira',
      data: '2024-11-21',
      hora: '14:00',
      valor: 300.00,
      laboratorio: 'Lab 8',
      telefone: '0987654321',
      endereco: 'Av.recife, 92, Pernambuco, PE',
      status: 'Pendente',
      motivoNegado: '',
    },
    {
      id: 3,
      tipo: 'Exame de Fezes e Urina',
      nome: 'Roberto Carlos',
      data: '2024-11-21',
      hora: '15:00',
      valor: 100.0,
      laboratorio: 'Lab 8',
      telefone: '(55) 1214-2112',
      endereco: 'Av.Norte, 123, Pernambuco, PE',
      status: 'Pendente',
      motivoNegado: '',
    },
    {
      id: 4,
      tipo: 'Hepatite B',
      nome: 'João Silva',
      data: '2024-11-25',
      hora: '10:00',
      valor: 150.0,
      laboratorio: 'Lab Vida',
      telefone: '(81) 8155-3382',
      endereco: 'Rua Florencio Pessoa, 314, Pernambuco, PE',
      status: 'Pendente',
      motivoNegado: '',
    },
    {
      id: 5,
      tipo: 'Radiologista',
      nome: 'Cleber Freitas',
      data: '2024-11-23',
      hora: '13:00',
      valor: 200.0,
      laboratorio: 'Radiofácil',
      telefone: '(11) 1234-5678',
      endereco: 'Rua das Flores, 255, Pernambuco, PE',
      status: 'Pendente',
      motivoNegado: '',
    },
    {
      id: 6,
      tipo: 'Vacina Gripe',
      nome: 'Maria Souza',
      data: '2024-11-22',
      hora: '14:00',
      valor: 80.0,
      laboratorio: 'Imuniza Fácil',
      telefone: '(12) 9876-5432',
      endereco: 'Av. Paulista, 456, Pernambuco, PE',
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
            <p><strong>Nome:</strong> {agendamento.nome}</p>
            <p><strong>Data:</strong> {agendamento.data}</p>
            <p><strong>Hora:</strong> {agendamento.hora}</p>
            <p><strong>Valor:</strong> {agendamento.valor}</p>
            <p><strong>Laboratório:</strong> {agendamento.laboratorio}</p>
            <p><strong>Telefone:</strong> {agendamento.telefone}</p>
            <p><strong>Endereço:</strong> {agendamento.endereco}</p>
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
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Agendamentos;
