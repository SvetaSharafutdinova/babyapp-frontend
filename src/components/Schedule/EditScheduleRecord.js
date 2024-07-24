import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css';
import '../Sleep/TableStyles.css';

const EditScheduleRecord = ({ recordId, onRecordUpdated, initialData }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [activity, setActivity] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialData) {
      const [recordDate, recordTime] = initialData.date.split('T');
      setDate(recordDate);
      setTime(recordTime.slice(0, 5))
      setActivity(initialData.activity); 
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedRecord = { date: `${date}T${time}:00Z`, activity };
      await axios.put(`/schedule/record/${recordId}`, updatedRecord);
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
      <h2>Edit Schedule Record</h2>
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
          <label htmlFor="edit-activity">Activity:</label>
          <input
            id="edit-activity"
            type="text"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Record</button>
      </form>
    </div>
  );
};

export default EditScheduleRecord;
