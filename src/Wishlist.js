import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://project-and-hobbies.onrender.com'; // Replace with your Render backend URL

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  // Fetch existing wishlist items
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/wishlist`);
        setWishlistItems(response.data);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };
    fetchWishlist();
  }, []);

  // Add a new item to the wishlist
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/wishlist`, { item: newItem });
      setNewItem(''); // Clear the input
      const response = await axios.get(`${API_BASE_URL}/api/wishlist`);
      setWishlistItems(response.data);
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Failed to add item. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>My Wishlist</h2>
      
      {/* Form to Add Items */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Add something to the wishlist..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Add to Wishlist
        </button>
      </form>

      {/* Display Wishlist Items */}
      <ul style={styles.list}>
        {wishlistItems.map((item, index) => (
          <li key={index} style={styles.listItem}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Inline styles for simplicity (you can use CSS or styled-components instead)
const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
  },
  form: {
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    marginRight: '10px',
    width: '300px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    padding: '10px',
    borderBottom: '1px solid #eee',
  },
};

export default Wishlist;