class CellphonesService {
    constructor(cellphonesRepository) {
        this.cellphonesRepository = cellphonesRepository;
    }

    async createCellphone(cellphoneData) {
        // Validate cellphone data here (e.g., check required fields)
        return await this.cellphonesRepository.insertCellphone(cellphoneData);
    }

    async getCellphone(id) {
        return await this.cellphonesRepository.findCellphoneById(id);
    }

    async updateCellphone(id, cellphoneData) {
        // Validate updated cellphone data here
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