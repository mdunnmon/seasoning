import * as React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { RecipeType } from './types';

const IndividualRecipe: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const recipes = location.state.recipes;
  const recipe = recipes.find((recipe: RecipeType) => recipe._id === id);

  const [editable, setEditable] = useState(false);
  const [name, setName] = useState<string>(recipe?.name || '');
  const [description, setDescription] = useState<string>(
    recipe?.description || ''
  );
  const [time, setTime] = useState<string>(recipe?.time || '');
  const [ingredients, setIngredients] = useState<string>(
    recipe?.ingredients || ''
  );
  const [directions, setDirections] = useState<string>(
    recipe?.directions || ''
  );

  const handleEditClick = () => {
    setEditable(true);
  };

  if (!recipe) {
    return <div>Loading recipe...</div>;
  }
  const editRecipe = () => {
    const updatedRecipe = {
      ...recipe,
      name,
      description,
      time,
      ingredients,
      directions,
    };
    fetch('/api/edit', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: id,
        name: updatedRecipe.name,
        description: updatedRecipe.description,
        time: updatedRecipe.time,
        ingredients: updatedRecipe.ingredients,
        directions: updatedRecipe.directions,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Recipe edited successfully:', data);
        alert(`Successfully edited ${name} in database!`);
        setEditable(false);
      })
      .catch((err) => console.error('Error editing recipe:', err));
  };

  const deleteRecipe = () => {
    fetch('/api/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id: id }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Recipe created successfully:', data);
        alert(`Successfully deleted ${name} from database!`);
        navigate('/recipe');
      })
      .catch((err) => console.error('Error creating recipe:', err));
  };

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
          <h2 className="text-center pt-4 font-medium">
            <input
              className=" text-center w-full bg-transparent border-b-2 border-gray-400 focus:outline-none focus:border-emerald-700"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </h2>
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

  return (
    <div className="flex flex-wrap justify-center bg-gradient-to-b from-neutral-200 via-neutral-100 to-white-50">
      <div className="flex flex-col p-6 rounded-lg shadow-lg bg-white w-2/3 m-8">
        <div className="flex justify-between items-center bg-gradient-to-r from-emerald-900 to-emerald-700 text-white text-lg px-6 py-4 rounded">
          <h1 className="text-xl font-bold">{name}</h1>
          <h3>{time}</h3>
        </div>
        <h2 className="text-center pt-4 font-medium">{description}</h2>
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
