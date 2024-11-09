import mysql from "mysql2/promise";

export const db = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "exmed"
});

db.connect()
  .then(() => {
    console.log('Conectado ao banco de dados.');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });

export default db;