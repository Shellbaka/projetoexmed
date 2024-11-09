import React, { useState } from 'react';
import axios from 'axios';
import './CadClientes.css';

function CadClientes() {
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

  const handleCepChange = (event) => {
    let value = event.target.value.replace(/\D/g, '').slice(0, 8);
    setFormData((prevData) => ({ ...prevData, cep: value }));
  };

  const handleEstadoChange = (event) => {
    const value = event.target.value.toUpperCase().slice(0, 2);
    setFormData((prevData) => ({ ...prevData, estado: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataNascimentoFormatada = `${formData.dataNascimento.ano}-${String(formData.dataNascimento.mes).padStart(2, '0')}-${String(formData.dataNascimento.dia).padStart(2, '0')}`;

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

    axios.post('http://localhost:3000/cadclientes', dataToSend)
      .then((response) => {
        console.log(response.data);
        alert("Usuário criado com sucesso!");
      })
      .catch((error) => {
        console.error('Erro ao cadastrar usuário:', error);
        alert("Erro ao cadastrar usuário.");
      });
  };

  return (
    <div className="app">
      <div className="exmed-logo">
        <img src="logoexmed.svg" alt="imglog" className="imglog" />
      </div>
      <div className="form-container">
        <h2>Criar uma nova conta</h2>
        <p>Solução completa para a sua saúde e bem-estar!</p>
        <hr className="title-line" />

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="input-standard"
            placeholder="Nome Completo"
            name="nomeCompleto"
            value={formData.nomeCompleto}
            onChange={handleInputChange}
            required
          />
          
          <div className="input-group">
            <label>Data de nascimento</label>
            <div className="select-group">
              <select
                name="dia"
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
                value={formData.dataNascimento.mes}
                onChange={handleDataNascimentoChange}
                required
              >
                <option value="">Mês</option>
                {[...Array(12).keys()].map((month) => (
                  <option key={month + 1} value={month + 1}>
                    {month + 1}
                  </option>
                ))}
              </select>
              <select
                name="ano"
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

          <div className="input-group genero">
            <label>Gênero</label>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="genero"
                  value="Feminino"
                  checked={formData.genero === 'Feminino'}
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
                  checked={formData.genero === 'Masculino'}
                  onChange={handleInputChange}
                  required
                />
                Masculino
              </label>
            </div>
          </div>

          <input
            type="text"
            name="cpf"
            placeholder="CPF"
            value={formData.cpf}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="telefone"
            placeholder="Telefone"
            value={formData.telefone}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="rua"
            placeholder="Rua"
            value={formData.rua}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="numero"
            placeholder="Número"
            value={formData.numero}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="complemento"
            placeholder="Complemento"
            value={formData.complemento}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="bairro"
            placeholder="Bairro"
            value={formData.bairro}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="cidade"
            placeholder="Cidade"
            value={formData.cidade}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="estado"
            placeholder="Estado"
            value={formData.estado}
            onChange={handleEstadoChange}
            required
          />
          <input
            type="text"
            name="cep"
            placeholder="CEP"
            value={formData.cep}
            onChange={handleCepChange}
            required
          />
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={formData.senha}
            onChange={handleInputChange}
            required
          />

          <button type="submit" className="submit-btn">
            Cadastre-se
          </button>
          <p className="login-link">
            Já tem uma conta? <a href="/login">Entrar</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default CadClientes;