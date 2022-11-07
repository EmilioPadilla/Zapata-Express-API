const express = require('express');
const gpsController = require('@controllers/gps');

const router = express.Router();

router.post('/api/gps', gpsController.recoverGpsCoordinates);

module.exports = router;