// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SleepRecords from './components/Sleep/SleepRecords';
import FeedingRecords from './components/Feeding/FeedingRecords';
import ConditionRecords from './components/Condition/ConditionRecords';
import GrowthRecords from './components/Growth/GrowthRecords';
import ScheduleRecords from './components/Schedule/ScheduleRecords';
import HistoryMenu from './components/History/HistoryMenu';
import ViewSleepHistory from './components/History/ViewSleepHistory';
import ViewFeedingHistory from './components/History/ViewFeedingHistory';
import ViewConditionHistory from './components/History/ViewConditionHistory';
import ViewGrowthHistory from './components/History/ViewGrowthHistory';
import ViewScheduleHistory from './components/History/ViewScheduleHistory';
import Dashboard from './components/Dashboard/Dashboard';
import './App.css';

function App() {
  const [historyView, setHistoryView] = useState('menu');

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/sleep">Sleep</Link></li>
            <li><Link to="/feeding">Feeding</Link></li>
            <li><Link to="/condition">Condition</Link></li>
            <li><Link to="/growth">Growth</Link></li>
            <li><Link to="/schedule">Schedule</Link></li>
            <li><Link to="/history">History</Link></li>
            <li><Link to="/">Dashboard</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/sleep/*" element={<SleepRecords />} />
          <Route path="/feeding/*" element={<FeedingRecords />} />
          <Route path="/condition/*" element={<ConditionRecords />} />
          <Route path="/growth/*" element={<GrowthRecords />} />
          <Route path="/schedule/*" element={<ScheduleRecords />} />
          <Route path="/history/*" element={
            historyView === 'menu' ? (
              <HistoryMenu onSelectCategory={(category) => setHistoryView(category)} />
            ) : (
              historyView === 'sleep' ? <ViewSleepHistory onBack={() => setHistoryView('menu')} /> :
              historyView === 'feeding' ? <ViewFeedingHistory onBack={() => setHistoryView('menu')} /> :
              historyView === 'condition' ? <ViewConditionHistory onBack={() => setHistoryView('menu')} /> :
              historyView === 'growth' ? <ViewGrowthHistory onBack={() => setHistoryView('menu')} /> :
              <ViewScheduleHistory onBack={() => setHistoryView('menu')} />
            )
          } />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
