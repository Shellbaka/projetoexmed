import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CadClientes.css';

function CadClientes() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [streetName, setStreetName] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cep, setCep] = useState('');
  const [senha, setSenha] = useState('');
  const [genero, setGenero] = useState('');
  const [diaNascimento, setDiaNascimento] = useState('');
  const [mesNascimento, setMesNascimento] = useState('');
  const [anoNascimento, setAnoNascimento] = useState('');

  const navigate = useNavigate();

  const handleCpfChange = (event) => {
    const rawCpf = event.target.value.replace(/\D/g, '').slice(0, 11);
    setCpf(formatarCpf(rawCpf));
  };

  const formatarCpf = (cpf) => {
    return cpf
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    

    const dataNascimento = `${anoNascimento}-${mesNascimento}-${diaNascimento}`;
    const cpfSemMascara = cpf.replace(/\D/g, '');

    try {
      const response = await axios.post('http://localhost:3000/cadclientes', {
        Nome_Cliente: nome,
        CPF: cpfSemMascara,
        Email: email,
        Telefone: telefone,
        Rua: streetName,
        Numero: streetNumber,
        Complemento: complemento,
        Bairro: bairro,
        Cidade: cidade,
        Estado: estado,
        CEP: cep,
        Data_Nascimento: dataNascimento,
        Genero: genero,
        Senha: senha,
      });
      alert(response.data);
      navigate('/login');
    } catch (error) {
      alert(error.response?.data || 'Erro ao cadastrar');
    }
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
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <input
            type="email"
            className="input-standard"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="input-group">
            <label>Data de nascimento:<span className="info-icon" title="Escolha o dia, mês e ano de seu nascimento.">?</span></label>
            <div className="select-group">
              <select className="input-standard" onChange={(e) => setDiaNascimento(e.target.value)} required>
                <option value="">Dia</option>
                {[...Array(31).keys()].map(day => (
                  <option key={day + 1} value={String(day + 1).padStart(2, '0')}>
                    {day + 1}
                  </option>
                ))}
              </select>
              <select className="input-standard" onChange={(e) => setMesNascimento(e.target.value)} required>
                <option value="">Mês</option>
                {["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"].map((month, idx) => (
                  <option key={idx} value={month}>
                    {["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"][idx]}
                  </option>
                ))}
              </select>
              <select className="input-standard" onChange={(e) => setAnoNascimento(e.target.value)} required>
                <option value="">Ano</option>
                {Array.from({ length: 100 }, (_, i) => 2024 - i).map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="input-group genero">
          <label>Gênero:<span className="info-icon" title="Escolha seu gênero conforme identificação.">?</span></label>
            <div className="radio-group">
              <label className="radio-option">
                <input type="radio" name="gender" value="Feminino" onChange={(e) => setGenero(e.target.value)} required />
                Feminino
              </label>
              <label className="radio-option">
                <input type="radio" name="gender" value="Masculino" onChange={(e) => setGenero(e.target.value)} required />
                Masculino
              </label>
            </div>
          </div>

          <div className="input-group">
            <label>Dados:<span className="info-icon" title="Insira seus dados de identificação.">?</span></label>
            <input
              type="text"
              className="input-standard"
              placeholder="CPF"
              value={cpf}
              onChange={handleCpfChange}
              required
            />
            <input
              type="text"
              className="input-standard"
              placeholder="Telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value.replace(/\D/g, '').slice(0, 11))}
              required
            />
            <input
              type="text"
              className="input-standard"
              placeholder="Nome da Rua"
              value={streetName}
              onChange={(e) => setStreetName(e.target.value)}
              required
            />
            <input
              type="text"
              className="input-standard"
              placeholder="Número"
              value={streetNumber}
              onChange={(e) => setStreetNumber(e.target.value.slice(0, 5))}
              required
            />
            <input type="text" className="input-standard" placeholder="Complemento" value={complemento} onChange={(e) => setComplemento(e.target.value)} />
            <input type="text" className="input-standard" placeholder="Bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} required />
            <input type="text" className="input-standard" placeholder="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} required />
            <input
              type="text"
              className="input-standard"
              placeholder="Estado"
              maxLength="2"
              value={estado}
              onChange={(e) => setEstado(e.target.value.toUpperCase())}
              required
            />
            <input
              type="text"
              className="input-standard"
              placeholder="CEP"
              value={cep}
              onChange={(e) => setCep(e.target.value.replace(/\D/g, '').slice(0, 8))}
              required
            />
          </div>

          <input
            type="password"
            className="input-standard"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value.slice(0, 8))}
            required
          />

          <button type="submit" className="submit-btn">Cadastre-se</button>
         <p className="login-link">Já tem uma conta? <a href="/login">Entrar</a></p>
        </form>
      </div>
    </div>
  );
}

export default CadClientes;