import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

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
    const { email, password, userType } = req.body;

    // Simulação de busca no banco com base no email e tipo de usuário
    const user = await User.findOne({ email, userType });
    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado ou tipo incorreto' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Gerar token JWT com ID do usuário e tipo
    const token = jwt.sign(
      { id: user.id, userType: user.type },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({
      message: 'Login bem-sucedido',
      token,
      userType: user.type, // Retorna o tipo de usuário para redirecionamento
    });
  },


  forgotPassword: async (req, res) => {
    const { cpf } = req.body;
    const user = User.findByCpf(cpf);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
    const mailOptions = {
      to: user.email,
      subject: 'Recuperação de Senha',
      text: `Clique no link para redefinir sua senha: ${resetLink}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.json({ message: 'E-mail de recuperação enviado' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao enviar e-mail' });
    }
  },

  resetPassword: async (req, res) => {
    const { token, newPassword } = req.body;

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = User.findById(decoded.id);

      if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

      user.password = await bcrypt.hash(newPassword, 10);
      res.json({ message: 'Senha redefinida com sucesso' });
    } catch (error) {
      res.status(400).json({ message: 'Token inválido ou expirado' });
    }
  },
};

export default authController;
