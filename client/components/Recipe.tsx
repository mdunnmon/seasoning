import * as React from 'react';
import { Link } from 'react-router-dom';
import { RecipeProps } from './types';

const Recipe: React.FC<RecipeProps> = ({ name, id, recipes, description }) => {
  return (
    <div className="flex justify-center w-full md:w-1/3 p-4">
      <div className="w-80 h-60 block p-6 rounded-lg shadow-lg bg-white relative">
        <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2 text-center">
          {name}
        </h5>
        <p className="text-gray-700 text-base mb-4">{description}</p>
        <Link
          to={`/recipe/${id}`}
          state={{ recipes }}
          className="absolute bottom-3 right-3 bg-gradient-to-r from-emerald-700 to-emerald-600 inline-block px-6 py-2.5 text-gray-800 font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg hover:text-white"
        >
          View Recipe
        </Link>
      </div>
    </div>
  );
};

export default Recipe;
