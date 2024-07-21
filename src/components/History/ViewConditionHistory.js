// src/components/History/ViewConditionHistory.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css';
import './HistoryTableStyles.css';

const ViewConditionHistory = ({ onBack }) => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get('/history/condition');
        setRecords(response.data);
      } catch (error) {
        console.error('Error fetching condition records', error);
      }
    };

    fetchRecords();
  }, []);

  return (
    <div className="container">
      <button className="back-button" onClick={onBack}>Back</button>
      <h2>Condition History</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Condition</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td>{record.date.split('T')[0]}</td>
                <td>{record.date.split('T')[1].slice(0, 5)}</td>
                <td>{record.condition}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewConditionHistory;



