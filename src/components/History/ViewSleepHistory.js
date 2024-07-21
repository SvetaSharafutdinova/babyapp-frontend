// src/components/History/ViewSleepHistory.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css';
import '../Sleep/TableStyles.css';

const ViewSleepHistory = ({ onBack }) => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get('/history/sleep');
        setRecords(response.data);
      } catch (error) {
        console.error('Error fetching sleep records', error);
      }
    };

    fetchRecords();
  }, []);

  return (
    <div className="container">
      <button className="back-button" onClick={onBack}>Back</button>
      <h2>Sleep History</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Duration (minutes)</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.date}</td>
              <td>{record.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewSleepHistory;

