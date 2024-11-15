import React, { useState } from 'react';
import axios from 'axios';
import './CadColetores.css';

function CadColetores() {
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [cargoFuncionario, setCargoFuncionario] = useState('');
  const [nomeFuncionario, setNomeFuncionario] = useState('');
  const [descricaoSetorFuncionario, setDescricaoSetorFuncionario] = useState('');
  const [telefone, setTelefone] = useState('');
  const [genero, setGenero] = useState('');
  const [senha, setSenha] = useState('');

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
    const cpfSemMascara = cpf.replace(/\D/g, '');

    try {
      const response = await axios.post('http://localhost:3000/cadcoletores', {
        CPF: cpfSemMascara,
        Email: email,
        Cargo_Funcionario: cargoFuncionario,
        Nome_Funcionario: nomeFuncionario,
        Descricao_Setor_Funcionario: descricaoSetorFuncionario,
        Telefone: telefone,
        Genero: genero,
        Senha: senha,
      });
      alert(response.data);
    } catch (error) {
      alert(error.response?.data || 'Erro ao cadastrar');
    }
  };

  return (
    <div className="app2">
      <div className="exmed-logo2">
        <img src="logoexmed.svg" alt="imglog" className="imglog" />
      </div>
      <div className="form-container2">
        <h2>Cadastro de Coletores</h2>
        <p>Complete os dados abaixo para um novo coleto.</p>
        <hr className="title-line2" />

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="input-standard2"
            placeholder="Nome Completo"
            value={nomeFuncionario}
            onChange={(e) => setNomeFuncionario(e.target.value)}
            required
          />
          <input
            type="text"
            className="input-standard2"
            placeholder="Cargo do Funcionário"
            value={cargoFuncionario}
            onChange={(e) => setCargoFuncionario(e.target.value)}
            required
          />
          <input
            type="text"
            className="input-standard2"
            placeholder="Descrição do Setor"
            value={descricaoSetorFuncionario}
            onChange={(e) => setDescricaoSetorFuncionario(e.target.value)}
            required
          />

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
              className="input-standard2"
              placeholder="Telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value.replace(/\D/g, '').slice(0, 11))}
              required
            />
              <input
            type="email"
            className="input-standard2"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
            <input
              type="text"
              className="input-standard2"
              placeholder="CPF"
              value={cpf}
              onChange={handleCpfChange}
              required
            />
          </div>

          <input
            type="password"
            className="input-standard2"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value.slice(0, 8))}
            required
          />

          <button type="submit" className="submit-btn2">Cadastrar</button>
          <p className="login-link2">Já tem uma conta? <a href="/login">Entrar</a></p>
        </form>
      </div>
    </div>
  );
}

export default CadColetores;
