import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Agendamentos.css";

function Agendamentos({ adicionarAtendido }) {
  const [agendamentos, setAgendamentos] = useState([
    {
      id: 1,
      tipo: "Vacina Variola",
      nome: "João Silva",
      data: "2024-11-21",
      hora: "10:00",
      laboratorio: "Lab Vida",
      valor: 170.0,
      telefone: "1234567890",
      endereco: "Rua Lopes de Carvalho, 308, Pernambuco, PE",
      status: "Pendente",
      motivoNegado: "",
    },
  ]);

  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [motivosNegados, setMotivosNegados] = useState({});
  const [diasUteisDisponiveis, setDiasUteisDisponiveis] = useState([]);

  /* Verifica se uma data é um dia útil */
  const isDiaUtil = (date) => {
    const diaSemana = date.getDay();
    return diaSemana !== 0 && diaSemana !== 6; // Exclui domingos e sábados
  };

  /* Calcula os próximos 5 dias úteis */
  const calcularDiasUteis = useCallback(() => {
    const hoje = new Date();
    const diasUteis = [];
    let contador = 0;

    while (diasUteis.length < 5) {
      const dia = new Date(hoje);
      dia.setDate(hoje.getDate() + contador); // Incrementa os dias
      if (isDiaUtil(dia)) {
        diasUteis.push(dia);
      }
      contador++;
    }

    return diasUteis;
  }, []);

  useEffect(() => {
    const diasUteis = calcularDiasUteis();
    setDiasUteisDisponiveis(diasUteis);
  }, [calcularDiasUteis]);

  /* Função para salvar alterações no LocalStorage */
  const salvarNoLocalStorage = (id, status, motivo = "") => {
    const itemAtualizado = agendamentos.find((item) => item.id === id);
    if (itemAtualizado) {
      const novoItem = { ...itemAtualizado, status, motivoNegado: motivo };

      const atendimentosSalvos =
        JSON.parse(localStorage.getItem("atendimentos")) || [];
      const atendimentosAtualizados = atendimentosSalvos.filter(
        (item) => item.id !== id
      );

      localStorage.setItem(
        "atendimentos",
        JSON.stringify([...atendimentosAtualizados, novoItem])
      );

      const agendamentosAtualizados = agendamentos.map((item) =>
        item.id === id ? novoItem : item
      );
      setAgendamentos(agendamentosAtualizados);
    }
  };

  const marcarComoAtendido = (id) => {
    const agendamento = agendamentos.find((item) => item.id === id);
    if (agendamento) {
      salvarNoLocalStorage(id, "Atendido");
      adicionarAtendido({ ...agendamento, status: "Atendido" });
    }
  };

  const marcarComoNaoAtendido = (id) => {
    const motivo = motivosNegados[id];
    if (!motivo || motivo.trim() === "") {
      alert("Por favor, forneça um motivo para marcar como Não Atendido.");
      return;
    }
    salvarNoLocalStorage(id, "Não Atendido", motivo);
    setMotivosNegados((prev) => ({ ...prev, [id]: "" }));
  };

  const handleMotivoChange = (id, valor) => {
    setMotivosNegados((prev) => ({ ...prev, [id]: valor }));
  };

  const formatarData = (data) => new Date(data).toISOString().split("T")[0];

  const atendimentosFiltrados = agendamentos.filter(
    (item) => formatarData(item.data) === formatarData(dataSelecionada)
  );

  const handleConfirmarData = () => {
    alert(`Data confirmada: ${dataSelecionada.toLocaleDateString()}`);
  };

  return (
    <div className="agendamentos-container">
      <h2>Status de Agendamentos</h2>

      <div className="calendario-container">
        <Calendar
          onChange={setDataSelecionada}
          value={dataSelecionada}
          className="custom-calendar"
          tileDisabled={({ date, view }) => {
            /* Somente desabilita os dias no modo 'month' */
            if (view === "month") {
              return !diasUteisDisponiveis.some(
                (diaUtil) => date.toDateString() === diaUtil.toDateString()
              );
            }
            return false; // No modo 'year' ou 'decade', não desabilita nada
          }}
          showNavigation={true} // Ativa os botões de navegação
          nextLabel=">" // Personaliza botão próximo mês
          prevLabel="<" // Personaliza botão mês anterior
          next2Label=">>" // Personaliza botão próximo ano
          prev2Label="<<" // Personaliza botão ano anterior
        />
        <div className="data-selecionada">
          <strong>Data Selecionada:</strong> {dataSelecionada.toLocaleDateString()}
        </div>
        <button className="confirmar-button" onClick={handleConfirmarData}>
          Confirmar Data
        </button>
      </div>

      <div className="agendamentos-list">
        {atendimentosFiltrados.map((agendamento) => (
          <div key={agendamento.id} className="agendamento-card">
            <h3>{agendamento.tipo}</h3>
            <p>
              <strong>Nome:</strong> {agendamento.nome}
            </p>
            <p>
              <strong>Data:</strong> {agendamento.data}
            </p>
            <p>
              <strong>Status:</strong> {agendamento.status}
            </p>
            {agendamento.status === "Pendente" && (
              <>
                <button onClick={() => marcarComoAtendido(agendamento.id)}>
                  Atendido
                </button>
                <button onClick={() => marcarComoNaoAtendido(agendamento.id)}>
                  Não Atendido
                </button>
                <input
                  type="text"
                  placeholder="Informe o motivo"
                  value={motivosNegados[agendamento.id] || ""}
                  onChange={(e) => handleMotivoChange(agendamento.id, e.target.value)}
                />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

Agendamentos.propTypes = {
  adicionarAtendido: PropTypes.func.isRequired,
};

export default Agendamentos;
