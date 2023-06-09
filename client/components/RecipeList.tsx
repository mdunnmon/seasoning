import * as React from 'react';
import { useState, useEffect } from 'react';
import { RecipeType } from './types.js';
import Recipe from './Recipe';

const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch('/api/recipeList')
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Error: ' + res.status);
        }
      })
      .then((recipes) => {
        setRecipes(recipes);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-wrap justify-center bg-gradient-to-b from-neutral-200 via-neutral-100 to-white-50 p-6">
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
