import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import "./TextNav.css";

export default function AgendarExame() {
    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState(null);
    const [exame, setExame] = useState("");
    const [horario, setHorario] = useState("");
    const [laboratorio, setLaboratorio] = useState("");
    const [valor, setValor] = useState(0);
    const [nome, setNome] = useState("");
    const [agendamentos, setAgendamentos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            const decoded = jwtDecode(token);
            setNome(decoded.name || "Paciente");
        } else {
            setNome("Paciente");
        }
    }, []);

    useEffect(() => {
        const agendamentosSalvos = JSON.parse(localStorage.getItem("agendamentos")) || [];
        setAgendamentos(agendamentosSalvos);
    }, []);

    const salvarAgendamento = () => {
        const novoAgendamento = {
            exame,
            data: selectedDate ? selectedDate.toLocaleDateString("pt-BR") : "",
            horario,
            laboratorio,
            valor,
            paciente: nome,
        };
        const atualizados = [...agendamentos, novoAgendamento];
        setAgendamentos(atualizados);
        localStorage.setItem("agendamentos", JSON.stringify(atualizados));
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

    const resetarDados = () => {
        setStep(1);
        setSelectedDate(null);
        setExame("");
        setHorario("");
        setLaboratorio("");
        setValor(0);
    };

    const desativarDias = ({ date }) => {
        const hoje = new Date();
        const maxData = new Date();
        maxData.setDate(hoje.getDate() + 10); // Inclui 10 dias para contabilizar finais de semana.

        const diffTime = Math.abs(date - hoje);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const diaSemana = date.getDay();
        const ehFinalDeSemana = diaSemana === 0 || diaSemana === 6;

        return date < hoje || date > maxData || ehFinalDeSemana || diffDays > 5;
    };

    return (
        <div className="AgendarExame">
            {step === 1 && (
                <div>
                    <h2>Bem-vindo ao Agendamento</h2>
                    <button onClick={() => setStep(2)}>Agendar Exame</button>
                    <button onClick={() => navigate("/resultado")}>Meus Exames</button>
                </div>
            )}

            {step === 2 && (
                <div>
                    <h2>Escolha o tipo de exame</h2>
                    <button onClick={() => { setExame("Sangue"); setLaboratorio("Lab Vida Sangue"); setValor(150); avancarEtapa(); }}>Exame de Sangue</button>
                    <button onClick={() => { setExame("Urina e Fezes"); setLaboratorio("Lab Saúde Completa"); setValor(120); avancarEtapa(); }}>Urina e Fezes</button>
                    <button onClick={() => { setExame("Teste de Covid"); setLaboratorio("Lab Saúde Testes"); setValor(180); avancarEtapa(); }}>Teste de Covid</button>
                </div>
            )}

            {step === 3 && (
                <div>
                    <h2>Agendar Data e Hora</h2>
                    <p>Nome do Paciente: {nome}</p>
                    <Calendar 
                        onChange={setSelectedDate} 
                        value={selectedDate} 
                        locale="pt-BR" 
                        tileDisabled={desativarDias} 
                    />
                    {["08:00", "10:00", "14:00", "16:00"].map((hora) => (
                        <button 
                            key={hora} 
                            onClick={() => setHorario(hora)} 
                            style={{ backgroundColor: horario === hora ? "#0864b2" : "#ccc" }}
                        >
                            {hora}
                        </button>
                    ))}
                    <button onClick={voltarEtapa}>Anterior</button>
                    <button onClick={avancarEtapa}>Próximo</button>
                </div>
            )}

            {step === 4 && (
                <div>
                    <h2>Confirmação de Agendamento</h2>
                    <p>Exame: {exame}</p>
                    <p>Data: {selectedDate ? selectedDate.toLocaleDateString("pt-BR") : "Não selecionada"}</p>
                    <p>Horário: {horario}</p>
                    <p>Laboratório: {laboratorio}</p>
                    <p>Valor: R$ {valor.toFixed(2)}</p>
                    <button onClick={voltarEtapa}>Anterior</button>
                    <button onClick={finalizarAgendamento}>Finalizar</button>
                </div>
            )}

            {step === 4.5 && (
                <div>
                    <h2>Agendamento Realizado!</h2>
                    <p>Obrigado, {nome}! Seu agendamento foi concluído com sucesso.</p>
                    <p><strong>Detalhes:</strong></p>
                    <p>Exame: {exame}</p>
                    <p>Data: {selectedDate ? selectedDate.toLocaleDateString("pt-BR") : ""}</p>
                    <p>Horário: {horario}</p>
                    <p>Laboratório: {laboratorio}</p>
                    <p>Valor: R$ {valor.toFixed(2)}</p>
                    <button onClick={resetarDados}>Voltar ao Início</button>
                </div>
            )}
        </div>
    );
}