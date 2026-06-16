class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }

    async createUser(userData) {
        const hashedPassword = await this.hashPassword(userData.password);
        userData.password = hashedPassword;

        return this.usersRepository.insertUser(userData);
    }

    async getUserById(userId) {
        return this.usersRepository.findUserById(userId);
    }
    async getUser() {
        return this.usersRepository.findUser();
    }

    async updateUser(userId, userData) {
        if (userData.password) {
            userData.password = await this.hashPassword(userData.password);
        }
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