const express = require('express');
const userController = require('@controllers/user');

const router = express.Router();

router.post('/register', userController.register);

router.get('/', userController.getUsers);

module.exports = router;
