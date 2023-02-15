import React from 'react'
import { Link, Route, Routes } from "react-router-dom";

const Recipe = ({ name, id, recipes }) => {
  // console.log("key", id);
  // console.log("name", name);
  // console.log("recipe recipes", recipes)
  return (
    <div>
      <h4>{name}</h4>
      <Link to={`/recipe/${id}`} state={{ recipes }}>View Recipe</Link>
    </div>
  );
};

export default Recipe
//hi