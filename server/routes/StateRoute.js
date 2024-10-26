const express = require('express');
const router = express.Router();
const stateController = require('../controllers/stateController');

router.get('/country/:country', stateController.getStates); 
router.get('/:name', stateController.getStateById); 
router.post('/', stateController.createState);
router.put('/:id', stateController.updateState);
router.delete('/:id', stateController.deleteState);

module.exports = router;
