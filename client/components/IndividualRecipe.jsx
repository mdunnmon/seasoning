import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRecipes } from "../mockApi";


const IndividualRecipe = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState('');
    
    
    useEffect(() => {
      const recipes = getRecipes();
      // console.log(recipes)
      const foundRecipe = recipes.find(recipe => recipe.id === Number(id));
      setRecipe(foundRecipe);
    }, [id]);
    
    console.log(recipe);
    
    return (
      <div>
        <h4>{recipe.name}</h4>
        <p>ID: {recipe.id}</p>
      </div>
    );
  };

  export default IndividualRecipe;
  