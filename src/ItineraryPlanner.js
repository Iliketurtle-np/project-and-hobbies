import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://project-and-hobbies.onrender.com'; // Replace with your Render backend URL

function ItineraryPlanner() {
  const [itineraryItems, setItineraryItems] = useState([]);
  const [newItem, setNewItem] = useState({
    title: '',
    time: '',
    location: '',
    description: '',
  });

  // Fetch existing itinerary items
  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/itinerary`);
        setItineraryItems(response.data);
      } catch (error) {
        console.error('Error fetching itinerary:', error);
      }
    };
    fetchItinerary();
  }, []);

  // Add a new item to the itinerary
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/itinerary`, newItem);
      setNewItem({ title: '', time: '', location: '', description: '' }); // Clear the form
      const response = await axios.get(`${API_BASE_URL}/api/itinerary`);
      setItineraryItems(response.data);
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Failed to add item. Please try again.');
    }
  };

  // Delete an item from the itinerary
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/itinerary/${id}`);
      const updatedItems = itineraryItems.filter((item) => item.id !== id);
      setItineraryItems(updatedItems);
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Itinerary Planner</h2>

      {/* Form to Add Items */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Title"
          value={newItem.title}
          onChange={(e) =>
            setNewItem({ ...newItem, title: e.target.value })
          }
          style={styles.input}
          required
        />
        <input
          type="datetime-local"
          value={newItem.time}
          onChange={(e) =>
            setNewItem({ ...newItem, time: e.target.value })
          }
          style={styles.input}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={newItem.location}
          onChange={(e) =>
            setNewItem({ ...newItem, location: e.target.value })
          }
          style={styles.input}
        />
        <textarea
          placeholder="Description (optional)"
          value={newItem.description}
          onChange={(e) =>
            setNewItem({ ...newItem, description: e.target.value })
          }
          style={styles.textarea}
        />
        <button type="submit" style={styles.button}>
          Add to Itinerary
        </button>
      </form>

      {/* Display Itinerary Items */}
      <ul style={styles.list}>
        {itineraryItems.map((item) => (
          <li key={item.id} style={styles.card}>
            <h3>{item.title}</h3>
            <p><strong>Time:</strong> {new Date(item.time).toLocaleString()}</p>
            <p><strong>Location:</strong> {item.location || 'N/A'}</p>
            <p><strong>Description:</strong> {item.description || 'No description'}</p>
            <button onClick={() => handleDelete(item.id)} style={styles.deleteButton}>
              Delete
            </button>
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
    width: 'calc(50% - 10px)',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  textarea: {
    padding: '10px',
    width: '100%',
    height: '60px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    resize: 'none',
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
  card: {
    padding: '20px',
    margin: '10px auto',
    maxWidth: '600px',
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  deleteButton: {
    marginTop: '10px',
    padding: '5px 10px',
    backgroundColor: '#ff4d4d',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default ItineraryPlanner;