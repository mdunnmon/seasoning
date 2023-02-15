// import { getRecipes } from "../mockApi";
import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";



const IndividualRecipe = () => {

  const location = useLocation();
  // console.log("location", location)
  const recipeId = location.pathname.split('/').pop();
  // console.log('recipeID', recipeId)
  const recipes = location.state.recipes;
  // console.log('recipes', recipes)
  const recipe = recipes.find(recipe => recipe._id === recipeId);
  // console.log('recipe', recipe)

  if (!recipe) {
    return <div>Loading recipe...</div>;
  }

    
    return (
      <div>
        <h1>{recipe.name}</h1>
        <p>Time: {recipe.time}</p>
        <h2>Ingredients: {recipe.ingredients}</h2>
      <h2>Directions: {recipe.directions}</h2>
      <button className='createRecipe' type='submit'>Delete Recipe</button>
      </div>
    );
  };

  export default IndividualRecipe;
  