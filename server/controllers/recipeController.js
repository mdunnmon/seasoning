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
    description: req.body.description,
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

//edit recipe middleware which handles our put request
recipeController.editRecipe = (req, res, next) => {
  // console.log(req.body);
  //calls findoneandupdate on recipe model and has two arguments. query object, and the update object.
  //if query object found uses $set to replace all fields with the new data from our req.body
  Recipe.findOneAndUpdate({ _id: req.body._id }, { $set: req.body })
    .then((response) => {
      console.log(response);
      res.json('updated');
    })
    .catch((err) => {
      console.error('Error updating recipe:', err);
      next(err);
    });
};

recipeController.deleteRecipe = (req, res, next) => {
  //within our recipe it finds one and removes searching for the _id which is equal to our req.body._id
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
