import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Link } from 'react-router-dom';

export default function AgendarExame() {
    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [exame, setExame] = useState('');
    const [horario, setHorario] = useState('');
    const [coletor, setColetor] = useState('');
    const [nome, setNome] = useState(localStorage.getItem('nome') || '');

    const avancarEtapa = () => setStep(step + 1);
    const voltarEtapa = () => setStep(step - 1);

    const salvarNome = (e) => {
        setNome(e.target.value);
        localStorage.setItem('nome', e.target.value);
    };

    return (
        <div className="AgendarExame">
            {/* Etapa 1: Seleção entre Agendar ou Buscar Resultado */}
            {step === 1 && (
                <div>
                    <h2>Selecione o serviço desejado</h2>
                    <button onClick={() => { setExame('Agendar'); avancarEtapa(); }}>Agendar Exame</button>
                    <Link to="/resultado">
                        <button>Buscar Resultado</button>
                    </Link>
                </div>
            )}

            {/* Etapa 2: Escolha do tipo de exame */}
            {step === 2 && exame === 'Agendar' && (
                <div>
                    <h2>Escolha o tipo de exame</h2>
                    <button onClick={() => { setExame('Sangue'); avancarEtapa(); }}>Exame de Sangue</button>
                    <button onClick={() => { setExame('Urina/Fezes'); avancarEtapa(); }}>Urina e Fezes</button>
                    <button onClick={() => { setExame('Vacinação'); avancarEtapa(); }}>Vacinação</button>
                </div>
            )}

            {/* Etapa 3: Seleção de data, horário e coletor */}
            {step === 3 && (
                <div>
                    <h2>Agendar Data e Hora para {exame}</h2>
                    <input
                        type="text"
                        placeholder="Seu Nome"
                        value={nome}
                        onChange={salvarNome}
                    />
                    <div>
                        <p>Selecione a Data:</p>
                        <Calendar onChange={setSelectedDate} value={selectedDate} locale="pt-BR" />
                    </div>
                    <div>
                        <p>Selecione o Horário:</p>
                        <input type="time" value={horario} onChange={(e) => setHorario(e.target.value)} />
                    </div>
                    <div>
                        <p>Selecione o Coletor:</p>
                        <select value={coletor} onChange={(e) => setColetor(e.target.value)}>
                            <option value="">Selecione o Coletor</option>
                            <option value="João Silva">João Silva</option>
                            <option value="Maria Oliveira">Maria Oliveira</option>
                            <option value="Carlos Souza">Carlos Souza</option>
                        </select>
                    </div>
                    <button onClick={avancarEtapa}>Próximo</button>
                    <button onClick={voltarEtapa}>Anterior</button>
                </div>
            )}

            {/* Etapa 4: Confirmação do agendamento */}
            {step === 4 && (
                <div className="ConfirmaAgenda">
                    <h2>{nome}, seu agendamento foi confirmado com sucesso!</h2>
                    <h3>Detalhes do Agendamento:</h3>
                    <p>Exame: {exame}</p>
                    <p>Data: {selectedDate.toLocaleDateString('pt-BR')}</p>
                    <p>Horário: {horario}</p>
                    <p>Coletor: {coletor}</p>
                    <p>Aguarde a confirmação via email.</p>
                    <button onClick={voltarEtapa}>Anterior</button>
                </div>
            )}
        </div>
    );
}
