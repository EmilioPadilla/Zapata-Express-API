const express = require('express');
const modelController = require('@controllers/model');

const router = express.Router();

router.get('/', modelController.getAll);

router.get('/:id', modelController.get);

router.post('/create', modelController.create);

router.put('/:id/update', modelController.update);

module.exports = router;
