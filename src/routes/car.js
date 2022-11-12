const express = require('express');
const carController = require('@controllers/car');

const router = express.Router();

router.get('/byclient/:id', carController.getByUserId);

router.get('/', carController.getAll);

router.get('/:id', carController.get);

router.post('/create', carController.create);

router.put('/:id/update', carController.update);

module.exports = router;
