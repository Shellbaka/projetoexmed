// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useCallback } from "react";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import "./TextNav.css";

export default function TextNav() {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [exame, setExame] = useState("");
  const [horario, setHorario] = useState("");
  const [laboratorio, setLaboratorio] = useState("");
  const [valor, setValor] = useState(0);
  const [nome] = useState("Paciente");
  const [diasUteisDisponiveis, setDiasUteisDisponiveis] = useState([]);
  const navigate = useNavigate();

  /* Verifica se uma data é um dia útil */
  const isDiaUtil = (date) => {
    const diaSemana = date.getDay();
    return diaSemana !== 0 && diaSemana !== 6; // Exclui domingos e sábados
  };

  /* Calcula os próximos 30 dias úteis */
  const calcularDiasUteis = useCallback(() => {
    const hoje = new Date();
    const diasUteis = [];
    let contador = 0;

    while (diasUteis.length < 30) {
      const dia = new Date(hoje);
      dia.setDate(hoje.getDate() + contador);
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

  /* Salva o agendamento no LocalStorage */
  const salvarAgendamento = () => {
    const novoAgendamento = {
      exame,
      data: selectedDate ? selectedDate.toLocaleDateString("pt-BR") : "",
      horario,
      laboratorio,
      valor,
      paciente: nome,
    };
    const agendamentosSalvos =
      JSON.parse(localStorage.getItem("agendamentos")) || [];
    localStorage.setItem(
      "agendamentos",
      JSON.stringify([...agendamentosSalvos, novoAgendamento])
    );
  };

  const avancarEtapa = () => {
    if (step === 3 && (!selectedDate || !horario)) {
      alert("Por favor, selecione uma data e um horário antes de prosseguir.");
      return;
    }
    setStep((prevStep) => prevStep + 1);
  };

  const voltarEtapa = () => setStep((prevStep) => Math.max(prevStep - 1, 1));

  const finalizarAgendamento = () => {
    salvarAgendamento();
    setStep(4.5);
  };

  return (
    <div className="TextNav">
      {step === 1 && (
        <div className="step-container">
          <h2>Bem-vindo ao Agendamento</h2>
          <button onClick={() => setStep(2)}>Agendar Exame</button>
          <button onClick={() => navigate("/resultado")}>Meus Exames</button>
        </div>
      )}

      {step === 2 && (
        <div className="step-container">
          <h2>Escolha o tipo de exame</h2>
          <button
            onClick={() => {
              setExame("Sangue");
              setLaboratorio("Lab Vida Sangue");
              setValor(150);
              avancarEtapa();
            }}
          >
            Exame de Sangue
          </button>
          <button
            onClick={() => {
              setExame("Urina e Fezes");
              setLaboratorio("Lab Saúde Completa");
              setValor(120);
              avancarEtapa();
            }}
          >
            Urina e Fezes
          </button>
          <button
            onClick={() => {
              setExame("Teste de Covid");
              setLaboratorio("Lab Saúde Testes");
              setValor(180);
              avancarEtapa();
            }}
          >
            Teste de Covid
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="step-container">
          <h2>Agendar Data e Hora</h2>
          <p>Nome do Paciente: {nome}</p>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileDisabled={({ date, view }) => {
              if (view === "month") {
                return !diasUteisDisponiveis.some(
                  (diaUtil) => date.toDateString() === diaUtil.toDateString()
                );
              }
              return false;
            }}
            showNavigation={true}
            nextLabel=">" // Botão próximo mês
            prevLabel="<" // Botão mês anterior
            next2Label=">>" // Botão próximo ano
            prev2Label="<<" // Botão ano anterior
            locale="pt-BR" // Define o padrão de idioma para "pt-BR"
            formatShortWeekday={(locale, date) => {
              const dias = ["dom", "seg", "ter", "qua", "qui", "sex", "sab"];
              return dias[date.getDay()]; // Sequência correta
            }}
            className="custom-calendar"
          />
          {["08:00", "10:00", "14:00", "16:00"].map((hora) => (
            <button
              key={hora}
              onClick={() => setHorario(hora)}
              style={{
                backgroundColor: horario === hora ? "#0864b2" : "#ccc",
              }}
            >
              {hora}
            </button>
          ))}
          <button className="navigation-button" onClick={voltarEtapa}>
            Anterior
          </button>
          <button className="navigation-button" onClick={avancarEtapa}>
            Próximo
          </button>
        </div>
      )}

      {step === 4 && (
        <div className="step-container">
          <h2>Confirmação de Agendamento</h2>
          <p>Exame: {exame}</p>
          <p>
            Data:{" "}
            {selectedDate
              ? selectedDate.toLocaleDateString("pt-BR")
              : "Não selecionada"}
          </p>
          <p>Horário: {horario}</p>
          <p>Laboratório: {laboratorio}</p>
          <p>Valor: R$ {valor.toFixed(2)}</p>
          <button className="navigation-button" onClick={voltarEtapa}>
            Anterior
          </button>
          <button className="navigation-button" onClick={finalizarAgendamento}>
            Finalizar
          </button>
        </div>
      )}

      {step === 4.5 && (
        <div className="step-container">
          <h2>Agendamento Realizado!</h2>
          <p>Obrigado, {nome}! Seu agendamento foi concluído com sucesso.</p>
          <p>
            <strong>Detalhes:</strong>
          </p>
          <p>Exame: {exame}</p>
          <p>
            Data:{" "}
            {selectedDate ? selectedDate.toLocaleDateString("pt-BR") : ""}
          </p>
          <p>Horário: {horario}</p>
          <p>Laboratório: {laboratorio}</p>
          <p>Valor: R$ {valor.toFixed(2)}</p>
          <button className="navigation-button" onClick={() => navigate("/")}>
            Voltar ao Início
          </button>
        </div>
      )}
    </div>
  );
}
