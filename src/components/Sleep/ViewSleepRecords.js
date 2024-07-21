// src/components/Sleep/ViewSleepRecords.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditSleepRecord from './EditSleepRecord';
import '../../App.css';
import './TableStyles.css';

const ViewSleepRecords = ({ onBack }) => {
  const [records, setRecords] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);
  const [message, setMessage] = useState('');

  const fetchRecords = async () => {
    try {
      const response = await axios.get('/sleep/records');
      setRecords(response.data);
    } catch (error) {
      console.error('Error fetching sleep records', error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleRecordUpdated = (updatedRecord) => {
    setRecords(records.map(record => (record.id === updatedRecord.id ? updatedRecord : record)));
    setEditingRecord(null);
    setMessage('Record updated successfully');
  };

  const handleDelete = async (recordId) => {
    try {
      await axios.delete(`/sleep/record/${recordId}`);
      setRecords(records.filter(record => record.id !== recordId));
      setMessage('Record deleted successfully');
    } catch (error) {
      console.error('Error deleting sleep record', error);
    }
  };

  return (
    <div className="container">
      <h2>Sleep Records</h2>
      {message && <p className="success-message">{message}</p>}
      <button onClick={onBack}>Back</button>
      {editingRecord && (
        <EditSleepRecord 
          recordId={editingRecord.id} 
          onRecordUpdated={handleRecordUpdated} 
          initialData={editingRecord} 
        />
      )}
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Duration (minutes)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.date}</td>
              <td>{record.duration}</td>
              <td>
                <button onClick={() => setEditingRecord(record)}>Edit</button>
                <button onClick={() => handleDelete(record.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewSleepRecords;
