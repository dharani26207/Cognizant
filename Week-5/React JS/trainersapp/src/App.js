import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './Home';
import TrainersList from './Trainerlist';
import TrainerDetail from './TrainerDetails';
import { trainersMock } from './TrainersMock';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-logo">Cognizant Academy</div>
          <ul className="nav-links">
            <li>
              <Link to="/" className="nav-link-item">Home</Link>
            </li>
            <li>
              <Link to="/trainers" className="nav-link-item">Trainers</Link>
            </li>
          </ul>
        </nav>

        <main className="app-main">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/trainers" element={<TrainersList trainers={trainersMock} />} />
              <Route path="/trainers/:id" element={<TrainerDetail />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
