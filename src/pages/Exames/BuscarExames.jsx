import React, { useState } from 'react';
import './BuscarExames.css';
import { Link } from 'react-router-dom';

export default function BuscarExames() {
    const [pesquisa, setPesquisa] = useState('');
    const [exames, setExames] = useState([
        { id: 1, nome: 'Exame de Sangue', data: '2024-11-15', status: 'Agendado', paciente: 'João Silva', coletor: 'Carlos Souza' },
        { id: 2, nome: 'Vacinação - Hepatite', data: '2024-11-20', status: 'Confirmado', paciente: 'Maria Oliveira', coletor: 'Ana Lima' },
        // Adicione mais exames simulados conforme necessário
    ]);
    const [exameParaCancelar, setExameParaCancelar] = useState(null);

    const handlePesquisaChange = (e) => {
        setPesquisa(e.target.value);
    };

    const handleCancelarExame = (id) => {
        setExames(exames.filter(exame => exame.id !== id));
        setExameParaCancelar(null);
        alert('Exame cancelado com sucesso!');
    };

    const handleAbrirModal = (id) => {
        setExameParaCancelar(id);
    };

    const handleFecharModal = () => {
        setExameParaCancelar(null);
    };

    const examesFiltrados = exames.filter(exame =>
        exame.nome.toLowerCase().includes(pesquisa.toLowerCase())
    );

    return (
        <div className="BuscarExames">
            <h2>Buscar e Cancelar Exames</h2>
            <div className="CaixaDeBusca">
                <input
                    type="text"
                    placeholder="Pesquise seu exame..."
                    value={pesquisa}
                    onChange={handlePesquisaChange}
                />
            </div>
            <div className="TabelaExames">
                {examesFiltrados.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Nome do Exame</th>
                                <th>Data</th>
                                <th>Status</th>
                                <th>Paciente</th>
                                <th>Coletor</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {examesFiltrados.map(exame => (
                                <tr key={exame.id}>
                                    <td>{exame.nome}</td>
                                    <td>{exame.data}</td>
                                    <td>{exame.status}</td>
                                    <td>{exame.paciente}</td>
                                    <td>{exame.coletor}</td>
                                    <td>
                                        <button
                                            className="btn-cancelar"
                                            onClick={() => handleAbrirModal(exame.id)}
                                        >
                                            Cancelar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Nenhum exame encontrado.</p>
                )}
            </div>

            {exameParaCancelar && (
                <div className="modal">
                    <div className="modal-content">
                        <p>Você tem certeza dessa decisão?</p>
                        <button className="btn-confirmar" onClick={() => handleCancelarExame(exameParaCancelar)}>
                            Sim
                        </button>
                        <button className="btn-cancelar" onClick={handleFecharModal}>
                            Não
                        </button>
                    </div>
                </div>
            )}
                
            <Link to="/exame"> 
                <button className="btn-voltar">Voltar</button>
            </Link>
        </div>
    );
}
