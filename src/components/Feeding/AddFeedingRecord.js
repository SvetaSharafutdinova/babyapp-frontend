import React, { useState } from 'react';
import axios from 'axios';
import '../../App.css';
import '../Sleep/TableStyles.css';

const AddFeedingRecord = ({ onRecordAdded, onBack }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [foodType, setFoodType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newRecord = { date: `${date}T${time}:00Z`, foodType, quantity };
      const response = await axios.post('/feeding/create', newRecord);
      onRecordAdded(response.data);
      setDate('');
      setTime('');
      setFoodType('');
      setQuantity('');
      setError(null);
      setSuccessMessage('Record successfully added');
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
      <h2>Add Feeding Record</h2>
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
          <label htmlFor="foodType">Food Type:</label>
          <input
            id="foodType"
            type="text"
            value={foodType}
            onChange={(e) => setFoodType(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Record</button>
      </form>
    </div>
  );
};

export default AddFeedingRecord;

