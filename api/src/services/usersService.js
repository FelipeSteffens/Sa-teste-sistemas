class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }

    async createUser(userData) {
        // Validate user data (e.g., check for required fields)
        // Hash the password before saving
        const hashedPassword = await this.hashPassword(userData.password);
        userData.password = hashedPassword;

        return this.usersRepository.insertUser(userData);
    }

    async getUser(userId) {
        return this.usersRepository.findUserById(userId);
    }

    async updateUser(userId, userData) {
        // Validate user data
        if (userData.password) {
            userData.password = await this.hashPassword(userData.password);
        }
        return this.usersRepository.updateUser(userId, userData);
    }

    async deleteUser(userId) {
        return this.usersRepository.deleteUser(userId);
    }

    async hashPassword(password) {
        const bcrypt = require('bcrypt');
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    }
}

module.exports = UsersService;