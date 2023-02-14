const Recipe = require('../models/recipeModel');

const recipeController = {};

//get recipes
recipeController.getRecipes = (req, res, next) => {
  Recipe.find().then((response) => {
    // console.log(response);
    res.locals.recipeList = response;
    return next();
  });
};

//create recipe
recipeController.createRecipe = (req, res, next) => {
  Recipe.create({
    name: req.body.name,
    time: req.body.time,
    difficulty: req.body.difficulty,
    ingredients: req.body.ingredients,
    directions: req.body.directions,
  }).then((response) => {
    // console.log(response);
    res.locals.newRecipe = response;
    return next();
  });
};

module.exports = recipeController;
