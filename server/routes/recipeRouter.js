const express = require('express');
const recipeController = require('../controllers/recipeController');

const router = express.Router();

router.get('/recipeList', recipeController.getRecipes, (req, res) =>
  res.status(200).json(res.locals.recipeList)
);

router.post('/create', recipeController.createRecipe, (req, res) =>
  res.status(200).json(res.locals.newRecipe)
);

router.put('/edit', recipeController.editRecipe, (req, res) =>
  res.status(200).json(res.locals.editRecipe)
);

router.delete('/delete', recipeController.deleteRecipe, (req, res) =>
  res.status(200).send('Recipe deleted successfully')
);

module.exports = router;
