import React, { useState } from 'react';
import ListofPlayers from './ListofPlayers';
import IndianPlayers from './IndianPlayers';
import './App.css';

function App() {
  // Using React state to allow easy live toggle of the Flag variable
  const [flag, setFlag] = useState(true);

  // Implement the simple if-else rendering logic as requested
  let renderedComponent;
  if (flag === true) {
    renderedComponent = <ListofPlayers />;
  } else {
    renderedComponent = <IndianPlayers />;
  }

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <div className="brand">
          <span className="logo-icon">🏏</span>
          <h2>CricketApp Dashboard</h2>
        </div>
        <div className="flag-control">
          <div className="status-label">
            Flag Status: <span className={`flag-status ${flag ? 'flag-true' : 'flag-false'}`}>{flag.toString().toUpperCase()}</span>
          </div>
          <button className="btn-toggle" onClick={() => setFlag(!flag)}>
            Toggle Flag
          </button>
        </div>
      </header>

      <main className="main-content">
        {renderedComponent}
      </main>

      <footer className="app-footer">
        <p>ES6 Features Lab &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
