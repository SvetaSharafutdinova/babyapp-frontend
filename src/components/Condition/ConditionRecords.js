import React, { useState } from 'react';
import AddConditionRecord from './AddConditionRecord';
import ViewConditionRecords from './ViewConditionRecords';
import '../../App.css';

const ConditionRecords = () => {
  const [view, setView] = useState('default');

  return (
    <div className="container">
      <h2>Condition Records</h2>
      {view === 'default' && (
        <>
          <button onClick={() => setView('add')}>Add Record</button>
          <button onClick={() => setView('view')}>View All Records</button>
        </>
      )}
      {view === 'add' && <AddConditionRecord onRecordAdded={() => setView('default')} onBack={() => setView('default')} />}
      {view === 'view' && <ViewConditionRecords onBack={() => setView('default')} />}
    </div>
  );
};

export default ConditionRecords;
