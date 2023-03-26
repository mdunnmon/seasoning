import React, { useState } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { Recipe } from '../../server/models/recipeModel.js';

const Create = () => {
  //import navigate hook and use to redirect after a successful submit
  const navigate = useNavigate();
  //useState hook to set state to default, then update to our inputs from below with setRecipe
  const [recipe, setRecipe] = useState({
    name: '',
    description: '',
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
    <div className="flex flex-col justify-center items-center h-full bg-gradient-to-b from-neutral-200 via-neutral-100 to-white-50">
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="flex flex-col items-center m-8"
      >
        <input
          className="border py-2 px-3 text-grey-darkest m-1 focus:border-emerald-700 focus:outline-none rounded-md shadow-md w-8/12"
          placeholder="Recipe Name"
          type="text"
          name="name"
          value={recipe.name}
          onChange={handleChange}
        />
        <textarea
          className="border py-2 px-3 text-grey-darkest m-3 h-20 text-top rows focus:border-emerald-700 focus:outline-none resize-none rounded-md shadow-md"
          placeholder="Short Description"
          rows="4"
          type="text"
          name="description"
          value={recipe.description}
          onChange={handleChange}
        />
        <input
          className="border py-2 px-3 text-grey-darkest m-1 w-1/5 focus:border-emerald-700 focus:outline-none rounded-md shadow-md"
          placeholder="Time"
          type="text"
          name="time"
          value={recipe.time}
          onChange={handleChange}
        />
        <div className="flex flex-row justify-center items-center m-1">
          <textarea
            className=" w-3/4 border py-2 px-3 text-grey-darkest m-3 h-28 text-top rows focus:border-emerald-700 focus:outline-none resize-none rounded-md shadow-md"
            placeholder="Ingredients"
            rows="4"
            type="text"
            name="ingredients"
            value={recipe.value}
            onChange={handleChange}
          />
          <textarea
            className="border py-2 px-3 text-grey-darkest m-3 h-28 focus:border-emerald-700 focus:outline-none resize-none rounded-md shadow-md"
            placeholder="Directions"
            rows="4"
            type="text"
            name="directions"
            value={recipe.directions}
            onChange={handleChange}
          />
        </div>
        <button
          className="bg-gradient-to-r from-emerald-700 to-emerald-600 inline-block px-6 py-2.5 text-gray-800 font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg hover:text-white mt-4"
          type="submit"
        >
          Add Recipe
        </button>
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
