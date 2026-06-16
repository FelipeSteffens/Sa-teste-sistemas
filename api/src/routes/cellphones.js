const express = require('express');
const pool = require('../config/dbPool');
const CellphonesRepository = require('../repositories/cellphonesRepository');
const CellphonesService = require('../services/cellphonesService');
const CellphonesController = require('../controllers/cellphonesController');

const cellphone = express.Router();
const repository = new CellphonesRepository(pool);
const service = new CellphonesService(repository);
const cellphonesController = new CellphonesController(service);


cellphone.post('/criar', (req, res, next) => cellphonesController.createCellphone(req, res, next));
cellphone.get('/listar/:id', (req, res, next) => cellphonesController.getCellphone(req, res, next));
cellphone.put('/atualizar/:id', (req, res, next) => cellphonesController.updateCellphone(req, res, next));
cellphone.delete('/deletar/:id', (req, res, next) => cellphonesController.deleteCellphone(req, res, next));


module.exports = cellphone;