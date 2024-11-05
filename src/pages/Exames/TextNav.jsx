import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import BuscarExames from './BuscarExames';
import './TextNav.css';

export default function AgendarExame() {
    const [step, setStep] = useState(1); // 1 para seleção do serviço
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [exame, setExame] = useState('');
    const [vacina, setVacina] = useState('');
    const [horario, setHorario] = useState('');
    const [coletor, setColetor] = useState('');
    const [nome, setNome] = useState(localStorage.getItem('nome') || '');

    const avancarEtapa = () => {
        setStep((prevStep) => {
            if (prevStep === 2.5) {
                return 3; // Garante que a etapa seja 3 após 2.5
            }
            return prevStep + 1;
        });
    };

    const voltarEtapa = () => setStep((prevStep) => Math.max(prevStep - 1, 1));

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
                    <button onClick={() => setStep(2)}>Agendar Exame</button> {/* Avança para agendar */}
                    <button onClick={() => setStep(5)}>Meus Exames</button> {/* Avança para Buscar Exames */}
                </div>
            )}

            {/* Etapa 2: Agendamento de exames */}
            {step === 2 && (
                <div>
                    <h2>Escolha o tipo de exame</h2>
                    <button onClick={() => { setExame('Sangue'); avancarEtapa(); }}>Exame de Sangue</button>
                    <button onClick={() => { setExame('Urina/Fezes'); avancarEtapa(); }}>Urina e Fezes</button>
                    <button onClick={() => { setExame('Vacinação'); setStep(2.5); }}>Vacinação</button>
                    <button onClick={() => voltarEtapa()}>Anterior</button>
                </div>
            )}

            {/* Etapa 2.5: Escolha do tipo de vacina */}
            {step === 2.5 && exame === 'Vacinação' && (
                <div>
                    <h2>Escolha o tipo de vacinação</h2>
                    {['Hepatite', 'Antitetânica', 'Pneumocócica', 'HPV', 'Meningocócica C', 'Hepatite B', 'Penta', 'VIP/VOP', 'Tetra Viral'].map((vacinaTipo) => (
                        <div key={vacinaTipo}>
                            <button onClick={() => { setVacina(vacinaTipo); avancarEtapa(); }}>
                                {vacinaTipo}
                            </button>
                            <p>Breve descrição de {vacinaTipo}</p>
                        </div>
                    ))}
                    <button onClick={() => setStep(2)}>Anterior</button> {/* Volta para a etapa 2 */}
                </div>
            )}

            {/* Etapa 3: Agendamento */}
            {step === 3 && (
                <div>
                    <h2 className="agendar-titulo">Agendar data e Hora para {exame} {vacina && `- ${vacina}`}</h2>

                    <input
                        type="text"
                        placeholder="Seu Nome"
                        value={nome}
                        onChange={salvarNome}
                    />
                    <div>
                        <p>Selecione a Data:</p>
                        <Calendar
                            onChange={setSelectedDate}
                            value={selectedDate}
                            locale="pt-BR"
                        />
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
                    <button onClick={() => { vacina ? setStep(2.5) : voltarEtapa(); }}>Anterior</button>
                </div>
            )}

            {/* Etapa 4: Confirmação do agendamento */}
            {step === 4 && (
                <div className="ConfirmaAgenda">
                    <h2>{nome}, seu agendamento foi confirmado com sucesso!</h2>
                    <h3>Detalhes do Agendamento:</h3>
                    <p>Exame: {exame} {vacina && `- ${vacina}`}</p>
                    <p>Data: {selectedDate.toLocaleDateString('pt-BR')}</p>
                    <p>Horário: {horario}</p>
                    <p>Coletor: {coletor}</p>
                    <p>Aguarde a confirmação via email.</p>
                    <button onClick={voltarEtapa}>Anterior</button>
                </div>
            )}

            {/* Exibe BuscarExames apenas na etapa 5 */}
            {step === 5 && <BuscarExames />}
        </div>
    );
}
