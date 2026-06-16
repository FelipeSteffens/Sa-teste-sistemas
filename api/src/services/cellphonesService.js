class CellphonesService {
    constructor(cellphonesRepository) {
        this.cellphonesRepository = cellphonesRepository;
    }

    async createCellphone(cellphoneData) {
    
        return await this.cellphonesRepository.insertCellphone(cellphoneData);
    }

    async getCellphone(id) {
        return await this.cellphonesRepository.findCellphoneById(id);
    }

    async updateCellphone(id, cellphoneData) {
        return await this.cellphonesRepository.updateCellphone(id, cellphoneData);
    }

    async deleteCellphone(id) {
        return await this.cellphonesRepository.deleteCellphone(id);
    }

    async getAllCellphones() {
        return await this.cellphonesRepository.findAllCellphones();
    }
}
module.exports = CellphonesService;