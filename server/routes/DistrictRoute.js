const express = require('express');
const router = express.Router();
const districtController = require('../controllers/districtController');

router.get('/:name', districtController.getDistrictById);
router.get('/state/:stateCode', districtController.getDistrictsByStateCode);
router.post('/', districtController.addDistrict);
router.put('/:id', districtController.updateDistrict);
router.delete('/:id', districtController.deleteDistrict);

module.exports = router;
