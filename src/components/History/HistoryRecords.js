// src/components/History/HistoryRecords.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import './HistoryStyles.css';

const HistoryRecords = () => {
  return (
    <div className="container">
      <h2>History</h2>
      <div className="history-buttons">
        <Link to="/history/sleep">Sleep History</Link>
        <Link to="/history/feeding">Feeding History</Link>
        <Link to="/history/condition">Condition History</Link>
        <Link to="/history/growth">Growth History</Link>
        <Link to="/history/schedule">Schedule History</Link>
      </div>
    </div>
  );
};

export default HistoryRecords;
