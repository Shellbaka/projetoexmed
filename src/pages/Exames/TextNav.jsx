import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './TextNav.css';

export default function AgendarExame() {
    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState(null);
    const [exame, setExame] = useState('');
    const [vacina, setVacina] = useState('');
    const [horario, setHorario] = useState('');
    const [laboratorio, setLaboratorio] = useState('');
    const [valor, setValor] = useState(0);
    const [nome, setNome] = useState(localStorage.getItem('nome') || '');
    const [agendamentoFinalizado, setAgendamentoFinalizado] = useState(false);

    const avancarEtapa = () => {
        if (step === 3 && (!selectedDate || !horario)) {
            alert("Por favor, selecione uma data e um horário antes de prosseguir.");
            return;
        }
        setStep((prevStep) => (prevStep === 2.5 ? 3 : prevStep + 1));
    };

    const voltarEtapa = () => setStep((prevStep) => Math.max(prevStep - 1, 1));

    const salvarNome = (e) => {
        setNome(e.target.value);
        localStorage.setItem('nome', e.target.value);
    };

    const isDiaUtil = (date) => {
        const day = date.getDay();
        return day !== 0 && day !== 6;
    };

    const diasUteisAte5 = () => {
        const hoje = new Date();
        let diasUteis = [];
        let contador = 0;

        while (diasUteis.length < 5) {
            const proximoDia = new Date(hoje);
            proximoDia.setDate(hoje.getDate() + contador);
            if (isDiaUtil(proximoDia)) diasUteis.push(proximoDia);
            contador++;
        }
        return diasUteis;
    };

    const desabilitarDias = ({ date }) => {
        const hoje = new Date();
        const diasPermitidos = diasUteisAte5().map((d) => d.toDateString());
        return date < hoje || !diasPermitidos.includes(date.toDateString());
    };

    const definirLaboratorioEValor = (tipo) => {
        let lab, price;
        switch (tipo) {
            case 'Sangue':
                lab = 'Laboratório Vida Sangue';
                price = 150.0;
                break;
            case 'Urina/Fezes':
                lab = 'Laboratório Bio Saúde';
                price = 100.0;
                break;
            case 'Vacinação':
                lab = 'Clínica Vacina Bem';
                price = 0;
                break;
            default:
                lab = '';
                price = 0;
        }
        setLaboratorio(lab);
        setValor(price);
    };

    const definirValorVacina = (vacinaTipo) => {
        const valoresVacinas = {
            Hepatite: 80.0,
            Antitetânica: 50.0,
            Pneumocócica: 200.0,
            HPV: 300.0,
            'Meningocócica C': 180.0,
            'Hepatite B': 90.0,
            Penta: 250.0,
            'VIP/VOP': 70.0,
            'Tetra Viral': 400.0,
        };
        setValor(valoresVacinas[vacinaTipo]);
    };

    const selecionarExame = (tipo) => {
        setExame(tipo);
        setVacina('');
        definirLaboratorioEValor(tipo);
        avancarEtapa();
    };

    const selecionarVacina = (tipo) => {
        setVacina(tipo);
        setExame('');
        definirLaboratorioEValor('Vacinação');
        setStep(2.5);
    };

    const finalizarAgendamento = () => {
        setAgendamentoFinalizado(true);
        setStep(4.5);
    };

    const resetarDados = () => {
        setStep(1);
        setSelectedDate(null);
        setExame('');
        setVacina('');
        setHorario('');
        setLaboratorio('');
        setValor(0);
        setAgendamentoFinalizado(false);
    };

    return (
        <div className="AgendarExame">
            {step === 1 && (
                <div>
                    <h2>Bem-vindo ao Agendamento</h2>
                    <button onClick={() => setStep(2)}>Agendar Exame</button>
                    <button onClick={() => setStep(5)}>Meus Exames</button>
                </div>
            )}

            {step === 2 && (
                <div>
                    <h2>Escolha o tipo de exame</h2>
                    <button onClick={() => selecionarExame('Sangue')}>Exame de Sangue</button>
                    <button onClick={() => selecionarExame('Urina/Fezes')}>Urina e Fezes</button>
                    <button onClick={() => selecionarVacina('Vacinação')}>Vacinação</button>
                    <button onClick={voltarEtapa}>Anterior</button>
                </div>
            )}

            {step === 2.5 && vacina === 'Vacinação' && (
                <div>
                    <h2>Escolha o tipo de vacinação</h2>
                    {Object.keys({
                        Hepatite: 80.0,
                        Antitetânica: 50.0,
                        Pneumocócica: 200.0,
                        HPV: 300.0,
                        'Meningocócica C': 180.0,
                        'Hepatite B': 90.0,
                        Penta: 250.0,
                        'VIP/VOP': 70.0,
                        'Tetra Viral': 400.0,
                    }).map((vacinaTipo) => (
                        <button
                            key={vacinaTipo}
                            onClick={() => {
                                setVacina(vacinaTipo);
                                definirValorVacina(vacinaTipo);
                                avancarEtapa();
                            }}
                        >
                            {vacinaTipo}
                        </button>
                    ))}
                    <button onClick={() => setStep(2)}>Anterior</button>
                </div>
            )}

            {step === 3 && (
                <div>
                    <h2>Agendar Data e Hora</h2>
                    <input
                        type="text"
                        placeholder="Seu Nome"
                        value={nome}
                        onChange={salvarNome}
                    />
                    <Calendar
                        onChange={setSelectedDate}
                        value={selectedDate}
                        locale="pt-BR"
                        tileDisabled={desabilitarDias}
                    />
                    {['08:00', '10:00', '14:00', '16:00'].map((hora) => (
                        <button key={hora} onClick={() => setHorario(hora)}>
                            {hora}
                        </button>
                    ))}
                    <button onClick={voltarEtapa}>Anterior</button>
                    <button onClick={avancarEtapa}>Próximo</button>
                </div>
            )}

            {step === 4 && (
                <div className="ConfirmaAgenda">
                    <h2>Confirmação de Agendamento</h2>
                    {exame && <p>Exame: {exame}</p>}
                    {vacina && <p>Vacina: {vacina}</p>}
                    <p>Data: {selectedDate ? selectedDate.toLocaleDateString('pt-BR') : 'Não selecionada'}</p>
                    <p>Horário: {horario || 'Não selecionado'}</p>
                    <p>Laboratório: {laboratorio}</p>
                    <p>Valor: R$ {valor.toFixed(2)}</p>
                    <button onClick={voltarEtapa}>Anterior</button>
                    <button onClick={finalizarAgendamento}>Finalizar</button>
                </div>
            )}

            {step === 4.5 && agendamentoFinalizado && (
                <div className="ConfirmaSucesso">
                    <h2>Agendamento Confirmado!</h2>
                    <p>Obrigado, {nome}! Seu agendamento foi realizado com sucesso.</p>
                    {exame && <p>Exame: {exame}</p>}
                    {vacina && <p>Vacina: {vacina}</p>}
                    <p>Data: {selectedDate.toLocaleDateString('pt-BR')}</p>
                    <p>Horário: {horario}</p>
                    <p>Laboratório: {laboratorio}</p>
                    <p>Valor: R$ {valor.toFixed(2)}</p>
                    <button onClick={resetarDados}>Voltar ao Início</button>
                </div>
            )}

            {step === 5 && navigate("/resultado")}
        </div>
    );
}
