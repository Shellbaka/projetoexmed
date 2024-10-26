import { useState } from 'react';
import './Loguin.css';

function Loguin() {
    const [formData, setFormData] = useState({

        email: '',
        senha: '',

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica de envio do formulário
        console.log(formData);
    };

    return (
        <div className="container">
            <div className="avatar">
                <img src="public/logoexmed.svg" alt="Avatar" />
            </div>
            <form onSubmit={handleSubmit} className="form">
                <h2>Loguin</h2>

                <label>
                    E-mail:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Senha:
                    <input
                        type="password"
                        name="senha"
                        value={formData.senha}
                        onChange={handleChange}
                        required
                    />
                </label>

                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}

export default Loguin;
