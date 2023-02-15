const express = require('express');
//import controllers which serve as the certain methods/middleware if a certain type of request/routing comes through
const recipeController = require('../controllers/recipeController');

const router = express.Router();

//populate recipe list
router.get('/recipeList', recipeController.getRecipes, (req, res) =>
  //sends 200 status and the recipeList back to the client as the payload
  res.status(200).json(res.locals.recipeList)
);

//create new recipe
router.post('/create', recipeController.createRecipe, (req, res) =>
  //sends 200 status and the newRecipe back to the client as the payload
  res.status(200).json(res.locals.newRecipe)
);

module.exports = router;
