import React, { useState } from 'react';
import './App.css';
import ListofPlayers from './ListofPlayers';
import IndianPlayers from './IndianPlayers';

function App() {
  // State to hold the flag variable
  const [flag, setFlag] = useState(true);

  // Simple conditional rendering of components based on flag
  let activeComponent;
  if (flag === true) {
    activeComponent = <ListofPlayers />;
  } else {
    activeComponent = <IndianPlayers />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="portal-title">Cricket Squad Center</h1>
        
        {/* Flag control panel */}
        <div className="control-panel">
          <span className="control-label">Active Component:</span>
          <div className="toggle-container">
            <button 
              className={`toggle-btn ${flag ? 'active' : ''}`} 
              onClick={() => setFlag(true)}
            >
              List of Players (Flag=True)
            </button>
            <button 
              className={`toggle-btn ${!flag ? 'active' : ''}`} 
              onClick={() => setFlag(false)}
            >
              Indian Players (Flag=False)
            </button>
          </div>
        </div>

        <div className="container">
          {activeComponent}
        </div>
      </header>
    </div>
  );
}

export default App;
