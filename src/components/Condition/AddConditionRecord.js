import React, { useState } from 'react';
import axios from 'axios';
import '../../App.css';
import '../Sleep/TableStyles.css';

const AddConditionRecord = ({ onRecordAdded, onBack }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [condition, setCondition] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newRecord = { date: `${date}T${time}:00Z`, condition };
      const response = await axios.post('/condition/create', newRecord);
      onRecordAdded(response.data);
      setDate('');
      setTime('');
      setCondition('');
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
      <h2>Add Condition Record</h2>
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
          <label htmlFor="condition">Condition:</label>
          <input
            id="condition"
            type="text"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Record</button>
      </form>
    </div>
  );
};

export default AddConditionRecord;
