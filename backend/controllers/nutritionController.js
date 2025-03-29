const Nutrition = require('../models/Nutrition');

exports.getAllNutrition = async (req, res) => {
  try {
    const nutritionData = await Nutrition.find();
    res.json(nutritionData);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

exports.createNutrition = async (req, res) => {
  try {
    const nutrition = new Nutrition({
      petId: req.body.petId,
      foodName: req.body.foodName,
      portionSize: req.body.portionSize,
      feedingFrequency: req.body.feedingFrequency,
      calories: req.body.calories
    });
    const newNutrition = await nutrition.save();
    res.status(201).json(newNutrition);
  } catch (error) {
    res.status(400).json({ message: 'Validation error: ' + error.message });
  }
};

exports.updateNutrition = async (req, res) => {
  try {
    const nutrition = await Nutrition.findById(req.params.id);
    if (!nutrition) {
      return res.status(404).json({ message: 'Nutrition record not found' });
    }
    nutrition.petId = req.body.petId || nutrition.petId;
    nutrition.foodName = req.body.foodName || nutrition.foodName;
    nutrition.portionSize = req.body.portionSize || nutrition.portionSize;
    nutrition.feedingFrequency = req.body.feedingFrequency || nutrition.feedingFrequency;
    nutrition.calories = req.body.calories || nutrition.calories;
    const updatedNutrition = await nutrition.save();
    res.json(updatedNutrition);
  } catch (error) {
    res.status(400).json({ message: 'Validation error: ' + error.message });
  }
};

exports.deleteNutrition = async (req, res) => {
  try {
    const nutrition = await Nutrition.findById(req.params.id);
    if (!nutrition) {
      return res.status(404).json({ message: 'Nutrition record not found' });
    }
    await nutrition.deleteOne(); // Updated to deleteOne
    res.json({ message: 'Nutrition record deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};