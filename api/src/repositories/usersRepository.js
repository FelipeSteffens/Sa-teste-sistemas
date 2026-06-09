class UsersRepository {
    constructor(pool) {
        this.pool = pool;
    }

    async insertUser(user) {
        const { name, email, password } = user;
        const query = 'INSERT INTO users (id, name, email, password) VALUES (uuid_generate_v4(), $1, $2, $3) RETURNING id';
        const values = [name, email, password];
        const result = await this.pool.query(query, values);
        return result.rows[0].id;
    }

    async findUserById(id) {
        const query = 'SELECT * FROM users WHERE id = $1';
        const values = [id];
        const result = await this.pool.query(query, values);
        return result.rows[0];
    }

    async findUserByEmail(email) {
        const query = 'SELECT * FROM users WHERE email = $1';
        const values = [email];
        const result = await this.pool.query(query, values);
        return result.rows[0];
    }

    async updateUser(id, user) {
        const { name, email, password } = user;
        const query = 'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4';
        const values = [name, email, password, id];
        await this.pool.query(query, values);
    }

    async deleteUser(id) {
        const query = 'DELETE FROM users WHERE id = $1';
        const values = [id];
        await this.pool.query(query, values);
    }
}
module.exports = UsersRepository;