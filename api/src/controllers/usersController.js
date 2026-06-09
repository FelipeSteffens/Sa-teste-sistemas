class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }

    async createUser(req, res) {
        try {
            const { nome, email, senha } = req.body;
            const user = await this.usersService.createUser(nome, email, senha);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getUser(req, res) {
        try {
            const { id } = req.params;
            const user = await this.usersService.getUser(id);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { nome, email, senha } = req.body;
            const updatedUser = await this.usersService.updateUser(id, nome, email, senha);
            if (updatedUser) {
                res.status(200).json(updatedUser);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const deleted = await this.usersService.deleteUser(id);
            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
module.exports = UsersController;