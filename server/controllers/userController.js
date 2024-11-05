import { db } from "../db.js";

export const getUsers = (_, res) => {
  const query = 'SELECT * FROM cliente';

  db.query(query, (err, data) => {
    if (err) return res.status(500).json({ message: 'Erro ao buscar usuários', error: err });

    return res.status(200).json(data);
  });
};


// export const addUser = (req, res) => {
//     const query = 'INSERT INTO cliente(`cpf`, `telefone`, `endereco`, `data_nascimento`) VALUES(?)';

//     const values = [
//         req.body.cpf,
//         req.body.telefone,
//         req.body.endereco,
//         req.nome.data_nascimento,
//     ];

//     const checkEmailQuery = 'SELECT * FROM usuarios WHERE email = ?';
//     if (err) {
//         console.error('Erro ao verificar o e-mail:', err);
//         res.status(500).send('Erro ao verificar o e-mail.');
//       } else if (results.length > 0) {
//         // Se houver resultado, o e-mail já está em uso
//         res.status(400).send('E-mail já está registrado.');
//       } else {
//         // Se o e-mail não estiver em uso, prossegue para a inserção
//     }
// }