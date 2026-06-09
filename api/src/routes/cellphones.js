
const express = require('express');
const pool = require('../config/dbPool');
const CellphonesRepository = require('../repositories/cellphonesRepository');
const CellphonesService = require('../services/cellphonesService');
const CellphonesController = require('../controllers/cellphonesController');

const router = express.Router();
const repository = new CellphonesRepository(pool);
const service = new CellphonesService(repository);
const cellphonesController = new CellphonesController(service);

// Define routes for cellphones
router.post('/', cellphonesController.createCellphone.bind(cellphonesController));
router.get('/:id', cellphonesController.getCellphone.bind(cellphonesController));
router.put('/:id', cellphonesController.updateCellphone.bind(cellphonesController));
router.delete('/:id', cellphonesController.deleteCellphone.bind(cellphonesController));

module.exports = router;