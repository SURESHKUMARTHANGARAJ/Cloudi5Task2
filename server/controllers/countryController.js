const Country = require('../models/CountryModel');

exports.getCountries = async (req, res) => {
  try {
    const countries = await Country.find();
    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching countries', error });
  }
};

exports.getCountryById = async (req, res) => {
  const { name } = req.params;
  try {
    const country = await Country.find({name:name});
    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }
    res.status(200).json(country);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching country', error });
  }
};

exports.createCountry = async (req, res) => {
  const { name, altname, code, isActive } = req.body;

  try {
    const existingCountry = await Country.findOne({ code });
    if (existingCountry) {
      return res.status(400).json({ message: 'Country with this code already exists' });
    }

    const newCountry = new Country({
      name,
      altname,
      code,
      isActive,
    });

    const savedCountry = await newCountry.save();
    res.status(201).json(savedCountry);
  } catch (error) {
    res.status(500).json({ message: 'Error creating country', error });
  }
};

exports.updateCountry = async (req, res) => {
  const { id } = req.params;
  const { name, altname, code, isActive } = req.body;

  try {
    const country = await Country.findById(id);
    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }

    country.name = name || country.name;
    country.altname = altname || country.altname;
    country.code = code || country.code;
    country.isActive = isActive !== undefined ? isActive : country.isActive;

    const updatedCountry = await country.save();
    res.status(200).json(updatedCountry);
  } catch (error) {
    res.status(500).json({ message: 'Error updating country', error });
  }
};

exports.deleteCountry = async (req, res) => {

  try {
    const { id } = req.params;
    const result = await Country.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({ message: 'Country not found' });
    }
    res.status(200).send({ message: 'Country deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error', error });
  }
};
