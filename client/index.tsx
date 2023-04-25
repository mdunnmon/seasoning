import * as React from 'react';
import App from './App';
import './index.css';
import { createRoot } from 'react-dom/client';
//imported browser router and wrapped it around app. needed for react routing
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root');
if (!container) {
  throw new Error("Failed to find 'root' element");
}
const root = createRoot(container as HTMLElement);
root.render(
  <BrowserRouter>
    <div className="font-sans">
      <App />
    </div>
  </BrowserRouter>
);
