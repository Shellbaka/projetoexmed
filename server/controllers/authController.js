import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

const authController = {
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
      const user = User.findById(decoded.id); // Supondo que exista um método findById

      if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

      user.password = await bcrypt.hash(newPassword, 10);
      res.json({ message: 'Senha redefinida com sucesso' });
    } catch (error) {
      res.status(400).json({ message: 'Token inválido ou expirado' });
    }
  },
};

export default authController;
