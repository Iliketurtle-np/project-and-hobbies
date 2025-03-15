import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar'; // Import the Navigation Bar
import About from './About'; // Import the About component
import MyCalendar from './MyCalendar'; // Import the Calendar component
import Home from './Home';
import Wishlist from './Wishlist';
import ItineraryPlanner from './ItineraryPlanner';
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
         <Route path="/project-and-hobbies" element={<Home />} />
         <Route path="/wishlist" element={<Wishlist />} /> {/* Wishlist route */}
         <Route path="/itinerary" element={<ItineraryPlanner />} /> {/* Itinerary route */}

      </Routes>
    </div>
  );
}

export default App;