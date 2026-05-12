class CellphonesRepository {
    constructor(pool) {
        this.pool = pool;
    }

    async insertCellphone(cellphone) {
        const { marca, modelo, cor, preco } = cellphone;
        const query = `
            INSERT INTO celulares (id, marca, modelo, cor, preco, data_cadastro)
            VALUES (uuid_generate_v4(), $1, $2, $3, $4, NOW())
            RETURNING *;
        `;
        const values = [marca, modelo, cor, preco];
        const result = await this.pool.query(query, values);
        return result.rows[0];
    }

    async findCellphoneById(id) {
        const query = 'SELECT * FROM celulares WHERE id = $1;';
        const result = await this.pool.query(query, [id]);
        return result.rows[0];
    }

    async updateCellphone(id, cellphone) {
        const { marca, modelo, cor, preco } = cellphone;
        const query = `
            UPDATE celulares
            SET marca = $1, modelo = $2, cor = $3, preco = $4
            WHERE id = $5
            RETURNING *;
        `;
        const values = [marca, modelo, cor, preco, id];
        const result = await this.pool.query(query, values);
        return result.rows[0];
    }

    async deleteCellphone(id) {
        const query = 'DELETE FROM celulares WHERE id = $1 RETURNING *;';
        const result = await this.pool.query(query, [id]);
        return result.rows[0];
    }

    async getAllCellphones() {
        const query = 'SELECT * FROM celulares;';
        const result = await this.pool.query(query);
        return result.rows;
    }
}

export default CellphonesRepository;