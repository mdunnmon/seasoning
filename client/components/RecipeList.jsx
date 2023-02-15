// import { getRecipes } from '../mockApi';
import React, {useState, useEffect} from 'react'
import { Link, Route, Routes } from 'react-router-dom';
import IndividualRecipe from './IndividualRecipe.jsx';
import Recipe from './Recipe.jsx';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  
  useEffect(() => {
    fetch('/api/recipeList')
    .then(res => res.json())
    .then(recipes => {
      setRecipes(recipes);
      console.log("recipeList recipes", recipes)
    }).catch(console.error);
  }, []);
  // const recipes = getRecipes();
  
  return (
    <div>
    <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <Recipe name={recipe.name} id={recipe._id} recipes={recipes}/>
            </li>    
        ))}
        </ul>
        <Routes>
          <Route path="/recipe/:key" element={<IndividualRecipe recipes={recipes}/>} />
        </Routes>
    </div>
  );
};

export default RecipeList;