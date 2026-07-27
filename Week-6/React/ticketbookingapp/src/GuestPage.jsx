import React from 'react';

const GuestPage = ({ onLoginPrompt }) => {
  const flights = [
    { id: "FL-101", from: "Mumbai (BOM)", to: "New Delhi (DEL)", departure: "08:30 AM", duration: "2h 10m", price: 5400 },
    { id: "FL-204", from: "Bengaluru (BLR)", to: "Singapore (SIN)", departure: "11:15 AM", duration: "4h 30m", price: 18500 },
    { id: "FL-509", from: "Chennai (MAA)", to: "London (LHR)", departure: "04:45 PM", duration: "10h 15m", price: 42000 },
    { id: "FL-712", from: "Kolkata (CCU)", to: "Dubai (DXB)", departure: "09:00 PM", duration: "5h 20m", price: 21000 }
  ];

  return (
    <div className="portal-card">
      <div className="section-title">
        <h3>✈️ Flight Schedule Directory (Guest Mode)</h3>
        <p>Browse available flights. Log in to book tickets.</p>
      </div>

      <div className="flight-grid">
        {flights.map((flight) => (
          <div key={flight.id} className="flight-card">
            <div className="flight-route">
              <span className="route-city">{flight.from}</span>
              <span className="route-arrow">➔</span>
              <span className="route-city">{flight.to}</span>
            </div>
            <div className="flight-meta">
              <span className="meta-item">🕒 {flight.departure}</span>
              <span className="meta-item">⏱️ {flight.duration}</span>
              <span className="meta-item code-badge">{flight.id}</span>
            </div>
            <div className="flight-action-box">
              <span className="price-tag">₹{flight.price.toLocaleString('en-IN')}</span>
              <button onClick={onLoginPrompt} className="btn-book-locked">
                Login to Book
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuestPage;
