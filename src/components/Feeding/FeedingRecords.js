// src/components/Feeding/FeedingRecords.js
import React, { useState } from 'react';
import AddFeedingRecord from './AddFeedingRecord';
import ViewFeedingRecords from './ViewFeedingRecords';
import '../../App.css';

const FeedingRecords = () => {
  const [view, setView] = useState('default');

  return (
    <div className="container">
      <h2>Feeding Records</h2>
      {view === 'default' && (
        <>
          <button onClick={() => setView('add')}>Add Record</button>
          <button onClick={() => setView('view')}>View All Records</button>
        </>
      )}
      {view === 'add' && <AddFeedingRecord onRecordAdded={() => setView('default')} onBack={() => setView('default')} />}
      {view === 'view' && <ViewFeedingRecords onBack={() => setView('default')} />}
    </div>
  );
};

export default FeedingRecords;
