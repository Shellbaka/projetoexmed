import './Home.css';

export default function Home() {
    return (
        <div className="home">
            <div className="content">
                <h1>
                    Cuidar da sua saúde <br />
                    <span className="highlight">nunca foi tão fácil.</span>
                </h1>
                <p>Tenha acesso a uma nova experiência de cuidados com a saúde a partir de <strong>R$ 24,90/mês</strong>.</p>
                <button className="cta-button">
                    Seja Exmed
                </button>
            </div>
            <div className="image-container">
                <img
                    src="https://www.exmed.com.br/_next/image/?url=%2F_next%2Fstatic%2Fmedia%2Fwoman-cell-phone.ee7ac01c.png&w=640&q=75"
                    alt="Paciente Exmed"
                    className="promo-image"
                />
            </div>
        </div>
    );
}
