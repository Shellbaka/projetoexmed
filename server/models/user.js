import { db } from "../db.js";

const User = {
  // Função para buscar um usuário pelo email e userType
  async findOne({ email, userType }) {
    console.log("Buscando usuário com:", email, userType);

    const query = "SELECT * FROM Cliente WHERE Email = ? AND userType = ?";
    const [results] = await db.query(query, [email, userType]);
    
    // Retorna o primeiro usuário encontrado ou null
    return results.length > 0 ? results[0] : null;
  },

  // Função para buscar usuário pelo CPF
  async findByCpf(cpf) {
    const query = "SELECT * FROM Cliente WHERE CPF = ?";
    const [results] = await db.query(query, [cpf]);
    return results.length > 0 ? results[0] : null;
  },

  // Função para buscar usuário pelo ID
  async findById(id) {
    const query = "SELECT * FROM Cliente WHERE ID_Cliente = ?";
    const [results] = await db.query(query, [id]);
    return results.length > 0 ? results[0] : null;
  },

  // Função para criar um novo usuário
  async create(cpf, password) {
    const query = "INSERT INTO Cliente (CPF, Senha) VALUES (?, ?)";
    const result = await db.query(query, [cpf, password]);
    return result;
  }
};

export default User;
