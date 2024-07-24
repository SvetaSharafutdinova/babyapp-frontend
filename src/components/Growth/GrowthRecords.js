import React, { useState } from 'react';
import AddGrowthRecord from './AddGrowthRecord';
import ViewGrowthRecords from './ViewGrowthRecords';
import '../../App.css';

const GrowthRecords = () => {
  const [view, setView] = useState('default');

  return (
    <div className="container">
      <h2>Growth Records</h2>
      {view === 'default' && (
        <>
          <button onClick={() => setView('add')}>Add Record</button>
          <button onClick={() => setView('view')}>View All Records</button>
        </>
      )}
      {view === 'add' && <AddGrowthRecord onRecordAdded={() => setView('default')} onBack={() => setView('default')} />}
      {view === 'view' && <ViewGrowthRecords onBack={() => setView('default')} />}
    </div>
  );
};

export default GrowthRecords;
