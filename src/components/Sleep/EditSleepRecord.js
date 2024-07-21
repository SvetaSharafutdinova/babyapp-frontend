// src/components/Sleep/EditSleepRecord.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css';
import './TableStyles.css';

const EditSleepRecord = ({ recordId, onRecordUpdated, initialData }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialData) {
      const [recordDate, recordTime] = initialData.date.split('T');
      setDate(recordDate);
      setTime(recordTime.slice(0, 5)); // Only HH:MM
      setDuration(initialData.duration);
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedRecord = { date: `${date}T${time}:00Z`, duration };
      await axios.put(`/sleep/record/${recordId}`, updatedRecord);
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
      <h2>Edit Sleep Record</h2>
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
          <label htmlFor="edit-duration">Duration (minutes):</label>
          <input
            id="edit-duration"
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Record</button>
      </form>
    </div>
  );
};

export default EditSleepRecord;
