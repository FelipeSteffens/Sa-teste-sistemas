const express = require('express');
const pool = require('../config/dbPool');
const CellphonesRepository = require('../repositories/cellphonesRepository');
const CellphonesService = require('../services/cellphonesService');
const CellphonesController = require('../controllers/cellphonesController');

const cellphones = express.Router();
const repository = new CellphonesRepository(pool);
const service = new CellphonesService(repository);
const cellphonesController = new CellphonesController(service);


cellphones.post('/criar', (req, res, next) => cellphonesController.createCellphone(req, res, next));
cellphones.get('/listar/:id', (req, res, next) => cellphonesController.getCellphoneById(req, res, next));
cellphones.get('/listar', (req, res, next) => cellphonesController.getCellphones(req, res, next));
cellphones.put('/atualizar/:id', (req, res, next) => cellphonesController.updateCellphone(req, res, next));
cellphones.delete('/deletar/:id', (req, res, next) => cellphonesController.deleteCellphone(req, res, next));


module.exports = cellphones;