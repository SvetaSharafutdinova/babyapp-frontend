import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css';
import '../Sleep/TableStyles.css';

const EditGrowthRecord = ({ recordId, onRecordUpdated, initialData }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialData) {
      const [recordDate, recordTime] = initialData.date.split('T');
      setDate(recordDate);
      setTime(recordTime.slice(0, 5)); 
      setHeight(initialData.height);
      setWeight(initialData.weight);
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedRecord = { date: `${date}T${time}:00Z`, height, weight };
      await axios.put(`/growth/record/${recordId}`, updatedRecord);
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
      <h2>Edit Growth Record</h2>
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
          <label htmlFor="edit-height">Height (cm):</label>
          <input
            id="edit-height"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="edit-weight">Weight (kg):</label>
          <input
            id="edit-weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Record</button>
      </form>
    </div>
  );
};

export default EditGrowthRecord;
