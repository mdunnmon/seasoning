export interface RecipeType {
  _id: string;
  name: string;
  description: string;
  time: string;
  ingredients: string;
  directions: string;
}

export interface RecipeProps {
  name: string;
  id: string;
  recipes: RecipeType[];
  description: string;
}
