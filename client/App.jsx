import React from 'react';
import Home from './components/Home.jsx';
import Recipe from './components/Recipe.jsx';
import Create from './components/Create.jsx';
import Edit from './components/Edit.jsx';
import RecipeList from './components/RecipeList.jsx';
import IndividualRecipe from './components/IndividualRecipe.jsx';
import NotFound from './components/NotFound.jsx';
import { Link, Route, Routes } from 'react-router-dom';

const App = () => {
    return (
      <>
      <nav>
        <ul>
          <li><Link to='/' element={<Home />}>Home</Link></li>
          <li><Link to='/create' element={<Create />}>Create</Link></li>
          <li><Link to='/recipe' element={<RecipeList />}>Recipes List</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/create' element={<Create/>} />
        <Route path='/recipe' element={<RecipeList/>} />
        <Route path='/recipe/:id' element= {<IndividualRecipe/>} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
      </>
    );
  };

export default App;

//hi