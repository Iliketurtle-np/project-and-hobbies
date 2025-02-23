import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={styles.container}>
      <h1>Welcome to My Website!</h1>
      <p>This is the home page. Explore the following sections:</p>
      <ul style={styles.list}>
        <li>
          <Link to="/about" style={styles.link}>About Me</Link>
        </li>
        <li>
          <Link to="/calendar" style={styles.link}>My Calendar</Link>
        </li>
      </ul>
    </div>
  );
}

// Inline styles for simplicity (you can use CSS or styled-components instead)
const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
    fontSize: '18px',
  },
};

export default Home;