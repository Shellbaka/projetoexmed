import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Atendidos.css';

function Atendidos() {
  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [atendimentos, setAtendimentos] = useState([]);

  // Carregar atendimentos do localStorage, sem duplicações
  useEffect(() => {
    const dadosSalvos = JSON.parse(localStorage.getItem('atendimentos')) || [];
    setAtendimentos(dadosSalvos);
  }, []);

  const formatarData = (data) => new Date(data).toISOString().split('T')[0];

  const atendimentosFiltrados = atendimentos.filter(
    (item) => formatarData(item.data) === formatarData(dataSelecionada)
  );

  return (
    <div className="atendidos-container">
      <h2>Selecione uma data:</h2>
      <Calendar
        onChange={setDataSelecionada}
        value={dataSelecionada}
        className="custom-calendar"
      />
      <div className="data-selecionada">
        Data Selecionada: {dataSelecionada.toLocaleDateString()}
      </div>

      <div className="cards-container">
        {atendimentosFiltrados.length > 0 ? (
          atendimentosFiltrados.map((item) => (
            <div key={item.id} className="atendido-card">
              <h3>{item.tipo}</h3>
              <p><strong>Status:</strong> {item.status}</p>
              {item.status === 'Negado' && (
                <p><strong>Negado por:</strong> {item.motivoNegado}</p>
              )}
              <p><strong>Nome:</strong> {item.nome}</p>
              <p><strong>Data:</strong> {item.data}</p>
              <p><strong>Hora:</strong> {item.hora}</p>
              <p><strong>Valor:</strong> {item.valor}</p> {/* Campo valor adicionado */}
              <p><strong>Telefone:</strong> {item.telefone}</p>
              <p><strong>Endereço:</strong> {item.endereco}</p>
            </div>
          ))
        ) : (
          <p>Nenhum atendimento encontrado para esta data.</p>
        )}
      </div>
    </div>
  );
}

export default Atendidos;
