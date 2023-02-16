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
      <nav class="flex items-center justify-between flex-wrap p-5 bg-gradient-to-r from-emerald-700 via-yellow-400 to-indigo-800 ">
        <span class="font-semibold text-xl tracking-tight text-white">
          Seasoning
        </span>
        <ul className="flex items-center justify-between flex-shrink-0 mr-6">
          <li
            href="#responsive-header"
            class="block mt-4 lg:inline-block lg:mt-0 mr-4 text-slate-200 hover:text-white"
          >
            <Link to="/">Home</Link>
          </li>
          <li
            href="#responsive-header"
            class="block mt-4 lg:inline-block lg:mt-0 text-picton-blue-100 mr-4  text-slate-200 hover:text-white"
          >
            <Link to="/create">Create</Link>
          </li>
          <li
            href="#responsive-header"
            class="block mt-4 lg:inline-block lg:mt-0 text-picton-blue-100 mr-4  text-slate-200 hover:text-white"
          >
            <Link to="/recipe">Recipe List</Link>
          </li>
          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            class="inline-block text-sm px-4 py-2 leading-none border rounded mt-4 lg:mt-0  text-slate-200 hover:text-white hover:bg-gradient-to-r from-emerald-700 to-emerald-600"
          >
            Log in
          </a>
        </ul>
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
