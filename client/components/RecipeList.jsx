import React, {useState, useEffect} from 'react'
import { getRecipes } from '../mockApi';
import Recipe from './Recipe.jsx';
import { Link, Route, Routes } from 'react-router-dom';

const RecipeList = () => {
  // const [recipes, setRecipes] = useState([]);
  
  // useEffect(() => {
  //   fetch('/home')
  //     .then(res => res.json())
  //     .then(recipes => {
  //       setRecipes(recipes);
  //     });
  // }, []);

  const recipes = getRecipes();
  
  return (
    <ul>
        {recipes.map(recipe => (
          <li key={recipe.id}>
            <Recipe
              name={recipe.name}
              id={recipe.id}
              />
              <Link to={`/recipe/${recipe.id}`}>View Recipe</Link>
              </li>
        ))}
    </ul>
  );
};

export default RecipeList;