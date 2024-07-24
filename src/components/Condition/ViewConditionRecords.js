import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditConditionRecord from './EditConditionRecord';
import '../../App.css';
import '../Sleep/TableStyles.css';

const ViewConditionRecords = ({ onBack }) => {
  const [records, setRecords] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);

  const fetchRecords = async () => {
    try {
      const response = await axios.get('/condition/records');
      setRecords(response.data);
    } catch (error) {
      console.error('Error fetching condition records', error);
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
      await axios.delete(`/condition/record/${recordId}`);
      setRecords(records.filter(record => record.id !== recordId));
    } catch (error) {
      console.error('Error deleting condition record', error);
    }
  };

  return (
    <div className="container">
      <button className="back-button" onClick={onBack}>Back</button>
      <h2>Condition Records</h2>
      {editingRecord && (
        <EditConditionRecord 
          recordId={editingRecord.id} 
          onRecordUpdated={handleRecordUpdated} 
          initialData={editingRecord} 
        />
      )}
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Condition</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.date}</td>
              <td>{record.time}</td>
              <td>{record.condition}</td>
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

export default ViewConditionRecords;
