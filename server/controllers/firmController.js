const Firm = require('../models/FirmModel');
const path = require('path');

exports.getAllFirms = async (req, res) => {
    try {
      const firms = await Firm.find();
      res.json(firms);
    } catch (error) {
      res.status(500).json({ message: "Error fetching firms", error })
    }
  };

  exports.createFirm = async (req, res) => {
    try {
      const firmDetails = JSON.parse(req.body.firmDetails);
      const addressDetails = JSON.parse(req.body.addressDetails);
      const otherDetails = JSON.parse(req.body.otherDetails);
  
      const newFirm = new Firm({
        logo: req.file ? req.file.path : "",
        firmName: firmDetails.firmName,
        altFirmName: firmDetails.altFirmName,
        ownerName: firmDetails.ownerName,
        email: firmDetails.email,
        website: firmDetails.website,
        mobile: firmDetails.mobile,
        address: addressDetails,
        otherDetails: otherDetails,
      });


      const firm = await newFirm.save();
      res.status(201).json(firm);
    } catch (error) {
      res.status(500).json({ message: "Error creating firm", error });
    }
  };

exports.updateFirm = async (req, res) => {
  try {
    const { firmDetails, addressDetails, otherDetails } = req.body;
    const firmId = req.params.id;

    const updateData = {
      ...JSON.parse(firmDetails),
      address: JSON.parse(addressDetails),
      otherDetails: JSON.parse(otherDetails),
    };

    if (req.file) {
      updateData.logo = req.file.path;
    }

    const firm = await Firm.findByIdAndUpdate(firmId, updateData, {
      new: true
    });

    if (!firm) {
      return res.status(404).json({ message: "Firm not found" });
    }

    res.json(firm);
  } catch (error) {
    res.status(500).json({ message: "Error updating firm", error });
  }
};

exports.deleteFirm = async (req, res) => {
  try {
    const firmId = req.params.id;
    const firm = await Firm.findByIdAndDelete(firmId);

    if (!firm) {
      return res.status(404).json({ message: "Firm not found" });
    }

    res.json({ message: "Firm deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting firm", error });
  }
};

exports.getFirmByName = async (req, res) => {
  try {
    const firmName = req.params.name;
    const firm = await Firm.findOne({ firmName });

    if (!firm) {
      return res.status(404).json({ message: "Firm not found" });
    }

    res.json(firm);
  } catch (error) {
    res.status(500).json({ message: "Error fetching firm", error });
  }
};
