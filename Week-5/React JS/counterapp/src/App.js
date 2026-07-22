import React from 'react';
import './App.css';
import CountPeople from './CountPeople';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="portal-title">Mall Activity Tracker</h1>
        <div className="container">
          <CountPeople />
        </div>
      </header>
    </div>
  );
}

export default App;
