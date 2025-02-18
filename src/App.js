import React from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import About from './About';
function Home() {
  return <h2>Home Page</h2>;
}


function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link> {/* Navigation link for Home */}
          </li>
          <li>
            <Link to="/about">About</Link> {/* Navigation link for About */}
          </li>
        </ul>
      </nav>
    
      {/* Define your routes */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Route for Home */}
        <Route path="/about" element={<About />} /> {/* Route for About */}
      </Routes>
    </div>
  );
}

export default App;