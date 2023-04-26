import { Schema, model, Document } from 'mongoose';

interface RecipeDocument extends Document {
  name: string;
  description: string;
  time: string;
  ingredients: string;
  directions: string;
}

const recipeSchema = new Schema<RecipeDocument>({
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

const Recipe = model<RecipeDocument>('Recipe', recipeSchema);

export default Recipe;
