import React from 'react';
import './Sidebar.scss';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="icon">
        Icon 1
      </div>
      <div className="icon">
        Icon 2
      </div>
      <div className="icon">
        Icon 3
      </div>
      <div className="icon">
        Icon 4
      </div>
      <div className="icon">
        Icon 5
      </div>
    </div>
  );
};

export default Sidebar;
