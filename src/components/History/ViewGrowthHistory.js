// src/components/History/ViewGrowthHistory.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css';
import './HistoryTableStyles.css';

const ViewGrowthHistory = ({ onBack }) => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get('/history/growth');
        setRecords(response.data);
      } catch (error) {
        console.error('Error fetching growth records', error);
      }
    };

    fetchRecords();
  }, []);

  return (
    <div className="container">
      <button className="back-button" onClick={onBack}>Back</button>
      <h2>Growth History</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Height</th>
              <th>Weight</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td>{record.date.split('T')[0]}</td>
                <td>{record.height}</td>
                <td>{record.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewGrowthHistory;



