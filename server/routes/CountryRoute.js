const express = require('express');
const countryController = require('../controllers/countryController');
const router = express.Router();

router.get('/', countryController.getCountries);
router.get('/:name', countryController.getCountryById);
router.post('/', countryController.createCountry);
router.put('/:id', countryController.updateCountry);
router.delete('/:id', countryController.deleteCountry);

module.exports = router;
