const express = require('express');
const employeeController = require('@controllers/employee');

const router = express.Router();

router.post('/create', employeeController.create);

router.put('/:id/update', employeeController.update);

router.put('/:id/update-password', employeeController.updatePassword);

router.get('/', employeeController.getAll);

router.get('/:id', employeeController.get);

router.delete('/:id', employeeController.remove);

module.exports = router;
