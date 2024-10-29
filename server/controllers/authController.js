import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const authController = {
  register: async (req, res) => {
    const { cpf, password } = req.body;
    const userExists = User.findByCpf(cpf);
    if (userExists) return res.status(400).json({ message: 'Usuário já existe' });

    try {
      const user = await User.create(cpf, password);
      res.status(201).json({ message: 'Usuário registrado com sucesso', user });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao registrar usuário' });
    }
  },
  
  login: async (req, res) => {
    const { cpf, password } = req.body;
    const user = User.findByCpf(cpf);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    res.json({ message: 'Login bem-sucedido', token });
  },
};

export default authController;
