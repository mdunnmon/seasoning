import * as React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
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
  );
}
