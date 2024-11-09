import React, { useState } from 'react';
<<<<<<< HEAD:src/pages/Clientes/CadClientes.jsx
import './CadClientes.css';

function CadColetores() {
  const [streetName, setStreetName] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [cep, setCep] = useState('');
  const [estado, setEstado] = useState('');
=======
import axios from 'axios';
import './Cadastro2.css';

function Cadastro2() {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    dataNascimento: { dia: '', mes: '', ano: '' },
    genero: '',
    telefone: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
    cpf: '',
    email: '',
    senha: '',
  });
>>>>>>> dc9954cfc2b8c480aded22918082d69a1ca200cf:src/pages/Cadastro2/Cadastro2.jsx

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDataNascimentoChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      dataNascimento: { ...prevData.dataNascimento, [name]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Formatação da data de nascimento para o formato AAAA-MM-DD
    const dataNascimentoFormatada = `${formData.dataNascimento.ano}-${String(formData.dataNascimento.mes).padStart(2, '0')}-${String(formData.dataNascimento.dia).padStart(2, '0')}`;

    // Estrutura de dados para enviar ao backend
    const dataToSend = {
      Nome_Cliente: formData.nomeCompleto,
      Data_Nascimento: dataNascimentoFormatada,
      Genero: formData.genero,
      Telefone: formData.telefone,
      Rua: formData.rua,
      Numero: formData.numero,
      Complemento: formData.complemento || null,
      Bairro: formData.bairro,
      Cidade: formData.cidade,
      Estado: formData.estado,
      CEP: formData.cep,
      CPF: formData.cpf,
      Email: formData.email,
      Senha: formData.senha,
    };

<<<<<<< HEAD:src/pages/Clientes/CadClientes.jsx
  const handleCepChange = (event) => {
    let value = event.target.value.replace(/\D/g, '');
    value = value.slice(0, 8);
    setCep(value);
  };

  const handleSenhaChange = (event) => {
    const value = event.target.value.slice(0, 8);
    setSenha(value);
  };

  const handleEstadoChange = (event) => {
    const value = event.target.value.toUpperCase();
    setEstado(value);
=======
    try {
      const response = await axios.post('http://localhost:3000/cadastro2', dataToSend);
      alert(response.data);
    } catch (error) {
      console.error('Erro no cadastro:', error);
      alert('Erro ao realizar o cadastro');
    }
>>>>>>> dc9954cfc2b8c480aded22918082d69a1ca200cf:src/pages/Cadastro2/Cadastro2.jsx
  };

  return (
    <div className="app">
      <div className="exmed-logo">
        <img src="public/logoexmed.svg" alt="imglog" className="imglog" />
      </div>
      <div className="form-container">
        <h2>Criar uma nova conta</h2>
        <p>Solução completa para a sua saúde e bem-estar!</p>
        <hr className="title-line" />

<<<<<<< HEAD:src/pages/Clientes/CadClientes.jsx
        <form>
          <input type="text" className="input-standard" placeholder="Nome Completo" required />

          <div className="input-group">
            <label>
              Data de nascimento
              <span className="info-icon">
                ?
                <span className="tooltip-text">Selecione o dia, mês e ano. Exemplo: 15/03/1990</span>
              </span>
            </label>
=======
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nomeCompleto"
            className="input-standard"
            placeholder="Nome Completo"
            value={formData.nomeCompleto}
            onChange={handleInputChange}
            required
          />

          <div className="input-group">
            <label>Data de nascimento</label>
>>>>>>> dc9954cfc2b8c480aded22918082d69a1ca200cf:src/pages/Cadastro2/Cadastro2.jsx
            <div className="select-group">
              <select
                name="dia"
                className="input-standard"
                value={formData.dataNascimento.dia}
                onChange={handleDataNascimentoChange}
                required
              >
                <option value="">Dia</option>
                {[...Array(31).keys()].map((day) => (
                  <option key={day + 1} value={day + 1}>
                    {day + 1}
                  </option>
                ))}
              </select>
              <select
                name="mes"
                className="input-standard"
                value={formData.dataNascimento.mes}
                onChange={handleDataNascimentoChange}
                required
              >
                <option value="">Mês</option>
                {["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"].map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                name="ano"
                className="input-standard"
                value={formData.dataNascimento.ano}
                onChange={handleDataNascimentoChange}
                required
              >
                <option value="">Ano</option>
                {Array.from({ length: 100 }, (_, i) => 2024 - i).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

<<<<<<< HEAD:src/pages/Clientes/CadClientes.jsx
          <div className="input-group genero">
            <label>
              Gênero
              <span className="info-icon">
                ?
                <span className="tooltip-text">Selecione o gênero com o qual você se identifica.</span>
              </span>
            </label>
=======
          <div className="input-group">
            <label>Gênero</label>
>>>>>>> dc9954cfc2b8c480aded22918082d69a1ca200cf:src/pages/Cadastro2/Cadastro2.jsx
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="genero"
                  value="Feminino"
                  onChange={handleInputChange}
                  required
                />
                Feminino
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="genero"
                  value="Masculino"
                  onChange={handleInputChange}
                  required
                />
                Masculino
              </label>
            </div>
          </div>

<<<<<<< HEAD:src/pages/Clientes/CadClientes.jsx
          <div className="input-group">
            <label>
              Dados
              <span className="info-icon">
                ?
                <span className="tooltip-text">Preencha seus dados pessoais para cadastro.</span>
              </span>
            </label>
            <input
              type="text"
              className="input-standard input-telefone"
              placeholder="Telefone"
              value={telefone}
              onChange={handleTelefoneChange}
              required
            />
            <input
              type="text"
              className="input-standard input-street-name"
              value={streetName}
              onChange={handleStreetNameChange}
              placeholder="Nome da Rua"
              required
            />
            <input
              type="text"
              className="input-standard input-street-number"
              value={streetNumber}
              onChange={handleStreetNumberChange}
              placeholder="Número"
              required
            />
            <input type="text" className="input-standard input-complemento" placeholder="Complemento" />
            <input type="text" className="input-standard input-bairro" placeholder="Bairro" required />
            <input type="text" className="input-standard input-cidade" placeholder="Cidade" required />
            <input
              type="text"
              className="input-standard input-estado"
              placeholder="Estado"
              maxLength="2"
              value={estado}
              onChange={handleEstadoChange}
              required
            />
            <input
              type="text"
              className="input-standard input-cep"
              placeholder="CEP"
              value={cep}
              onChange={handleCepChange}
              required
            />
            <input
              type="text"
              className="input-standard input-cpf"
              value={cpf}
              onChange={handleCpfChange}
              placeholder="CPF"
              required
            />
          </div>
=======
          <input
            type="tel"
            name="telefone"
            className="input-standard"
            placeholder="Telefone"
            value={formData.telefone}
            onChange={handleInputChange}
            required
          />

          <input
            type="text"
            name="rua"
            className="input-standard"
            placeholder="Nome da Rua"
            value={formData.rua}
            onChange={handleInputChange}
            required
          />

          <input
            type="text"
            name="numero"
            className="input-standard"
            placeholder="Número"
            value={formData.numero}
            onChange={handleInputChange}
            required
          />

          <input
            type="text"
            name="complemento"
            className="input-standard"
            placeholder="Complemento"
            value={formData.complemento}
            onChange={handleInputChange}
          />

          <input
            type="text"
            name="bairro"
            className="input-standard"
            placeholder="Bairro"
            value={formData.bairro}
            onChange={handleInputChange}
            required
          />

          <input
            type="text"
            name="cidade"
            className="input-standard"
            placeholder="Cidade"
            value={formData.cidade}
            onChange={handleInputChange}
            required
          />

          <input
            type="text"
            name="estado"
            className="input-standard"
            placeholder="Estado"
            maxLength="2"
            value={formData.estado}
            onChange={handleInputChange}
            required
          />

          <input
            type="text"
            name="cep"
            className="input-standard"
            placeholder="CEP"
            value={formData.cep}
            onChange={handleInputChange}
            required
          />

          <input
            type="text"
            name="cpf"
            className="input-standard"
            placeholder="CPF"
            value={formData.cpf}
            onChange={handleInputChange}
            required
          />

          <input
            type="email"
            name="email"
            className="input-standard"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
>>>>>>> dc9954cfc2b8c480aded22918082d69a1ca200cf:src/pages/Cadastro2/Cadastro2.jsx

          <input
            type="password"
            name="senha"
            className="input-standard input-password"
            placeholder="Senha"
            value={formData.senha}
            onChange={handleInputChange}
            required
          />

          <button type="submit" className="submit-btn">Cadastre-se</button>

          <p className="login-link">
            Já tem uma conta? <a href="#">Entrar</a>
          </p>
        </form>
      </div>
    </div>
  );
}

<<<<<<< HEAD:src/pages/Clientes/CadClientes.jsx
export default CadColetores;
=======
export default Cadastro2;
>>>>>>> dc9954cfc2b8c480aded22918082d69a1ca200cf:src/pages/Cadastro2/Cadastro2.jsx
