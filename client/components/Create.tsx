import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecipeType } from './types';

const Create: React.FC = () => {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<RecipeType>({
    _id: '',
    name: '',
    description: '',
    time: '',
    ingredients: '',
    directions: '',
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    description: '',
    time: '',
    ingredients: '',
    directions: '',
  });
  const [databaseError, setDatabaseError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setFormSubmitted(true);

    const emptyFields = Object.entries(recipe)
      .filter(([key, value]) => key !== '_id' && value.trim() === '')
      .map(([key]) => key);

    console.log('empty fields', emptyFields);

    if (emptyFields.length > 0) {
      const errorMessage = `Please fill out the following fields: ${emptyFields.join(
        ', '
      )}`;
      alert(errorMessage);
      return;
    }

    fetch('/api/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipe),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Recipe created successfully:', data);
        alert(`Successfully added ${recipe.name} to database!`);
        navigate('/recipe');
      })
      .catch((err) => {
        console.error('Error creating recipe:', err);
        setDatabaseError('Error creating recipe. Please try again.');
      });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-b from-neutral-200 via-neutral-100 to-white-50 p-8">
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full max-w-4xl mx-auto"
      >
        <input
          className={`border py-2 px-3 text-grey-darkest mb-4 w-full sm:w-1/4 sm:mb-2 focus:border-emerald-700 focus:outline-none rounded-md shadow-md ${
            (formErrors.name || (formSubmitted && recipe.name.trim() === '')) &&
            'border-red-500'
          }`}
          placeholder="Recipe Name"
          type="text"
          name="name"
          value={recipe.name}
          onChange={handleChange}
        />
        <textarea
          className={`border py-2 px-3 text-grey-darkest mb-4 w-full sm:w-1/2 sm:mb-2 focus:border-emerald-700 focus:outline-none resize-none rounded-md shadow-md ${
            (formErrors.description ||
              (formSubmitted && recipe.description.trim() === '')) &&
            'border-red-500'
          }`}
          placeholder="Short Description"
          rows={Number('2')}
          name="description"
          value={recipe.description}
          onChange={handleChange}
        />

        <input
          className={`border py-2 px-3 text-grey-darkest mb-4 w-1/5 sm:w-1/8 sm:mb-2 focus:border-emerald-700 focus:outline-none rounded-md shadow-md ${
            (formErrors.time || (formSubmitted && recipe.time.trim() === '')) &&
            'border-red-500'
          }`}
          placeholder="Time"
          type="text"
          name="time"
          value={recipe.time}
          onChange={handleChange}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mx-auto mb-4">
          <textarea
            className={`border py-2 px-3 text-grey-darkest h-36 sm:h-28 w-full focus:border-emerald-700 focus:outline-none resize-none rounded-md shadow-md ${
              (formErrors.ingredients ||
                (formSubmitted && recipe.ingredients.trim() === '')) &&
              'border-red-500'
            }`}
            placeholder="Ingredients"
            rows={Number('4')}
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleChange}
          />

          <textarea
            className={`border py-2 px-3 text-grey-darkest h-36 sm:h-28 w-full focus:border-emerald-700 focus:outline-none resize-none rounded-md shadow-md ${
              (formErrors.directions ||
                (formSubmitted && recipe.directions.trim() === '')) &&
              'border-red-500'
            }`}
            placeholder="Directions"
            rows={Number('4')}
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
