import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    name: '',
    description: '',
    time: '',
    ingredients: '',
    directions: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

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
      .catch((err) => console.error('Error creating recipe:', err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
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
