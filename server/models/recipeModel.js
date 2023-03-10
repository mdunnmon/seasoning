const mongoose = require('mongoose');
//create schema
const Schema = mongoose.Schema;
//create recipe schema with required inputs
const recipeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  directions: {
    type: String,
    required: true,
  },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
