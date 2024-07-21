// src/components/Growth/ViewGrowthRecords.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditGrowthRecord from './EditGrowthRecord';
import '../../App.css';
import '../Sleep/TableStyles.css';

const ViewGrowthRecords = ({ onBack }) => {
  const [records, setRecords] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);

  const fetchRecords = async () => {
    try {
      const response = await axios.get('/growth/records');
      setRecords(response.data);
    } catch (error) {
      console.error('Error fetching growth records', error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleRecordUpdated = (updatedRecord) => {
    setRecords(records.map(record => (record.id === updatedRecord.id ? updatedRecord : record)));
    setEditingRecord(null);
  };

  const handleDelete = async (recordId) => {
    try {
      await axios.delete(`/growth/record/${recordId}`);
      setRecords(records.filter(record => record.id !== recordId));
    } catch (error) {
      console.error('Error deleting growth record', error);
    }
  };

  return (
    <div className="container">
      <button className="back-button" onClick={onBack}>Back</button>
      <h2>Growth Records</h2>
      {editingRecord && (
        <EditGrowthRecord 
          recordId={editingRecord.id} 
          onRecordUpdated={handleRecordUpdated} 
          initialData={editingRecord} 
        />
      )}
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Height (cm)</th>
            <th>Weight (kg)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.date}</td>
              <td>{record.height}</td>
              <td>{record.weight}</td>
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

export default ViewGrowthRecords;
