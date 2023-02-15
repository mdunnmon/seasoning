// import { getRecipes } from "../mockApi";
import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";



const IndividualRecipe = () => {
  const navigate = useNavigate();
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

  const deleteRecipe = () => {
    fetch('/api/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({_id: recipeId})
    })
      //after fetch then take the response and parse the json body
      .then(res => res.json())
      //then take the json data and log a success 
      .then(data => {
        // Redirect to the home page or show a success message to the user
        console.log('Recipe created successfully:', data);
        //alert showing recipe name has been added successfully
        alert(`Successfully deleted ${recipe.name} from database!`);
        //redirect
        navigate('/recipe');
        
      })
      //catch error if recipe does not upload correctly
      .catch(err => console.error('Error creating recipe:', err));
  };
  

    
    return (
      <div>
        <h1>{recipe.name}</h1>
        <p>Time: {recipe.time}</p>
        <h2>Ingredients: {recipe.ingredients}</h2>
      <h2>Directions: {recipe.directions}</h2>
      <button className='createRecipe' onClick={deleteRecipe}>Delete Recipe</button>
      </div>
    );
  };

  export default IndividualRecipe;
  