import React, { useState } from 'react';
import axios from 'axios';

function ScheduleForm() {
  const [formData, setFormData] = useState({
    title: '',
    start: '',
    end: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/appointments', formData);
      alert('Appointment scheduled successfully!');
    } catch (error) {
      console.error('Error scheduling appointment:', error);
      alert('Failed to schedule appointment. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Schedule an Appointment</h2>
      <input
        type="text"
        name="title"
        placeholder="Purpose of Meeting"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <input
        type="datetime-local"
        name="start"
        value={formData.start}
        onChange={handleChange}
        required
      />
      <input
        type="datetime-local"
        name="end"
        value={formData.end}
        onChange={handleChange}
        required
      />
      <button type="submit">Schedule</button>
    </form>
  );
}

export default ScheduleForm;