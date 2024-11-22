import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { loginUser } from './controllers/authController.js';
import { getUsers, postUser, getUserById } from './controllers/userController.js';
import { getEmployees, postEmployee, getEmployeeById } from './controllers/employeeController.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.post('/login', loginUser);

app.get('/users', getUsers);
app.get('/users/:id', getUserById);
app.post('/cadclientes', postUser);

app.get('/employees', getEmployees);
app.get('/employees/:id', getEmployeeById);
app.post('/cadcoletores', postEmployee);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});