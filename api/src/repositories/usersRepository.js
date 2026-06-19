class UsersRepository {
    constructor(pool) {
        this.pool = pool;
    }

    async insertUser(user) {
    const { nome, email, senha } = user;
    const query = 'INSERT INTO users (nome, email, senha) VALUES ($1, $2, $3) RETURNING *';
    const values = [nome, email, senha];
    const result = await this.pool.query(query, values);
    return result.rows[0];
    }

    async findUserById(id) {
        const query = 'SELECT * FROM users WHERE id = $1';
        const values = [id];
        const result = await this.pool.query(query, values);
        return result.rows[0];
    }
    async findUser() {
        const query = 'SELECT * FROM users';
        const result = await this.pool.query(query);
        return result.rows
    }

    async findUserByEmail(email) {
        const query = 'SELECT * FROM users WHERE email = $1';
        const values = [email];
        const result = await this.pool.query(query, values);
        return result.rows[0];
    }

    async updateUser(id, user) {
   
    const { nome, email, senha } = user;

    const query = 'UPDATE users SET nome = $1, email = $2, senha = $3 WHERE id = $4 RETURNING *';
    const values = [nome, email, senha, id];

    const result = await this.pool.query(query, values);

    return result.rows[0] || null;
}

    async deleteUser(id) {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
    const values = [id];
    const result = await this.pool.query(query, values);

    return result.rows[0] || null;
    }
}
module.exports = UsersRepository;