class CellphonesController {
    constructor(cellphonesService) {
        this.cellphonesService = cellphonesService;
    }

    async createCellphone(req, res) {
        try {
            const cellphoneData = req.body;
            const newCellphone = await this.cellphonesService.createCellphone(cellphoneData);
            res.status(201).json(newCellphone);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getCellphone(req, res) {
        try {
            const { id } = req.params;
            const cellphone = await this.cellphonesService.getCellphone(id);
            if (!cellphone) {
                return res.status(404).json({ message: 'Cellphone not found' });
            }
            res.status(200).json(cellphone);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateCellphone(req, res) {
        try {
            const { id } = req.params;
            const cellphoneData = req.body;
            const updatedCellphone = await this.cellphonesService.updateCellphone(id, cellphoneData);
            if (!updatedCellphone) {
                return res.status(404).json({ message: 'Cellphone not found' });
            }
            res.status(200).json(updatedCellphone);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteCellphone(req, res) {
        try {
            const { id } = req.params;
            const deleted = await this.cellphonesService.deleteCellphone(id);
            if (!deleted) {
                return res.status(404).json({ message: 'Cellphone not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default CellphonesController;