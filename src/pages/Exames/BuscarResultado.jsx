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
                <p>Selecione a Data do Exame Marcado:</p>
            <div className='calendario-container'>
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
                    placeholder="Buscar por nome ou ID..."
                />
                <button type="submit" className="BotaoProcura">Buscar Resultados</button>
            </form>

            <div className='Resultados'>
                <p>Resultados na data {selectedDate.toLocaleDateString('pt-BR')}:</p>
            </div>
        </div>
    );
};
