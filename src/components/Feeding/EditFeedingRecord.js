// src/components/Feeding/EditFeedingRecord.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css';
import './TableStyles.css';

const EditFeedingRecord = ({ recordId, onRecordUpdated, initialData }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [foodType, setFoodType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialData) {
      const [recordDate, recordTime] = initialData.date.split('T');
      setDate(recordDate);
      setTime(recordTime.slice(0, 5)); // Only HH:MM
      setFoodType(initialData.foodType);
      setQuantity(initialData.quantity);
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedRecord = { date: `${date}T${time}:00Z`, foodType, quantity };
      await axios.put(`/feeding/record/${recordId}`, updatedRecord);
      onRecordUpdated({ ...updatedRecord, id: recordId });
      setError(null);
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
      <h2>Edit Feeding Record</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="edit-date">Date:</label>
          <input
            id="edit-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="edit-time">Time:</label>
          <input
            id="edit-time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="edit-foodType">Food Type:</label>
          <input
            id="edit-foodType"
            type="text"
            value={foodType}
            onChange={(e) => setFoodType(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="edit-quantity">Quantity:</label>
          <input
            id="edit-quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Record</button>
      </form>
    </div>
  );
};

export default EditFeedingRecord;
