const express = require('express');
const UsersController = require('../controllers/usersController');

const router = express.Router();
const usersController = new UsersController();

router.post('/register', usersController.createUser.bind(usersController));
router.get('/:id', usersController.getUser.bind(usersController));
router.put('/:id', usersController.updateUser.bind(usersController));
router.delete('/:id', usersController.deleteUser.bind(usersController));

module.exports = router;