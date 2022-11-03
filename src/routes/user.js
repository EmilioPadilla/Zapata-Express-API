const express = require('express');
const userController = require('@controllers/user');

const router = express.Router();

router.post('/login', userController.login);

router.post('/create', userController.create);

router.put('/:id/update', userController.update);

router.put('/:id/update-password', userController.updatePassword);

router.get('/', userController.getAll);

router.get('/:id', userController.get);

module.exports = router;
