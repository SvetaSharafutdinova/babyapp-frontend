import React from 'react';
import '../../App.css';

const HistoryMenu = ({ onSelectCategory }) => {
  return (
    <div className="container">
      <h2>History</h2>
      <button onClick={() => onSelectCategory('sleep')}>Sleep</button>
      <button onClick={() => onSelectCategory('feeding')}>Feeding</button>
      <button onClick={() => onSelectCategory('condition')}>Condition</button>
      <button onClick={() => onSelectCategory('growth')}>Growth</button>
      <button onClick={() => onSelectCategory('schedule')}>Schedule</button>
    </div>
  );
};

export default HistoryMenu;
