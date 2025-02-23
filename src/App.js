import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar'; // Import the Navigation Bar
import About from './About'; // Import the About component
import MyCalendar from './MyCalendar'; // Import the Calendar component
import Home from './Home';
function App() {
  return (
    <div>
      {/* Add the Navigation Bar */}
      <Navbar />

      {/* Define Routes */}
      <Routes>
        {/* Default route: About page */}
        <Route path="/about" element={<About />} />

        {/* Calendar route */}
        <Route path="/calendar" element={<MyCalendar />} />

         {/* Default route: Home page */}
         <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;