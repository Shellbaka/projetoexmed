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
    const query = `SELECT * FROM ${table} WHERE email = ?`;
    const [rows] = await db.query(query, [email]);
    const user = rows[0];

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.Senha);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const name = userType === 'cliente' ? user.Nome_Cliente : user.Nome_Funcionario;
    
    const token = jwt.sign({ id: user.id, userType, name:name }, 
    process.env.JWT_SECRET || 'default_secret', { expiresIn: '1h' });

    res.json({ token, userType, name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};