import { useState } from 'react';
import './Cadastro2.css';

function Cadastro2() {
    const [formData, setFormData] = useState({

        endereco: '',
        numero: '',
        cpf: '',
        contato: '',

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
                <h2>Cadastro</h2>
                <label>
                    Endereço:
                    <input
                        type="text"
                        name="Endereco"
                        value={formData.endereco}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Número:
                    <input
                        type="text"
                        name="numero"
                        value={formData.numero}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    CPF:
                    <input
                        type="text"
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleChange}
                        required
                    />
                </label>

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
                
                   
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
}

export default Cadastro2;
