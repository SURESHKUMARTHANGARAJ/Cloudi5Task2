const District = require('../models/DistrictModel');

exports.getDistrictById = async (req, res) => {
  try {
    const district = await District.find({name:req.params.name});
    if (!district) return res.status(404).json({ message: 'District not found' });
    res.json(district);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDistrictsByStateCode = async (req, res) => {
  try {
    const districts = await District.find({ stateCode: req.params.stateCode });
    res.json(districts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addDistrict = async (req, res) => {
  const { name, altName, code, stateCode, isActive } = req.body;
  try {
    const newDistrict = new District({ name, altName, code, stateCode, isActive });
    await newDistrict.save();
    res.status(201).json(newDistrict);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateDistrict = async (req, res) => {
  const { name, altName, code, stateCode, isActive } = req.body;
  try {
    const district = await District.findByIdAndUpdate(req.params.id, { name, altName, code, stateCode, isActive }, { new: true });
    if (!district) return res.status(404).json({ message: 'District not found' });
    res.json(district);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteDistrict = async (req, res) => {
  try {
    const district = await District.findByIdAndDelete(req.params.id);
    if (!district) return res.status(404).json({ message: 'District not found' });
    res.json({ message: 'District deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
