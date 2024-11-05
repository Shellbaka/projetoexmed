import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import { getUsers } from './controllers/userController.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.get('/users', getUsers);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});