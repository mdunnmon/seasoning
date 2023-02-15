import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { Recipe } from '../../server/models/recipeModel.js';

const Create = () => {
  const [recipe, setRecipe] = useState({
    name: '',
    time: '',
    ingredients: '',
    directions: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(recipe)
    })
      .then(res => res.json())
      .then(data => {
        console.log('Recipe created successfully:', data);
        // Redirect to the home page or show a success message to the user
      })
      .catch(err => console.error('Error creating recipe:', err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe(prevRecipe => ({
      ...prevRecipe,
      [name]: value
    }));
  };

  return (
    <div>
    <h1>Create here</h1>
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div>
        <label>Recipe Name:<input type='text' name='name' value={recipe.name} onChange={handleChange}/></label>
        <label>Time:<input type='text' name='time' value={recipe.time} onChange={handleChange}/></label>
        <label>Ingredients:<input type='text' name='ingredients' value={recipe.value} onChange={handleChange}/></label>
        <label>Directions:<input type='text'name='directions' value={recipe.directions} onChange={handleChange}/></label>
        <button className='createRecipe' type='submit'>Add Recipe</button>
      </div>
    </form>
    </div>
  )
}

export default Create