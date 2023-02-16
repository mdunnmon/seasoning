// import { getRecipes } from "../mockApi";
import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';

const IndividualRecipe = () => {
  //import navigate hook and use to redirect after a successful submit
  const navigate = useNavigate();
  //import useLocation hook to pass down from the Link in Recipe. state is assigned to recipe there and useLocation can access this object
  const location = useLocation();
  // console.log(location);
  const recipeId = location.pathname.split('/').pop();
  //pull the recipes from location.state
  const recipes = location.state.recipes;
  //find individual recipe based upon Id given in pathway which corresponds to the object's key
  const recipe = recipes.find((recipe) => recipe._id === recipeId);

  //create state for editable state when editing page. will flip between true/false if edit button clicked
  const [editable, setEditable] = useState(false);
  //set states for all avaiable inputs
  const [name, setName] = useState(recipe.name);
  const [time, setTime] = useState(recipe.time);
  const [ingredients, setIngredients] = useState(recipe.ingredients);
  const [directions, setDirections] = useState(recipe.directions);

  //set event listener for clicking on our edit button and changing state to true
  const handleEditClick = () => {
    setEditable(true);
  };

  //if no recipe data
  if (!recipe) {
    return <div>Loading recipe...</div>;
  }
  //edit recipe function sending put request
  const editRecipe = () => {
    const updatedRecipe = { ...recipe, name, time, ingredients, directions };
    //makes a post request to /api/create endpoint with the content type headers, and the body of our stringified updated recipe information
    fetch('/api/edit', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: recipeId,
        name: updatedRecipe.name,
        time: updatedRecipe.time,
        ingredients: updatedRecipe.ingredients,
        directions: updatedRecipe.directions,
      }),
    })
      //after fetch then take the response and parse the json body
      .then((res) => res.json())
      //then take the json data and log a success
      .then((data) => {
        // Redirect to the home page or show a success message to the user
        console.log('Recipe edited successfully:', data);
        //alert showing recipe name has been added successfully
        alert(`Successfully edited ${name} in database!`);
        //change back to non edit mode
        setEditable(false);
      })
      //catch error if recipe does not upload correctly
      .catch((err) => console.error('Error editing recipe:', err));
  };

  //delete recipe function sending delete request with the body of _id: and the current recipeId
  const deleteRecipe = () => {
    fetch('/api/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id: recipeId }),
    })
      //after fetch then take the response and parse the json body
      .then((res) => res.json())
      //then take the json data and log a success
      .then((data) => {
        // Redirect to the home page or show a success message to the user
        console.log('Recipe created successfully:', data);
        //alert showing recipe name has been added successfully
        alert(`Successfully deleted ${name} from database!`);
        //redirect
        navigate('/recipe');
      })
      //catch error if recipe does not upload correctly
      .catch((err) => console.error('Error creating recipe:', err));
  };

  /*if the state of editable is true then it will return the following rendering
      changes each property to an input with a value set to the associated state from above
      created an onChange where it will dynamically update the associated state to the current input
      //added a save changed button which onClick will call upon the updateRecipe
    */
  if (editable) {
    return (
      <div className="flex flex-wrap justify-center bg-gradient-to-b from-neutral-200 via-neutral-100 to-white-50">
        <div className="flex flex-col p-6 rounded-lg shadow-lg bg-white w-2/3 m-8">
          <div className="flex justify-between items-center bg-gradient-to-r from-emerald-900 to-emerald-700 text-white text-lg px-6 py-4 rounded">
            <h1 className="text-xl font-bold">
              <input
                className="bg-emerald-600 border-none text-white rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </h1>
            <h3>
              <input
                className="bg-emerald-600 border-none text-white rounded text-right"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </h3>
          </div>
          <div className="m-8 p-4">
            <p className="p-3">
              Ingredients:{' '}
              <input
                className="w-full bg-transparent border-b-2 border-gray-400 focus:outline-none focus:border-emerald-700"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
              />
            </p>
            <p className="p-3">
              Directions:{' '}
              <input
                className="w-full bg-transparent border-b-2 border-gray-400 focus:outline-none focus:border-emerald-700"
                value={directions}
                onChange={(e) => setDirections(e.target.value)}
              />
            </p>
          </div>
          <div className="flex justify-between">
            <button
              className="bg-red-500 inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg hover:bg-red-700 ml-2"
              onClick={() => setEditable(false)}
            >
              Cancel
            </button>
            <button
              className="bg-gradient-to-r from-emerald-700 to-emerald-500 inline-block px-6 py-2.5 text-gray-800 font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg hover:text-white"
              onClick={editRecipe}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  }
  /*
    if editable not true return general list of properties
    displays the appropriate property from our recipe
    have an onClick to invoke the handleEditClick function which changes the state
    have a delete recipe button where on it invokes the deleteRecipe function
    */

  return (
    <div className="flex flex-wrap justify-center bg-gradient-to-b from-neutral-200 via-neutral-100 to-white-50">
      <div className="flex flex-col p-6 rounded-lg shadow-lg bg-white w-2/3 m-8">
        <div className="flex justify-between items-center bg-gradient-to-r from-emerald-900 to-emerald-700 text-white text-lg px-6 py-4 rounded">
          <h1 className="text-xl font-bold">{name}</h1>
          <h3>{time}</h3>
        </div>
        <div className="m-8 p-4">
          <h4 className="pl-3 font-semibold">Ingredients:</h4>
          <p className="pl-3 pb-3">{ingredients}</p>
          <h4 className="pl-3 font-semibold">Directions:</h4>
          <p className="pl-3 pb-1">{directions}</p>
        </div>
        <div className="flex justify-between">
          <button
            className="bg-gradient-to-r from-emerald-700 to-emerald-500 inline-block px-6 py-2.5 text-gray-800 font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg hover:text-white"
            onClick={handleEditClick}
          >
            Edit Recipe
          </button>
          <button
            className="bg-red-500 inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg hover:bg-red-700 ml-2"
            onClick={deleteRecipe}
          >
            Delete Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default IndividualRecipe;
