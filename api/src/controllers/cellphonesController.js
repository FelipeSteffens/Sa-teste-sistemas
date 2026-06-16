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
            console.error('createCellphone error:', error);
            res.status(500).json({ message: error.message });
        }
    }

    async getCellphoneById(req, res) {
        try {
            const { id } = req.params;
            const cellphone = await this.cellphonesService.getCellphoneById(id);
            if (!cellphone) {
                return res.status(404).json({ message: 'Celular não encontrado!' });
            }
            res.status(200).json(cellphone);
        } catch (error) {
            console.error('getCellphone error:', error);
            res.status(500).json({ message: error.message });
        }
    }
    async getCellphones(req, res) {
        try {
            const { id } = req.params;
            const cellphone = await this.cellphonesService.getCellphones(id);
            if (!cellphone) {
                return res.status(404).json({ message: 'Celular não encontrado!' });
            }
            res.status(200).json(cellphone);
        } catch (error) {
            console.error('getCellphone error:', error);
            res.status(500).json({ message: error.message });
        }
    }

    async updateCellphone(req, res) {
        try {
            const { id } = req.params;
            const cellphoneData = req.body;
            const updatedCellphone = await this.cellphonesService.updateCellphone(id, cellphoneData);
            if (!updatedCellphone) {
                return res.status(404).json({ message: 'Celular não encontrado!' });
            }
            res.status(200).json(updatedCellphone);
        } catch (error) {
            console.error('updateCellphone error:', error);
            res.status(500).json({ message: error.message });
        }
    }

    async deleteCellphone(req, res) {
        try {
            const { id } = req.params;
            const deleted = await this.cellphonesService.deleteCellphone(id);
            if (!deleted) {
                return res.status(404).json({ message: 'Celular não encontrado!' });
            }
            res.status(204).send();
        } catch (error) {
            console.error('deleteCellphone error:', error);
            res.status(500).json({ message: error.message });
        }
    }
}
module.exports = CellphonesController;