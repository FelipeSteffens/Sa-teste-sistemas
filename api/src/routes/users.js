const express = require('express');
const pool = require('../config/dbPool');
const UsersRepository = require('../repositories/usersRepository');
const UsersService = require('../services/usersService');
const UsersController = require('../controllers/usersController');

const user = express.Router();
const repository = new UsersRepository(pool);
const service = new UsersService(repository);
const usersController = new UsersController(service);

user.post('/register', (req, res, next) => usersController.createUser(req, res, next));
user.get('/listar/:id', (req, res, next) => usersController.getUserById(req, res, next));
user.get('/listar', (req, res, next) => usersController.getUser(req, res, next));
user.put('/atualizar/:id', (req, res, next) => usersController.updateUser(req, res, next));
user.delete('/deletar/:id', (req, res, next) => usersController.deleteUser(req, res, next));


module.exports = user;