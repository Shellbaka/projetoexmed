import React, { useState } from 'react';
import axios from 'axios';
import './CadColetores.css';
import zxcvbn from 'zxcvbn';
import { useNavigate } from 'react-router-dom';

function CadColetores() {
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [cargoFuncionario, setCargoFuncionario] = useState('');
  const [nomeFuncionario, setNomeFuncionario] = useState('');
  const [descricaoSetorFuncionario, setDescricaoSetorFuncionario] = useState('');
  const [telefone, setTelefone] = useState('');
  const [genero, setGenero] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaForca, setSenhaForca] = useState(0); // Novo estado
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

  const handleSenhaChange = (event) => {
    const senhaInput = event.target.value.slice(0, 8);
    setSenha(senhaInput);

    const avaliacao = zxcvbn(senhaInput);
    setSenhaForca(avaliacao.score); 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const dataNascimento = `${anoNascimento}-${mesNascimento}-${diaNascimento}`;
    const cpfSemMascara = cpf.replace(/\D/g, '');

    try {
      const response = await axios.post('http://localhost:3000/cadcoletores', {
        CPF: cpfSemMascara,
        Email: email,
        Data_Nascimento: dataNascimento,
        Cargo_Funcionario: cargoFuncionario,
        Nome_Funcionario: nomeFuncionario,
        Descricao_Setor_Funcionario: descricaoSetorFuncionario,
        Telefone: telefone,
        Genero: genero,
        Senha: senha,
      });
      alert(response.data);
      navigate('/');
    } catch (error) {
      alert(error.response?.data || 'Erro ao cadastrar');
    }
  };

  const getSenhaForcaLabel = () => {
    const labels = ['Muito Fraca', 'Fraca', 'Razoável', 'Forte', 'Muito Forte'];
    return labels[senhaForca];
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
            onChange={handleSenhaChange}
            required
          />
          <div className="senha-strength">
            Força da senha: {getSenhaForcaLabel()}
          </div>

          <button type="submit" className="submit-btn2">Cadastrar</button>
          <p className="login-link2">Já tem uma conta? <a href="/login">Entrar</a></p>
        </form>
      </div>
    </div>
  );
}

export default CadColetores;
