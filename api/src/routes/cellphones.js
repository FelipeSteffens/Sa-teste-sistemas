import express from 'express';
import CellphonesController from '../controllers/cellphonesController.js';

const router = express.Router();
const cellphonesController = new CellphonesController();

// Define routes for cellphones
router.post('/', cellphonesController.createCellphone.bind(cellphonesController));
router.get('/:id', cellphonesController.getCellphone.bind(cellphonesController));
router.put('/:id', cellphonesController.updateCellphone.bind(cellphonesController));
router.delete('/:id', cellphonesController.deleteCellphone.bind(cellphonesController));

export default router;