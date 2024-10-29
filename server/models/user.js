import bcrypt from 'bcrypt';

const users = [];

const User = {
  create: async (cpf, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { id: Date.now().toString(), cpf, password: hashedPassword };
    users.push(user);
    return user;
  },
  findByCpf: (cpf) => users.find(user => user.cpf === cpf),
};

export default User;