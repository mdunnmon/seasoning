import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { Recipe } from '../../server/models/recipeModel.js';

const Create = () => {

  // const [recipe, setRecipe] = useState(new Recipe());
  // const history = useHistory();


  // fetch('/api/recipes', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(recipe)
  // })
  // .then(response => {
  //   if (response.ok) {
  //     console.log('Recipe added:', response.json());
  //     history.push('/');
  //   } else {
  //     throw new Error('Error adding recipe');
  //   }
  // })
  // .catch(error => {
  //   console.error('Error adding recipe:', error);
  // });

  return (
    <div>
    <h1>Create here</h1>
    <form>
      <div>
        <label>Recipe Name:<input type='text'/></label>
        <label>Time:<input type='text'/></label>
        <label>Ingredients:<input type='text'/></label>
        <label>Directions:<input type='text'/></label>
        <button className='createRecipe' type='submit'>Add Recipe</button>
      </div>
    </form>
    </div>
  )
}

export default Create