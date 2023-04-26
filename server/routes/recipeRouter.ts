import express, { Request, Response } from 'express';
import recipeController from '../controllers/recipeController';

const router = express.Router();

router.get(
  '/recipeList',
  recipeController.getRecipes,
  (req: Request, res: Response) => res.status(200).json(res.locals.recipeList)
);

router.post(
  '/create',
  recipeController.createRecipe,
  (req: Request, res: Response) => res.status(200).json(res.locals.newRecipe)
);

router.put(
  '/edit',
  recipeController.editRecipe,
  (req: Request, res: Response) => res.status(200).json(res.locals.editRecipe)
);

router.delete(
  '/delete',
  recipeController.deleteRecipe,
  (req: Request, res: Response) =>
    res.status(200).send('Recipe deleted successfully')
);

export default router;
