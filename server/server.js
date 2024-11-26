import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { loginUser } from "./controllers/authController.js";
import { getUsers, postUser, getUserById } from "./controllers/userController.js";
import { getEmployees, postEmployee, getEmployeeById } from "./controllers/employeeController.js"; // Removido updatePurchaseStatus

dotenv.config();
const app = express();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

/* Rotas de login */
app.post("/login", loginUser);

/* Rotas de usuários */
app.get("/users", getUsers);
app.get("/users/:id", getUserById);
app.post("/cadclientes", postUser);

/* Rotas de funcionários */
app.get("/employees", getEmployees);
app.get("/employees/:id", getEmployeeById);
app.post("/cadcoletores", postEmployee);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
