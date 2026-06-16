class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }

    async createUser(req, res, next) {
    try {
        const user = req.body;
        if (!user.name || !user.email || !user.password) {
            return res.status(400).json({ error: 'Faltando nome, e-mail ou senha' });
        }
        const id = await this.usersService.createUser(user);
        return res.status(201).json({ id });
    } catch (err) {
        return next(err);
    }
}

    async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await this.usersService.getUserById(id);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: 'Usuário não encontrado' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getUser(req, res) {
        try {

            const user = await this.usersService.getUser();
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: 'Nenhum usuário cadastrado' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { name, email, password } = req.body;
            const updatedUser = await this.usersService.updateUser(id, {name, email, password});
            if (updatedUser) {
                res.status(200).json(updatedUser);
            } else {
                res.status(404).json({ error: 'Usuário não encontrado!' });
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
                res.status(200).json({ message: 'Usuário deletado com sucesso!', user: deleted });
            } else {
                res.status(404).json({ error: 'Usuário não encontrado!' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
module.exports = UsersController;