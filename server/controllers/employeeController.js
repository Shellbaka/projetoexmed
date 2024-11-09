import { db } from "../db.js";
import { v4 as uuidv4 } from 'uuid';

export const getEmployees = async (_, res) => {
  const query = 'SELECT * FROM funcionario';

  try {
    const [data] = await db.query(query);
    return res.status(200).json(data);
  } catch (err) {
    console.error('Erro ao buscar usuários:', err);
    return res.status(500).json({ message: 'Erro ao buscar usuários', error: err });
  }
};

export const postEmployee = async (req, res) => {
    const query = `
      INSERT INTO Funcionario (ID_Funcionario, CPF, Email, Cargo_Funcionario, Nome_Funcionario, Descricao_Setor_Funcionario, Telefone, Genero, Senha)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
  
    const values = [
        uuidv4(),
        req.body.CPF,
        req.body.Email,
        req.body.Cargo_Funcionario,
        req.body.Nome_Funcionario,
        req.body.Descricao_Setor_Funcionario,
        req.body.Telefone,
        req.body.Genero,
        req.body.Senha,
    ];
  
    const checkEmailQuery = 'SELECT * FROM Funcionario WHERE Email = ?';
  
    try {
      const [results] = await db.query(checkEmailQuery, [req.body.Email]);
      
      if (results.length > 0) {
        return res.status(400).send('E-mail já está registrado.');
      }
  
      await db.query(query, values);
      return res.status(200).json("Usuário criado com sucesso");
  
    } catch (err) {
      console.error('Erro na operação:', err);
      return res.status(500).send('Erro ao processar a solicitação.');
    }
  };