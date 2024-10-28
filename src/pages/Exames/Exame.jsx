import './Exame.css';

export default function Exame() {
    return (
        <div className='Exame'>
           

            <div className='botao1'>
                <button>Agendar Exame</button>
            <div className='Agendar'>
                <a href='#Agendamento'>
                    <img className='Agenda' src="https://veja.abril.com.br/wp-content/uploads/2017/05/mulher-fazendo-exame-20150316-001.jpg?quality=70&strip=info&w=1280&h=720&crop=1" alt="Solicitar Exame"></img>
                </a>
            </div>
            </div>
            <div className='botao2'>
                <button>Buscar Resultado</button>
            <div className='Buscar'>
                <a href='#Resultado'>
                    <img className='Busca' src="https://www.qvsaude.com.br/wp-content/uploads/elementor/thumbs/exames-de-rotina-pofghcnvlxephxjf2r5mg7955jctuxqutrokodsia0.jpg" alt="Resultado Exames"></img>
                </a>
            </div>
            </div>
        </div>
    );
};

