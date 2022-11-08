const express = require('express');
const carController = require('@controllers/car');

const router = express.Router();

/*
router.post('/create', carController.create);

router.put('/:id/update', carController.update);
*/

router.get('/', carController.getAll);

//router.get('/:id', carController.get);

module.exports = router;
