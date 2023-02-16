import React from 'react';
import { Link } from 'react-router-dom';

const Recipe = ({ name, id, recipes }) => {
  // console.log("key", id);
  // console.log("name", name);
  // console.log("recipe recipes", recipes)

  //can use link to pass down state via the useLocation hook. see individual
  return (
    <div className="flex justify-center w-full md:w-1/3 p-4">
      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
        <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
          {name}
        </h5>
        <p className="text-gray-700 text-base mb-4">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <Link
          to={`/recipe/${id}`}
          state={{ recipes }}
          className="bg-gradient-to-r from-emerald-700 to-emerald-600 inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg hover:text-gray-800"
        >
          View Recipe
        </Link>
      </div>
    </div>
  );
};

export default Recipe;
