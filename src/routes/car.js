const express = require('express');
const carController = require('@controllers/car');

const router = express.Router();

router.get('/client/:id', carController.getByClientId);

router.get('/', carController.getAll);

router.get('/:id', carController.get);

router.post('/create', carController.create);

router.put('/:id/update', carController.update);

router.put('/update-verification/:id', carController.updateVerification);

router.put('/update-policy/:id', carController.updatePolicy);

module.exports = router;
