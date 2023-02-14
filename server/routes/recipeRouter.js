const express = require('express');

const recipeController = require('../controllers/recipeController');

const router = express.Router();

//populate recipe list
router.get('/recipeList', recipeController.getRecipes, (req, res) =>
  res.status(200).json(res.locals.recipeList)
);

//create new recipe
router.post('/create', recipeController.createRecipe, (req, res) =>
  res.status(200).json(res.locals.newRecipe)
);

module.exports = router;
