import React from 'react';
import './Cadastro2.css';

function Cadastro2() {
  return (
    <div className="app">
      <div className="facebook-logo">
        <h1>Exmed</h1>
      </div>
      <div className="form-container">
        <h2>Criar uma nova conta</h2>
        <p>Preencha os campos abaixo para criar uma nova conta.</p>
        <form>
          {/* Nome e Sobrenome */}
          <div className="name-group">
            <input type="text" placeholder="Nome" required />
            <input type="text" placeholder="Sobrenome" required />
          </div>

          {/* Data de Nascimento */}
          <div className="input-group">
            <label>
              Data de nascimento
              <span className="info-icon">?</span>
            </label>
            <div className="select-group">
              <select>
                <option>Dia</option>
                {[...Array(31).keys()].map(day => (
                  <option key={day + 1} value={day + 1}>
                    {day + 1}
                  </option>
                ))}
              </select>
              <select>
                <option>Mês</option>
                {["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"].map((month, idx) => (
                  <option key={idx} value={month.toLowerCase()}>
                    {month}
                  </option>
                ))}
              </select>
              <select>
                <option>Ano</option>
                {Array.from({ length: 100 }, (_, i) => 2024 - i).map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Gênero */}
          <div className="input-group">
            <label>
              Gênero
              <span className="info-icon">?</span>
            </label>
            <div className="radio-group">
              <label>
                <input type="radio" name="gender" value="Feminino" /> Feminino
              </label>
              <label>
                <input type="radio" name="gender" value="Masculino" /> Masculino
              </label>
              <label>
                <input type="radio" name="gender" value="Personalizado" /> Personalizado
              </label>
            </div>
          </div>

          {/* E-mail e Senha */}
          <input type="email" placeholder="Celular ou email" required />
          <input type="password" placeholder="Nova senha" required />

          {/* Informações adicionais */}
          <p className="info-text">
            As pessoas que usam nosso serviço podem ter enviado suas informações de contato para o KWEEN. <a href="#">Saiba mais</a>
          </p>
          <p className="info-text">
            Ao clicar em Cadastre-se, você concorda com nossos <a href="#">Termos</a>, <a href="#">Política de Privacidade</a> e <a href="#">Política de Cookies</a>. Você poderá receber notificações por SMS e cancelar isso quando quiser.
          </p>

          {/* Botão de Cadastro */}
          <button type="submit" className="submit-btn">Cadastre-se</button>

          {/* Link para login */}
          <p className="login-link">Já tem uma conta? <a href="#">Entrar</a></p>
        </form>
      </div>
    </div>
  );
}

export default Cadastro2;
