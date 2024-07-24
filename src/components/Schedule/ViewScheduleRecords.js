import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditScheduleRecord from './EditScheduleRecord';
import '../../App.css';
import '../Sleep/TableStyles.css';

const ViewScheduleRecords = ({ onBack }) => {
  const [records, setRecords] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);

  const fetchRecords = async () => {
    try {
      const response = await axios.get('/schedule/records');
      setRecords(response.data);
    } catch (error) {
      console.error('Error fetching schedule records', error);
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
      await axios.delete(`/schedule/record/${recordId}`);
      setRecords(records.filter(record => record.id !== recordId));
    } catch (error) {
      console.error('Error deleting schedule record', error);
    }
  };

  return (
    <div className="container">
      <button className="back-button" onClick={onBack}>Back</button>
      <h2>Schedule Records</h2>
      {editingRecord && (
        <EditScheduleRecord 
          recordId={editingRecord.id} 
          onRecordUpdated={handleRecordUpdated} 
          initialData={editingRecord} 
        />
      )}
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Activity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.date}</td>
              <td>{record.activity}</td>
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

export default ViewScheduleRecords;
