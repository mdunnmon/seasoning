import * as React from 'react';
import { useState, useEffect } from 'react';
import { RecipeType } from './types.js';
import Recipe from './Recipe';

const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  useEffect(() => {
    fetch('/api/recipeList')
      .then((res) => res.json())
      .then((recipes) => {
        setRecipes(recipes);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="flex flex-wrap justify-center bg-gradient-to-b from-neutral-200 via-neutral-100 to-white-50">
      {recipes.map((recipe) => (
        <Recipe
          key={recipe._id}
          name={recipe.name}
          id={recipe._id}
          recipes={recipes}
          description={recipe.description}
        />
      ))}
    </div>
  );
};

export default RecipeList;
