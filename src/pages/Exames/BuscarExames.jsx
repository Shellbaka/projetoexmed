import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./BuscarExames.css";

export default function BuscarExames() {
    const [agendamentos, setAgendamentos] = useState([]);

    useEffect(() => {
        const agendamentosSalvos = JSON.parse(localStorage.getItem("agendamentos")) || [];
        setAgendamentos(agendamentosSalvos);
    }, []);

    const cancelarAgendamento = (index) => {
        const atualizados = [...agendamentos];
        atualizados.splice(index, 1);
        setAgendamentos(atualizados);
        localStorage.setItem("agendamentos", JSON.stringify(atualizados));
    };

    return (
        <div className="BuscarExames">
            <h2>Meus Exames</h2>
            {agendamentos.length > 0 ? (
                <div className="TabelaExames">
                    <table>
                        <thead>
                            <tr>
                                <th>Exame</th>
                                <th>Data</th>
                                <th>Horário</th>
                                <th>Laboratório</th>
                                <th>Valor</th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {agendamentos.map((agendamento, index) => (
                                <tr key={index}>
                                    <td>{agendamento.exame}</td>
                                    <td>{agendamento.data}</td>
                                    <td>{agendamento.horario}</td>
                                    <td>{agendamento.laboratorio}</td>
                                    <td>R$ {agendamento.valor.toFixed(2)}</td>
                                    <td>
                                        <button className="btn-cancelar" onClick={() => cancelarAgendamento(index)}>Cancelar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>Sem exames agendados.</p>
            )}
            <Link to="/">
                <button className="btn-voltar">Voltar</button>
            </Link>
        </div>
    );
}
