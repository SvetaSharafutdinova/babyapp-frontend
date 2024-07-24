import React, { useState } from 'react';
import axios from 'axios';
import '../../App.css';
import '../Sleep/TableStyles.css';

const AddGrowthRecord = ({ onRecordAdded, onBack }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newRecord = { date: `${date}T${time}:00Z`, height, weight };
      const response = await axios.post('/growth/create', newRecord);
      onRecordAdded(response.data);
      setDate('');
      setTime('');
      setHeight('');
      setWeight('');
      setError(null);
      setSuccessMessage('Record added successfully');
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="container">
      <button className="back-button" onClick={onBack}>Back</button>
      <h2>Add Growth Record</h2>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="time">Time:</label>
          <input
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="height">Height (cm):</label>
          <input
            id="height"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="weight">Weight (kg):</label>
          <input
            id="weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Record</button>
      </form>
    </div>
  );
};

export default AddGrowthRecord;
