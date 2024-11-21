import jwt from 'jsonwebtoken';
import { db } from "../db.js";
import bcrypt from 'bcrypt';

export const loginUser = async (req, res) => {
  const { email, password, userType } = req.body;

  if (!['cliente', 'funcionario'].includes(userType)) {
    return res.status(400).json({ error: 'Tipo de usuário inválido.' });
  }

  const table = userType === 'cliente' ? 'cliente' : 'funcionario';

  try {
    // Busca o usuário pelo e-mail
    const query = `SELECT * FROM ${table} WHERE email = ?`;
    const [rows] = await db.query(query, [email]);
    const user = rows[0];

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // Verifica a senha
    const isPasswordValid = await bcrypt.compare(password, user.Senha);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    // Gera o token JWT
    const token = jwt.sign({ id: user.ID_Cliente || user.ID_Funcionario, userType }, 'seu_segredo', { expiresIn: '1h' });

    // Retorna o token e o nome do usuário
    res.json({ token, userType, name: user.Nome_Cliente || user.Nome_Funcionario });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

// Rota adicional para buscar dados do usuário autenticado
export const getUserData = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido.' });
  }

  try {
    // Decodifica o token JWT
    const decoded = jwt.verify(token, 'seu_segredo');
    const { id, userType } = decoded;

    // Define a tabela com base no tipo de usuário
    const table = userType === 'cliente' ? 'cliente' : 'funcionario';
    const query = `SELECT Nome_Cliente, Nome_Funcionario FROM ${table} WHERE ${userType === 'cliente' ? 'ID_Cliente' : 'ID_Funcionario'} = ?`;

    // Busca os dados do usuário
    const [rows] = await db.query(query, [id]);
    const user = rows[0];

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // Retorna o nome do usuário
    res.json({
      Nome_Cliente: user.Nome_Cliente || user.Nome_Funcionario,
    });
  } catch (err) {
    console.error('Erro ao validar o token:', err);
    res.status(401).json({ error: 'Token inválido ou expirado.' });
  }
};
