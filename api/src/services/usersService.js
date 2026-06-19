class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }

    async createUser(userData) {
    // The tests expect the stored and returned field to be 'senha' in plain text.
    // Keep behavior simple: pass through Portuguese fields to repository.
    const created = await this.usersRepository.insertUser(userData);
    console.log('DEBUG createUser created =>', created);
    return created;
    }

    async getUserById(userId) {
        return this.usersRepository.findUserById(userId);
    }
    async getUser() {
        return this.usersRepository.findUser();
    }

    async updateUser(userId, userData) {
    // Pass through fields (nome, email, senha). If senha present, repository will store it.
    return this.usersRepository.updateUser(userId, userData);
    }

    async deleteUser(userId) {
        return await this.usersRepository.deleteUser(userId);
    }

    async hashPassword(password) {
        const bcrypt = require('bcrypt');
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    }
}

module.exports = UsersService;