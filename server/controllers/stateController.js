const State = require('../models/StateModel');
const mongoose = require('mongoose');

exports.getStates = async (req, res) => {
    const { country } = req.params; 
  
    try {
      const states = await State.find({ countrycode: country }) 
      if (!states.length) {
        return res.status(404).json({ message: 'No states found for the specified country code' });
      }
      res.status(200).json(states);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching states', error });
    }
  };
  
exports.getStateById = async (req, res) => {
  const { name } = req.params;
  try {
    const state = await State.find({name:name}); 
    if (!state) {
      return res.status(404).json({ message: 'State not found' });
    }
    res.status(200).json(state);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching state', error });
  }
};

exports.createState = async (req, res) => {
  const { name, altName, code, isActive, countrycode } = req.body;
  try {
    const newState = new State({
      name,
      altName,
      code,
      isActive,
      countrycode,
    });
    const savedState = await newState.save();
    res.status(201).json(savedState);
  } catch (error) {
    res.status(500).json({ message: 'Error creating state', error });
  }
};

exports.updateState = async (req, res) => {
  const { id } = req.params;
  const { name, altName, code, isActive, country } = req.body;
  try {
    const state = await State.findById(id);
    if (!state) {
      return res.status(404).json({ message: 'State not found' });
    }

    state.name = name || state.name;
    state.altName = altName || state.altName;
    state.code = code || state.code;
    state.isActive = isActive !== undefined ? isActive : state.isActive;
    state.country = country || state.country;

    const updatedState = await state.save();
    res.status(200).json(updatedState);
  } catch (error) {
    res.status(500).json({ message: 'Error updating state', error });
  }
};

exports.deleteState = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: 'Invalid ID format' });
    }

    const result = await State.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({ message: 'State not found' });
    }

    res.status(200).send({ message: 'State deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error', error });
  }
};
