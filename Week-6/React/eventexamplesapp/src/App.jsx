import React, { useState } from 'react';
import CurrencyConvertor from './CurrencyConvertor';
import './App.css';

function App() {
  const [counter, setCounter] = useState(0);
  const [helloMessage, setHelloMessage] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [syntheticMessage, setSyntheticMessage] = useState('');

  // 1. Multiple method invocation handlers
  const incrementValue = () => {
    setCounter((prev) => prev + 1);
  };

  const sayHello = () => {
    setHelloMessage(`Hello! This is a static message triggered along with the increment!`);
  };

  const handleIncrement = () => {
    // Invoke multiple methods:
    incrementValue(); // Method A
    sayHello();       // Method B
  };

  const handleDecrement = () => {
    setCounter((prev) => prev - 1);
  };

  // 2. Welcome argument handler
  const handleSayWelcome = (arg) => {
    setWelcomeMessage(`Argument received: "${arg}". Output: Say Welcome triggered successfully!`);
  };

  // 3. Synthetic event handler
  const handleSyntheticEvent = (e) => {
    // e is the React SyntheticEvent
    setSyntheticMessage(`I was clicked! (Event Type: ${e.type}, Target: ${e.target.tagName})`);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h2>⚡ React Events Playground</h2>
        <p>Lab Demonstrating Counters, Arguments, Synthetic Events & Form Handlers</p>
      </header>

      <main className="main-content">
        {/* Left Side: Counter, Welcome, and Synthetic Event Controls */}
        <div className="controls-grid">
          {/* Counter Card */}
          <div className="control-card">
            <h4>1. Counter Events</h4>
            <p className="description">Increment invokes multiple methods (A: Adds value, B: Says Hello)</p>
            
            <div className="counter-display">
              Counter: <span className="counter-val">{counter}</span>
            </div>

            <div className="button-row">
              <button onClick={handleIncrement} className="btn btn-primary">
                Increment
              </button>
              <button onClick={handleDecrement} className="btn btn-secondary">
                Decrement
              </button>
            </div>

            {helloMessage && (
              <div className="message-box hello-box">
                {helloMessage}
              </div>
            )}
          </div>

          {/* Welcome Card */}
          <div className="control-card">
            <h4>2. Argument Events</h4>
            <p className="description">Invokes a function passing "welcome" as a string parameter</p>

            <button 
              onClick={() => handleSayWelcome('welcome')} 
              className="btn btn-accent"
            >
              Say Welcome
            </button>

            {welcomeMessage && (
              <div className="message-box welcome-box">
                {welcomeMessage}
              </div>
            )}
          </div>

          {/* Synthetic Event Card */}
          <div className="control-card">
            <h4>3. Synthetic Event</h4>
            <p className="description">Extracts details directly from the React Synthetic Event object</p>

            <button 
              onClick={handleSyntheticEvent} 
              className="btn btn-warning"
            >
              Trigger OnPress
            </button>

            {syntheticMessage && (
              <div className="message-box synthetic-box">
                {syntheticMessage}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Currency Convertor Component */}
        <div className="converter-section">
          <CurrencyConvertor />
        </div>
      </main>

      <footer className="app-footer">
        <p>React Event Handlers & Synthetic Events Lab &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
