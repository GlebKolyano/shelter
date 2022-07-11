import React from 'react';
import './style.css';

function Loader() {
  return (
    <div className="progress">
      <div className="indeterminate" />
    </div>
  );
}

export default Loader;