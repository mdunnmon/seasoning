import * as React from 'react';
import './index.css';
import Home from './components/Home';
import Create from './components/Create';
import RecipeList from './components/RecipeList';
import IndividualRecipe from './components/IndividualRecipe';
import NotFound from './components/NotFound';
import Footer from './components/Footer';
import { Link, Route, Routes } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <>
      <nav className="flex items-center justify-between flex-wrap p-5 bg-gradient-to-r from-emerald-700 via-yellow-400 to-indigo-800 ">
        <span className="font-semibold text-xl tracking-tight text-white">
          Seasoning
        </span>
        <ul className="flex items-center justify-between flex-shrink-0 mr-6">
          <li className="block mt-4 lg:inline-block lg:mt-0 mr-4 text-slate-200 hover:text-white">
            <Link to="/">Home</Link>
          </li>
          <li className="block mt-4 lg:inline-block lg:mt-0 text-picton-blue-100 mr-4  text-slate-200 hover:text-white">
            <Link to="/create">Create</Link>
          </li>
          <li className="block mt-4 lg:inline-block lg:mt-0 text-picton-blue-100 mr-4  text-slate-200 hover:text-white">
            <Link to="/recipe">Recipe List</Link>
          </li>
          <a
            href=""
            className="inline-block text-sm px-4 py-2 leading-none border rounded mt-4 lg:mt-0  text-slate-200 hover:text-white hover:bg-gradient-to-r from-emerald-700 to-emerald-600"
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
      <Footer />
    </>
  );
};

export default App;
