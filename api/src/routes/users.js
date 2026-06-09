const express = require('express');
const pool = require('../config/dbPool');
const UsersRepository = require('../repositories/usersRepository');
const UsersService = require('../services/usersService');
const UsersController = require('../controllers/usersController');

const router = express.Router();
const repository = new UsersRepository(pool);
const service = new UsersService(repository);
const usersController = new UsersController(service);

router.post('/register', usersController.createUser.bind(usersController));
router.get('/:id', usersController.getUser.bind(usersController));
router.put('/:id', usersController.updateUser.bind(usersController));
router.delete('/:id', usersController.deleteUser.bind(usersController));

module.exports = router;