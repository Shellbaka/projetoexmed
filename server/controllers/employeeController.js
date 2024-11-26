import { db } from "../db.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

export const getEmployees = async (_, res) => {
  const query = "SELECT * FROM Funcionario";

  try {
    const [data] = await db.query(query);
    return res.status(200).json(data);
  } catch (err) {
    console.error("Erro ao buscar usuários:", err);
    return res.status(500).json({ message: "Erro ao buscar usuários", error: err });
  }
};

export const getEmployeeById = async (req, res) => {
  const query = "SELECT * FROM Funcionario WHERE ID_Funcionario = ?";
  const userId = req.params.id;

  try {
    const [data] = await db.query(query, [userId]);

    if (data.length === 0) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.status(200).json(data[0]);
  } catch (err) {
    console.error("Erro ao buscar usuário por ID:", err);
    return res.status(500).json({ message: "Erro ao buscar usuário", error: err });
  }
};

export const postEmployee = async (req, res) => {
  const query = `
      INSERT INTO Funcionario (ID_Funcionario, CPF, Email, Data_Nascimento, Cargo_Funcionario, Nome_Funcionario, Descricao_Setor_Funcionario, Telefone, Genero, Senha)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

  const hashedPassword = await bcrypt.hash(req.body.Senha, 10);

  const values = [
    uuidv4(),
    req.body.CPF,
    req.body.Email,
    req.body.Data_Nascimento,
    req.body.Cargo_Funcionario,
    req.body.Nome_Funcionario,
    req.body.Descricao_Setor_Funcionario,
    req.body.Telefone,
    req.body.Genero,
    hashedPassword,
  ];

  try {
    const checkEmailQuery = "SELECT * FROM Funcionario WHERE Email = ?";
    const [results] = await db.query(checkEmailQuery, [req.body.Email]);

    if (results.length > 0) {
      return res.status(400).send("E-mail já está registrado.");
    }

    await db.query(query, values);
    return res.status(200).json("Usuário criado com sucesso. Confira o seu e-mail registrado!");
  } catch (err) {
    console.error("Erro na operação:", err);
    return res.status(500).send("Erro ao processar a solicitação.");
  }
};
