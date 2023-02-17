// import { getRecipes } from '../mockApi';
import React, { useState, useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import IndividualRecipe from './IndividualRecipe.jsx';
import Recipe from './Recipe.jsx';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  //use useEffect hook which fetches our recipeList upon rendering
  //once response is given then we set the state of our recipes to the returned recipes
  useEffect(() => {
    fetch('/api/recipeList')
      .then((res) => res.json())
      .then((recipes) => {
        setRecipes(recipes);
        console.log('recipeList recipes', recipes);
      })
      .catch(console.error);
  }, []);

  //renders an unordered list of recipes from our recipeList. for each recipe in array a new list item is created with a unique key
  //A recipe component is rendered passing in the recipe name, id, and all recipes array as properties
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
