import { db } from "../db.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

export const getUsers = async (_, res) => {
  const query = "SELECT * FROM cliente";

  try {
    const [data] = await db.query(query);
    return res.status(200).json(data);
  } catch (err) {
    console.error("Erro ao buscar usuários:", err);
    return res.status(500).json({ message: "Erro ao buscar usuários", error: err });
  }
};

export const getUserById = async (req, res) => {
  const query = "SELECT * FROM Cliente WHERE ID_Cliente = ?";
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

export const postUser = async (req, res) => {
  const query = `
    INSERT INTO Cliente (ID_Cliente, CPF, Email, Telefone, Rua, Numero, Complemento, Bairro, Cidade, Estado, CEP, Nome_Cliente, Data_Nascimento, Genero, Senha)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const hashedPassword = await bcrypt.hash(req.body.Senha, 10);

  const values = [
    uuidv4(),
    req.body.CPF,
    req.body.Email,
    req.body.Telefone,
    req.body.Rua,
    req.body.Numero,
    req.body.Complemento,
    req.body.Bairro,
    req.body.Cidade,
    req.body.Estado,
    req.body.CEP,
    req.body.Nome_Cliente,
    req.body.Data_Nascimento,
    req.body.Genero,
    hashedPassword,
  ];

  try {
    const checkEmailQuery = "SELECT * FROM Cliente WHERE Email = ?";
    const [results] = await db.query(checkEmailQuery, [req.body.Email]);

    if (results.length > 0) {
      return res.status(400).send("E-mail já está registrado.");
    }

    await db.query(query, values);
    return res.status(200).json("Usuário criado com sucesso!");
  } catch (err) {
    console.error("Erro na operação:", err);
    return res.status(500).send("Erro ao processar a solicitação.");
  }
};
