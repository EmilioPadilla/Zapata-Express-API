const express = require('express');
const carController = require('@controllers/car');

const router = express.Router();

router.get('/client/:id', carController.getByClientId);

router.get('/', carController.getAll);

router.get('/:id', carController.get);

router.delete('/:id', carController.remove);

router.post('/create', carController.create);

router.put('/:id/update', carController.update);

module.exports = router;
