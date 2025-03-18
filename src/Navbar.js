import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.list}>
        {/* Link to the Home page */}
        <li style={styles.item}>
          <NavLink
            to="/project-and-hobbies"
            style={({ isActive }) => ({
              ...styles.link,
              fontWeight: isActive ? 'bold' : 'normal',
              color: isActive ? '#ff6347' : 'white',
            })}
          >
            Home
          </NavLink>
        </li>

        {/* Link to the About page */}
        <li style={styles.item}>
          <NavLink
            to="/about"
            style={({ isActive }) => ({
              ...styles.link,
              fontWeight: isActive ? 'bold' : 'normal',
              color: isActive ? '#ff6347' : 'white',
            })}
          >
            About
          </NavLink>
        </li>

        {/* Link to the Calendar page */}
        <li style={styles.item}>
          <NavLink
            to="/calendar"
            style={({ isActive }) => ({
              ...styles.link,
              fontWeight: isActive ? 'bold' : 'normal',
              color: isActive ? '#ff6347' : 'white',
            })}
          >
            Calendar
          </NavLink>
        </li>
        <li style={styles.item}>
        <NavLink
          to="/wishlist"
          style={({ isActive }) => ({
            ...styles.link,
            fontWeight: isActive ? 'bold' : 'normal',
            color: isActive ? '#ff6347' : 'white',
          })}
        >
          Wishlist
        </NavLink>
      </li>
      <li style={styles.item}>
      <NavLink
        to="/itinerary"
        style={({ isActive }) => ({
          ...styles.link,
          fontWeight: isActive ? 'bold' : 'normal',
          color: isActive ? '#ff6347' : 'white',
        })}
      >
        Itinerary Planner
      </NavLink>
      </li>
      <li style={styles.item}>
      <NavLink
        to="/tiktok"
        style={({ isActive }) => ({
          ...styles.link,
          fontWeight: isActive ? 'bold' : 'normal',
          color: isActive ? '#ff6347' : 'white',
        })}
      >
      Tiktok
      </NavLink>
      </li>
      </ul>
    </nav>
  );
}

// Inline styles for simplicity (you can use CSS or styled-components instead)
const styles = {
  navbar: {
    backgroundColor: '#333',
    padding: '10px',
  },
  list: {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  item: {
    marginRight: '15px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
  },
};

export default Navbar;