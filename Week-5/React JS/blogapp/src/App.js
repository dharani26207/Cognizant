import React from 'react';
import './App.css';
import Posts from './Posts';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="app-title">JSONPlaceholder Blog Explorer</h1>
        <div className="container">
          <Posts />
        </div>
      </header>
    </div>
  );
}

export default App;
