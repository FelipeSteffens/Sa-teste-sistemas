import { pool } from "../db/db.js";
import { validateCelular } from "../services/celularServices.js";

export const getAllCelulares = async (req, res) => {
  try {
    const resultado = await pool.query("SELECT * FROM celulares");
    const apenasOsObjetos = resultado.rows;
    console.log(apenasOsObjetos);
    res.json(apenasOsObjetos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createCelular = async (req, res) => {
  try {
    // Validar os dados (marca, modelo, imei, preço e descrição)
    validateCelular(req.body);

    const { marca, modelo, imei, preco, descricao } = req.body;

    const query = `INSERT INTO celulares (marca, modelo, imei, preco, descricao) VALUES ($1, $2, $3, $4, $5) RETURNING id`;

    const result = await pool.query(query, [
      marca,
      modelo,
      imei,
      preco,
      descricao,
    ]);
    res.status(201).json({ id: result.rows[0].id, ...req.body });
  } catch (err) {
    if (err.code === "23505") {
      return res
        .status(400)
        .json({ error: "Este IMEI já está cadastrado no sistema!" });
    }
    res.status(400).json({ error: err.message });
  }
};

export const deleteCelular = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM celulares WHERE id = $1", [
      id,
    ]);
    // BUG 6: Retorna 200 OK mesmo se o ID não existir (rowCount === 0)
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Celular não encontrado" });
    }

    res.json({ message: "Celular deletado com sucesso" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export const updateCelular = async (req, res) => {
  const { id } = req.params;
  const { marca, modelo, imei, preco, descricao } = req.body;
  try {
    const query =
      `UPDATE celulares SET marca = $1, modelo = $2, imei = $3, preco = $4, descricao = $5 WHERE id = $6 RETURNING *`
    ;
    const result = await pool.query(query, [
      marca,
      modelo,
      imei,
      preco,
      descricao,
      id
    ]);
    if (result.rowCount === 0) {
    return res.status(404).json({ error: "Registro não encontrado" });
}
    console.log(result);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.mesage });
  }
};
