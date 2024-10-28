import { Link } from 'react-router-dom'; 
import './Exame.css';

export default function Exame() {
    return (
        <div className='Exame'>
            <div className='botao1'>
                <button>
                    <Link to="/agendar">Agendar Exame</Link> 
                </button>
                <div className='Agendar'>
                    <Link to="/agendar">
                        <img className='Agenda' src="public/exame.png" alt="Solicitar Exame" />
                    </Link>
                </div>
            </div>
            <div className='botao2'>
                <button>
                    <Link to="/resultado">Buscar Resultado</Link> 
                </button>
                <div className='Buscar'>
                    <Link to="/resultado">
                        <img className='Busca' src="public/exame2.jpeg" alt="Resultado Exames" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
