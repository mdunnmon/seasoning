import * as React from 'react';
import './index.css';
import Navbar from './components/Navbar';
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
      <Navbar />
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
