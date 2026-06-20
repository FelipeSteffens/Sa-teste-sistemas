class CellphonesRepository {
    constructor(pool) {
        this.pool = pool;
    }

    async insertCellphone(cellphone) {
        const { marca, modelo, cor, preco, descricao } = cellphone;
        const query = `
            INSERT INTO cellphones (marca, modelo, cor, preco, descricao, data_cadastro)
            VALUES ($1, $2, $3, $4, $5 ,NOW())
            RETURNING *;
        `;
        const values = [marca, modelo, cor, preco, descricao];
        const result = await this.pool.query(query, values);
        return result.rows[0];
    }

    async findCellphoneById(id) {
    const query = 'SELECT * FROM cellphones WHERE id = $1;';
        const result = await this.pool.query(query, [id]);
        return result.rows[0];
    }
    async findCellphones() {
    const query = 'SELECT * FROM cellphones';
        const result = await this.pool.query(query);
        return result.rows;
    }

    async updateCellphone(id, cellphone) {
        const { marca, modelo, cor, preco, descricao } = cellphone;
        const query = `
            UPDATE cellphones
            SET marca = $1, modelo = $2, cor = $3, preco = $4, descricao = $5
            WHERE id = $6
            RETURNING *;
        `;
        const values = [marca, modelo, cor, preco, descricao, id];
        const result = await this.pool.query(query, values);
        return result.rows[0];
    }

    async deleteCellphone(id) {
    const query = 'DELETE FROM cellphones WHERE id = $1 RETURNING *;';
        const result = await this.pool.query(query, [id]);
        return result.rows[0];
    }

}

module.exports = CellphonesRepository;
