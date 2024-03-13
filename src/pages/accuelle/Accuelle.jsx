import React  from 'react';
import "./style.css";

function Accuelle() {
  return (
    <div className='bienv'>
      {[1, 2, 3, 4, 5, 6].map((e, index) => (
        <div 
          key={index} 
          className={`circle`} 
        >
          <div className='minCircle'></div>
        </div>
      ))}
      <h1>Bienvenue</h1>
    </div>
  );
}

export default Accuelle;
