const express = require('express');
const carController = require('@controllers/car');

const router = express.Router();

router.get('/client/:id', carController.getByClientId);

router.get('/', carController.getAll);

router.get('/:id', carController.get);

router.delete('/:id', carController.remove);

router.post('/create', carController.create);

router.put('/:id/update', carController.update);

router.put('/update-verification/:id', carController.updateVerification);

router.put('/update-policy/:id', carController.updatePolicy);

router.put('/update-circulation/:id', carController.updateCirculation);

router.put('/update-velocity/:id', carController.updateMaxVelocity);

router.put('/update-geofence/:id', carController.updateGeofence);

module.exports = router;
