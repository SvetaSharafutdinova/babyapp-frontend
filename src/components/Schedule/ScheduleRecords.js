import React, { useState } from 'react';
import AddScheduleRecord from './AddScheduleRecord';
import ViewScheduleRecords from './ViewScheduleRecords';
import '../../App.css';

const ScheduleRecords = () => {
  const [view, setView] = useState('default');

  return (
    <div className="container">
      <h2>Schedule Records</h2>
      {view === 'default' && (
        <>
          <button onClick={() => setView('add')}>Add Record</button>
          <button onClick={() => setView('view')}>View All Records</button>
        </>
      )}
      {view === 'add' && <AddScheduleRecord onRecordAdded={() => setView('default')} onBack={() => setView('default')} />}
      {view === 'view' && <ViewScheduleRecords onBack={() => setView('default')} />}
    </div>
  );
};

export default ScheduleRecords;
