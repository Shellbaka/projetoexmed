import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './BuscarResultado.css';

export default function BuscarResultado() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <div className='BuscarResultado'>

            <div className='CaixaSelecaoExame'>
                <p>Selecione o Tipo de Exame</p>
                <select className='ExameTipo'>
                    <option>Exame de Sangue</option>
                    <option>Urina e Fezes</option>
                    <option>Vacinação</option>
                </select>
            </div>
            <div className='calendario-container'>
                <p>Selecione a Data do Exame:</p>
                <Calendar
                    onChange={setSelectedDate}
                    value={selectedDate}
                    locale="pt-BR"
                    className="calendario"
                />
            </div>

            <form className="CaixaDeBusca">
                <input
                    type="text"
                    className="Procurar"
                    placeholder="Pesquisar Seu Nome..."
                />
                <button type="submit" className="BotaoProcura">Buscar Nome</button>
            </form>

            <div className='Resultados'>
                <p>Resultados para {selectedDate.toLocaleDateString('pt-BR')}:</p>
            </div>
        </div>
    );
};
