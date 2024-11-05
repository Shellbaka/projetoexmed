import React, { useState } from 'react';
import './Cadastro2.css';

function Cadastro2() {
  const [streetName, setStreetName] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [cep, setCep] = useState('');
  const [estado, setEstado] = useState(''); // Adicionando estado ao state

  const handleStreetNameChange = (event) => {
    setStreetName(event.target.value);
  };

  const handleStreetNumberChange = (event) => {
    const value = event.target.value.slice(0, 5);
    setStreetNumber(value);
  };

  const handleTelefoneChange = (event) => {
    let value = event.target.value.replace(/\D/g, '');
    value = value.slice(0, 11);
    setTelefone(value);
  };

  const handleCpfChange = (event) => {
    let value = event.target.value.replace(/\D/g, '');
    value = value.slice(0, 11);
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    setCpf(value);
  };

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
    const value = event.target.value.toUpperCase(); // Transformando para maiúsculas
    setEstado(value);
  };

  return (
    <div className="app">
      <div className="exmed-logo">
        <h1>Exmed</h1>
      </div>
      <div className="form-container">
        <h2>Criar uma nova conta</h2>
        <p>Solução completa para a sua saúde e bem-estar!</p>
        <hr className="title-line" /> {/* Linha horizontal abaixo do título */}
        
        <form>
          <input type="text" className="input-standard" placeholder="Nome Completo" required />

          <div className="input-group">
            <label>
              Data de nascimento
              <span className="info-icon">?</span>
            </label>
            <div className="select-group">
              <select className="input-standard">
                <option>Dia</option>
                {[...Array(31).keys()].map(day => (
                  <option key={day + 1} value={day + 1}>
                    {day + 1}
                  </option>
                ))}
              </select>
              <select className="input-standard">
                <option>Mês</option>
                {["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"].map((month, idx) => (
                  <option key={idx} value={month.toLowerCase()}>
                    {month}
                  </option>
                ))}
              </select>
              <select className="input-standard">
                <option>Ano</option>
                {Array.from({ length: 100 }, (_, i) => 2024 - i).map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="input-group">
            <label>
              Gênero
              <span className="info-icon">?</span>
            </label>
            <div className="radio-group">
              <label className="radio-option">
                <input type="radio" name="gender" value="Feminino" required />
                Feminino
              </label>
              <label className="radio-option">
                <input type="radio" name="gender" value="Masculino" required />
                Masculino
              </label>
            </div>
          </div>

          <input
            type="text"
            className="input-standard"
            placeholder="Telefone"
            value={telefone}
            onChange={handleTelefoneChange}
            required
          />

          <input
            type="text"
            className="input-standard"
            value={streetName}
            onChange={handleStreetNameChange}
            placeholder="Nome da Rua"
            required
          />

          <input
            type="text"
            className="input-standard"
            value={streetNumber}
            onChange={handleStreetNumberChange}
            placeholder="Número"
            required
          />

          <input type="text" className="input-standard" placeholder="Complemento" />
          <input type="text" className="input-standard" placeholder="Bairro" required />
          <input type="text" className="input-standard" placeholder="Cidade" required />

          {/* Campo de Estado com limitação de 2 caracteres */}
          <input
            type="text"
            className="input-standard"
            placeholder="Estado"
            maxLength="2" // Limita a 2 caracteres
            value={estado} // Adicionando o estado ao value
            onChange={handleEstadoChange} // Chamando a função para atualizar o estado
            required
          />

          <input
            type="text"
            className="input-standard"
            placeholder="CEP"
            value={cep}
            onChange={handleCepChange}
            required
          />

          <input
            type="text"
            className="input-standard"
            value={cpf}
            onChange={handleCpfChange}
            placeholder="CPF"
            required
          />

          <input
            type="password"
            className="input-standard input-password"
            placeholder="Senha"
            value={senha}
            onChange={handleSenhaChange}
            required
          />

          <button type="submit" className="submit-btn">Cadastre-se</button>

          <p className="login-link">Já tem uma conta? <a href="#">Entrar</a></p>
        </form>
      </div>
    </div>
  );
}

export default Cadastro2;
