import './Home.css';

export default function Home() {
    return (
        <div className="home">
            <div className='ConteinerText'>
                <h2 className='preto'>
                    Cuidar da sua saúde
                </h2>
                <h2 className="vermeio">nunca foi tão fácil</h2>
            </div>
            <p>
                Tenha acesso a uma nova experiência
                de cuidados com a
                saúde a partir de R$ 19,90/mês.
            </p>
            <button className='Seja'>
                <a>
                    Seja Exmed
                </a>
            </button>
            <div>
                <img className='ExmedP' src="https://www.valencis.com.br/wp-content/uploads/2017/05/Enfermagem-1.png" alt="Paciente Exmed" />
            </div>
        </div>
    );
};