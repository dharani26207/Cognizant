import React, { useState } from 'react';
import GuestPage from './GuestPage';
import UserPage from './UserPage';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Implement conditional rendering using "Element Variables"
  let pageContent;
  let authButton;

  if (isLoggedIn) {
    pageContent = <UserPage />;
    authButton = (
      <button className="auth-btn logout-btn" onClick={handleLogout}>
        🚪 Logout
      </button>
    );
  } else {
    pageContent = <GuestPage onLoginPrompt={handleLogin} />;
    authButton = (
      <button className="auth-btn login-btn" onClick={handleLogin}>
        🔑 Login to Account
      </button>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="brand">
          <span className="brand-logo">✈️</span>
          <h2>SkyPass Air Bookings</h2>
        </div>
        <div className="auth-control">
          <span className="user-status">
            Status: <strong className={isLoggedIn ? 'status-online' : 'status-guest'}>
              {isLoggedIn ? 'Registered User' : 'Guest'}
            </strong>
          </span>
          {authButton}
        </div>
      </header>

      <main className="main-content">
        {pageContent}
      </main>

      <footer className="app-footer">
        <p>Conditional Rendering & Element Variables Lab &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
