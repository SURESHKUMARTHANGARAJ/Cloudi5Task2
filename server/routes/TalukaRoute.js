const express = require('express');
const router = express.Router();
const talukaController = require('../controllers/talukaController');

router.get('/district/:districtCode', talukaController.getTalukasByDistrictCode);
router.get('/:name', talukaController.getTalukaById);
router.post('/', talukaController.addTaluka);
router.put('/:id', talukaController.updateTaluka);
router.delete('/:id', talukaController.deleteTaluka);

module.exports = router;
