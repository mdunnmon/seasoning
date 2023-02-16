import React from 'react';
import App from './App.jsx';
import './index.css';
// import './styles.css';
import { createRoot } from 'react-dom/client';
//imported browser router and wrapped it around app. needed for react routing
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
