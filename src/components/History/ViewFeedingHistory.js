// src/components/History/ViewFeedingHistory.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css';
import '../Sleep/TableStyles.css';

const ViewFeedingHistory = ({ onBack }) => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get('/history/feeding');
        setRecords(response.data);
      } catch (error) {
        console.error('Error fetching feeding records', error);
      }
    };

    fetchRecords();
  }, []);

  return (
    <div className="container">
      <button className="back-button" onClick={onBack}>Back</button>
      <h2>Feeding History</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Food Type</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.date.split('T')[0]}</td>
              <td>{record.date.split('T')[1].slice(0, 5)}</td>
              <td>{record.foodType}</td>
              <td>{record.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewFeedingHistory;


