const Recipe = require('../models/recipeModel');
const { ObjectId } = require('mongoose');

const recipeController = {};

//get recipes middleware
recipeController.getRecipes = (req, res, next) => {
  Recipe.find().then((response) => {
    // find the Recipes and then set the response as the recipeList
    res.locals.recipeList = response;
    return next();
  });
};

//create recipe middleware
recipeController.createRecipe = (req, res, next) => {
  //use the Recipe schema to create new recipe assigning values from our request body to our properties
  Recipe.create({
    name: req.body.name,
    time: req.body.time,
    ingredients: req.body.ingredients,
    directions: req.body.directions,
  }).then((response) => {
    // console.log(response);
    //assign the response as the newRecipe
    res.locals.newRecipe = response;
    return next();
  });
};

recipeController.deleteRecipe = (req, res, next) => {
  console.log('XXXXXXXXX', req.body);
  Recipe.findOneAndRemove({ _id: req.body._id })
    .then((response) => {
      console.log(response);
      res.json(' deleted');
    })
    .catch((err) => {
      console.error('Error deleting recipe:', err);
      next(err);
    });
};

module.exports = recipeController;
