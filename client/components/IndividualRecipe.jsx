// import { getRecipes } from "../mockApi";
import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";



const IndividualRecipe = () => {
  //import navigate hook and use to redirect after a successful submit
  const navigate = useNavigate();
  //import useLocation hook to pass down from the Link in Recipe. state is assigned to recipe there and useLocation can access this object
  const location = useLocation();
  // console.log(location);
  const recipeId = location.pathname.split('/').pop();
  const recipes = location.state.recipes;
  const recipe = recipes.find(recipe => recipe._id === recipeId);

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
  }

  
  //if no recipe data
  if (!recipe) {
    return <div>Loading recipe...</div>;
  }
  //edit recipe function sending put request 
  const editRecipe = () => {
      const updatedRecipe = {...recipe, name, time, ingredients, directions}
      //makes a post request to /api/create endpoint with the content type headers, and the body of our stringified recipe state
      fetch('/api/edit', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          _id: recipeId,
          name: updatedRecipe.name,
          time: updatedRecipe.time,
          ingredients: updatedRecipe.ingredients,
          directions: updatedRecipe.directions
        })
      })
      //after fetch then take the response and parse the json body
      .then(res => res.json())
      //then take the json data and log a success 
      .then(data => {
        // Redirect to the home page or show a success message to the user
        console.log('Recipe edited successfully:', data);
        //alert showing recipe name has been added successfully
        alert(`Successfully edited ${name} in database!`);
        //change back to non edit mode
        setEditable(false);
      })
      //catch error if recipe does not upload correctly
      .catch(err => console.error('Error editing recipe:', err));
  };
  



  //delete recipe function sending delete request with the body of _id: and the current recipeId
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
        alert(`Successfully deleted ${name} from database!`);
        //redirect
        navigate('/recipe');
        
      })
      //catch error if recipe does not upload correctly
      .catch(err => console.error('Error creating recipe:', err));
  };

    /*if the state of editable is true then it will return the following rendering
      changes each property to an input with a value set to the associated state from above
      created an onChange where it will dynamically update the associated state to the current input
      //added a save changed button which onClick will call upon the updateRecipe
    */
  if (editable) {
    return (
      <div>
        <h1>Name:<input value={name} onChange={(e) => setName(e.target.value)} /></h1>
        <p>Time: <input value={time} onChange={(e) => setTime(e.target.value)} /></p>
        <h2>Ingredients: <input value={ingredients} onChange={(e) => setIngredients(e.target.value)} /></h2>
      <h2>Directions: <input value={directions} onChange={(e) => setDirections(e.target.value)} /></h2>
      <button onClick={editRecipe}>Save Changes</button>
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
      <div>
        <h1>{name}</h1>
        <p>Time: {time}</p>
        <h2>Ingredients: {ingredients}</h2>
      <h2>Directions: {directions}</h2>
      <button onClick={handleEditClick}>Edit Recipe</button>
      <button className='deleteRecipe' onClick={deleteRecipe}>Delete Recipe</button>
      </div>
    );
  };

  export default IndividualRecipe;
  