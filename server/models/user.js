import bcrypt from 'bcrypt';

const users = []; 

const User = {
  create: async (cpf, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { id: Date.now().toString(), cpf, password: hashedPassword, email: `${cpf}@exemplo.com` };
    users.push(user);
    return user;
  },
  findByCpf: (cpf) => users.find(user => user.cpf === cpf),
  findById: (id) => users.find(user => user.id === id),
};

export default User;
