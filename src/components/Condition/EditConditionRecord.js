import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css';
import '../Sleep/TableStyles.css';

const EditConditionRecord = ({ recordId, onRecordUpdated, initialData }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [condition, setCondition] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialData) {
      const [recordDate, recordTime] = initialData.date.split('T');
      setDate(recordDate);
      setTime(recordTime.slice(0, 5)); 
      setCondition(initialData.condition);
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedRecord = { date: `${date}T${time}:00Z`, condition };
      await axios.put(`/condition/record/${recordId}`, updatedRecord);
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
      <h2>Edit Condition Record</h2>
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
          <label htmlFor="edit-condition">Condition:</label>
          <input
            id="edit-condition"
            type="text"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Record</button>
      </form>
    </div>
  );
};

export default EditConditionRecord;
