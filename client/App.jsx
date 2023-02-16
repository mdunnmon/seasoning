import React from 'react';
import './index.css';
import Home from './components/Home.jsx';
import Create from './components/Create.jsx';
import RecipeList from './components/RecipeList.jsx';
import IndividualRecipe from './components/IndividualRecipe.jsx';
import NotFound from './components/NotFound.jsx';
import { Link, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <>
      <nav class="flex items-center justify-between flex-wrap bg-teal-700 p-6">
        <ul class="flex items-center flex-shrink-0 text-white mr-6">
          <span class="font-semibold text-xl tracking-tight">seasoning</span>
          <li
            href="#responsive-header"
            class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            <Link to="/">Home</Link>
          </li>
          <li
            href="#responsive-header"
            class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            <Link to="/create">Create</Link>
          </li>
          <li
            href="#responsive-header"
            class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            <Link to="/recipe">Recipe List</Link>
          </li>
        </ul>
        <div>
          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
          >
            Log in
          </a>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/recipe" element={<RecipeList />} />
        <Route path="/recipe/:id" element={<IndividualRecipe />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;

/*main App component in react. has a navbar with an unordered list at the top with links to certain paths.
used links to create hyperlinks to other routes in the app 
utilized react router to create several route components with paths and elements set as components

*/
