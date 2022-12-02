const express = require('express');
const brandController = require('@controllers/brand');

const router = express.Router();

router.get('/', brandController.getAll);

router.get('/:id', brandController.get);

router.delete('/:id', brandController.remove);

router.post('/create', brandController.create);

router.put('/:id/update', brandController.update);

module.exports = router;
