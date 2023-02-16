import React, { useState } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { Recipe } from '../../server/models/recipeModel.js';

const Create = () => {
  //import navigate hook and use to redirect after a successful submit
  const navigate = useNavigate();
  //useState hook to set state to default, then update to our inputs from below with setRecipe
  const [recipe, setRecipe] = useState({
    name: '',
    time: '',
    ingredients: '',
    directions: '',
  });

  //handle submit invoked when clicking on our "submit" button passing in our event object
  const handleSubmit = (e) => {
    //prevents default form from submitting. must make changes to submit
    e.preventDefault();
    //makes a post request to /api/create endpoint with the content type headers, and the body of our stringified recipe state
    fetch('/api/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipe),
    })
      //after fetch then take the response and parse the json body
      .then((res) => res.json())
      //then take the json data and log a success
      .then((data) => {
        // Redirect to the home page or show a success message to the user
        console.log('Recipe created successfully:', data);
        //alert showing recipe name has been added successfully
        alert(`Successfully added ${recipe.name} to database!`);
        //redirect
        navigate('/recipe');
      })
      //catch error if recipe does not upload correctly
      .catch((err) => console.error('Error creating recipe:', err));
  };

  //handle change takes event object e
  const handleChange = (e) => {
    //destructure the name and value from the target property e.g. time and recipe.time
    const { name, value } = e.target;
    //call setRecipe for recipe state and passes through the previous state.
    setRecipe((prevRecipe) => ({
      //spread out all other previous properties if there are any
      ...prevRecipe,
      //updates the 'name' (depends on which input so could be technically time or ingredients) property to the value from the target
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Create here</h1>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div>
          <label>
            Recipe Name:
            <input
              type="text"
              name="name"
              value={recipe.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Time:
            <input
              type="text"
              name="time"
              value={recipe.time}
              onChange={handleChange}
            />
          </label>
          <label>
            Ingredients:
            <input
              type="text"
              name="ingredients"
              value={recipe.value}
              onChange={handleChange}
            />
          </label>
          <label>
            Directions:
            <input
              type="text"
              name="directions"
              value={recipe.directions}
              onChange={handleChange}
            />
          </label>
          <button className="createRecipe" type="submit">
            Add Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
/* 
autocomplete off means the form will not suggest any prior inputs. created submit type button which will invoke the handle submit
have text inputs and set recipe state for each property to that via the handle change method.
handle change runs on every keystroke and will update the state of the recipe dynamically 
with the setRecipe invocation within the handle change function
*/
