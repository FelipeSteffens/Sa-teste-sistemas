class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }

    async createUser(req, res, next) {
        try {
            const user = req.body;
            // ALTERADO: Verificando em português para bater com o teste e o banco
            if (!user.nome || !user.email || !user.senha) {
                return res.status(400).json({ error: 'Faltando nome, e-mail ou senha' });
            }
            const createdUser = await this.usersService.createUser(user);
            return res.status(201).json(createdUser);
        } catch (err) {
            return next(err);
        }
    }

    async getUserById(req, res) {
        try {
            const { id } = req.params;
            
            // Segurança contra o 'undefined' que quebra o SQL
            if (!id || id === 'undefined') {
                return res.status(400).json({ error: 'ID inválido fornecido' });
            }

            const user = await this.usersService.getUserById(id);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: 'Usuário não encontrado' });
            }
        } catch (error) {
            // Se o service retornar null/vazio por não achar o ID, deve ser 404
            res.status(404).json({ error: 'Usuário não encontrado' });
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
            // ALTERADO: Desestruturando em português
            const { nome, email, senha } = req.body;
            
            if (!id || id === 'undefined') {
                return res.status(400).json({ error: 'ID inválido fornecido' });
            }

            const updatedUser = await this.usersService.updateUser(id, { nome, email, senha });
            if (updatedUser) {
                res.status(200).json(updatedUser);
            } else {
                res.status(404).json({ error: 'Usuário não encontrado!' });
            }
        } catch (error) {
            res.status(404).json({ error: 'Usuário não encontrado!' });
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            if (!id || id === 'undefined') {
                return res.status(400).json({ error: 'ID inválido fornecido' });
            }

            const deleted = await this.usersService.deleteUser(id);
            if (deleted) {
                // ALTERADO: O teste espera status 204 (No Content) sem corpo de resposta
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Usuário não encontrado!' });
            }
        } catch (error) {
            res.status(404).json({ error: 'Usuário não encontrado!' });
        }
    }
}

module.exports = UsersController;
