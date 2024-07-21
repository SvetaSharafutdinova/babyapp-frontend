// src/components/Dashboard/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';
import './DashboardStyles.css';

const Dashboard = () => {
  const [latestSleepRecord, setLatestSleepRecord] = useState(null);
  const [latestFeedingRecord, setLatestFeedingRecord] = useState(null);

  useEffect(() => {
    const fetchLatestRecords = async () => {
      try {
        const sleepResponse = await axios.get('/sleep/records/latest');
        const feedingResponse = await axios.get('/feeding/records/latest');
        setLatestSleepRecord(sleepResponse.data);
        setLatestFeedingRecord(feedingResponse.data);
      } catch (error) {
        console.error('Error fetching latest records', error);
      }
    };

    fetchLatestRecords();
  }, []);

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <div className="dashboard-buttons">
        <Link to="/sleep">Sleep</Link>
        <Link to="/feeding">Feeding</Link>
        <Link to="/condition">Condition</Link>
        <Link to="/growth">Growth</Link>
        <Link to="/schedule">Schedule</Link>
        <Link to="/history">History</Link>
      </div>
      <div className="latest-records">
        <h3>Latest Sleep Record</h3>
        {latestSleepRecord ? (
          <div>
            <p>Date: {latestSleepRecord.date.split('T')[0]}</p>
            <p>Time: {latestSleepRecord.date.split('T')[1].slice(0, 5)}</p>
            <p>Duration: {latestSleepRecord.duration} minutes</p>
          </div>
        ) : (
          <p>No sleep records available</p>
        )}
        <h3>Latest Feeding Record</h3>
        {latestFeedingRecord ? (
          <div>
            <p>Date: {latestFeedingRecord.date.split('T')[0]}</p>
            <p>Time: {latestFeedingRecord.date.split('T')[1].slice(0, 5)}</p>
            <p>Food Type: {latestFeedingRecord.foodType}</p>
            <p>Quantity: {latestFeedingRecord.quantity}</p>
          </div>
        ) : (
          <p>No feeding records available</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
