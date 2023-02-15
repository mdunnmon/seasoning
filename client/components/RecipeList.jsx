// import { getRecipes } from '../mockApi';
import React, {useState, useEffect} from 'react'
import { Link, Route, Routes } from 'react-router-dom';
import IndividualRecipe from './IndividualRecipe.jsx';
import Recipe from './Recipe.jsx';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  //use useEffect hook which fetches our recipeList upon rendering
  //once response is given then we set the state of our recipes to the returned recipes
  useEffect(() => {
    fetch('/api/recipeList')
    .then(res => res.json())
    .then(recipes => {
      setRecipes(recipes);
      console.log("recipeList recipes", recipes)
    }).catch(console.error);
  }, []);
  

  //renders an unordered list of recipes from our recipeList. for each recipe in array a new list item is created with a unique key
  //A recipe component is rendered passing in the recipe name, id, and all recipes array as properties
  //Routes component used to define a route that starts with /recipe/ and the :key is a dynamic part which corresponds with the specific recipe key
  //if the route matches then the element of individual recipe is rendered and passes the recipes array as a prop
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