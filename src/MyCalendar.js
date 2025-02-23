import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import Modal from 'react-modal';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Configure React Modal
Modal.setAppElement('#root'); // Required for accessibility

const localizer = momentLocalizer(moment);

function MyCalendar() {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [formData, setFormData] = useState({
    title: '',
    start: '',
    end: '',
  });

  // Fetch appointments on component mount
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('/api/appointments');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    fetchAppointments();
  }, []);

  const formattedEvents = events.map((event) => ({
    title: event.title,
    start: new Date(event.start),
    end: new Date(event.end),
  }));

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/appointments', formData);
      alert('Appointment scheduled successfully!');
      setIsModalOpen(false); // Close the modal after submission
    } catch (error) {
      console.error('Error scheduling appointment:', error);
      alert('Failed to schedule appointment. Please try again.');
    }
  };

  return (
    <div>
      <h2>My Availability</h2>

      {/* Display the Calendar */}
      <div style={{ height: '500px' }}>
        <Calendar
          localizer={localizer}
          events={formattedEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>

      {/* Button to Open Modal */}
      <button
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={() => setIsModalOpen(true)} // Open the modal
      >
        Schedule Appointment
      </button>

      {/* Modal for Schedule Form */}
      <Modal
        isOpen={isModalOpen} // Control modal visibility
        onRequestClose={() => setIsModalOpen(false)} // Close modal on outside click or Esc key
        contentLabel="Schedule Appointment"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000, // Ensure the overlay is above everything else
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            width: '400px',
            maxWidth: '90%',
            zIndex: 1001, // Ensure the modal content is above the overlay and calendar

          },
        }}
      >
        <h3>Schedule an Appointment</h3>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Purpose of Meeting:</label>
            <input
              type="text"
              name="title"
              placeholder="Enter purpose"
              value={formData.title}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Start Time:</label>
            <input
              type="datetime-local"
              name="start"
              value={formData.start}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>End Time:</label>
            <input
              type="datetime-local"
              name="end"
              value={formData.end}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)} // Close modal
              style={{
                padding: '10px 20px',
                backgroundColor: '#ccc',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Schedule
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default MyCalendar;