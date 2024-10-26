const Taluka = require('../models/TalukaModel');

exports.getTalukasByDistrictCode = async (req, res) => {
  const { districtCode } = req.params;
  try {
    const talukas = await Taluka.find({ districtCode });
    res.status(200).json(talukas);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching talukas by district code', error });
  }
};

exports.getTalukaById = async (req, res) => {
  try {
    const taluka = await Taluka.find({name:req.params.name});
    if (!taluka) {
      return res.status(404).json({ message: 'Taluka not found' });
    }
    res.status(200).json(taluka);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching taluka by ID', error });
  }
};

exports.addTaluka = async (req, res) => {
  const { name, altName, districtCode, isActive } = req.body;

  if (!name || !districtCode) {
    return res.status(400).json({ message: 'Name, code, and districtCode are required' });
  }

  try {
    const newTaluka = new Taluka({
      name,
      altName,
      districtCode,
      isActive
    });

    const savedTaluka = await newTaluka.save();
    res.status(201).json(savedTaluka);
  } catch (error) {
    res.status(500).json({ message: 'Error adding taluka', error });
  }
};

exports.updateTaluka = async (req, res) => {
  const { name, altName, districtCode, isActive } = req.body;

  try {
    const updatedTaluka = await Taluka.findByIdAndUpdate(
      req.params.id,
      { name, altName, districtCode, isActive },
      { new: true }
    );

    if (!updatedTaluka) {
      return res.status(404).json({ message: 'Taluka not found' });
    }

    res.status(200).json(updatedTaluka);
  } catch (error) {
    res.status(500).json({ message: 'Error updating taluka', error });
  }
};

exports.deleteTaluka = async (req, res) => {
  try {
    const deletedTaluka = await Taluka.findByIdAndDelete(req.params.id);

    if (!deletedTaluka) {
      return res.status(404).json({ message: 'Taluka not found' });
    }

    res.status(200).json({ message: 'Taluka deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting taluka', error });
  }
};
