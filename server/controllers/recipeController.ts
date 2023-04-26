import Recipe from '../models/recipeModel';
import { Request, Response, NextFunction } from 'express';

interface RecipeController {
  getRecipes: (req: Request, res: Response, next: NextFunction) => void;
  createRecipe: (req: Request, res: Response, next: NextFunction) => void;
  editRecipe: (req: Request, res: Response, next: NextFunction) => void;
  deleteRecipe: (req: Request, res: Response, next: NextFunction) => void;
}

const recipeController: RecipeController = {
  getRecipes: (req, res, next) => {
    Recipe.find().then((response) => {
      res.locals.recipeList = response;
      return next();
    });
  },

  createRecipe: (req, res, next) => {
    Recipe.create({
      name: req.body.name,
      description: req.body.description,
      time: req.body.time,
      ingredients: req.body.ingredients,
      directions: req.body.directions,
    }).then((response) => {
      res.locals.newRecipe = response;
      return next();
    });
  },

  editRecipe: (req, res, next) => {
    Recipe.findOneAndUpdate({ _id: req.body._id }, { $set: req.body })
      .then((response) => {
        console.log(response);
        res.json('updated');
      })
      .catch((err) => {
        console.error('Error updating recipe:', err);
        next(err);
      });
  },

  deleteRecipe: (req, res, next) => {
    Recipe.findOneAndRemove({ _id: req.body._id })
      .then((response) => {
        console.log(response);
        res.json(' deleted');
      })
      .catch((err) => {
        console.error('Error deleting recipe:', err);
        next(err);
      });
  },
};

// recipeController.getRecipes = (req, res, next) => {
//   Recipe.find().then((response) => {
//     res.locals.recipeList = response;
//     return next();
//   });
// };

// recipeController.createRecipe = (req, res, next) => {
//   Recipe.create({
//     name: req.body.name,
//     description: req.body.description,
//     time: req.body.time,
//     ingredients: req.body.ingredients,
//     directions: req.body.directions,
//   }).then((response) => {
//     res.locals.newRecipe = response;
//     return next();
//   });
// };

// recipeController.editRecipe = (req, res, next) => {
//   Recipe.findOneAndUpdate({ _id: req.body._id }, { $set: req.body })
//     .then((response) => {
//       console.log(response);
//       res.json('updated');
//     })
//     .catch((err) => {
//       console.error('Error updating recipe:', err);
//       next(err);
//     });
// };

// recipeController.deleteRecipe = (req, res, next) => {
//   Recipe.findOneAndRemove({ _id: req.body._id })
//     .then((response) => {
//       console.log(response);
//       res.json(' deleted');
//     })
//     .catch((err) => {
//       console.error('Error deleting recipe:', err);
//       next(err);
//     });
// };

export default recipeController;
