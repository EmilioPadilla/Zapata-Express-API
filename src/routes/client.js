const express = require('express');
const clientController = require('@controllers/client');

const router = express.Router();

router.post('/create', clientController.create);

router.put('/:id/update', clientController.update);

router.put('/:id/update-password', clientController.updatePassword);

router.get('/', clientController.getAll);

router.get('/:id', clientController.get);

router.delete('/:id', clientController.remove);

router.get('/flutter/:id', clientController.getClient)

module.exports = router;
