const express = require('express');
const gpsController = require('@controllers/gps');

const router = express.Router();

router.post('/api/gps', gpsController.getGpsCoordinates);

router.put('/update-geofence/:id', gpsController.updateGeofence);

router.post('/activate/:id', gpsController.activateValetMode);

router.post('/deactivate/:id', gpsController.deactivateValetMode);

router.get('/get/:id', gpsController.get);

module.exports = router;
