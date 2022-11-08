const express = require('express');
const officeController = require('@controllers/office');

const router = express.Router();

router.post('/create', officeController.create);

router.put('/:id/update', officeController.update);

router.get('/', officeController.getAll);

router.get('/:id', officeController.get);

module.exports = router;
