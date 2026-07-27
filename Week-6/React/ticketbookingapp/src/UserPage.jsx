import React, { useState } from 'react';

const UserPage = () => {
  const flights = [
    { id: "FL-101", from: "Mumbai (BOM)", to: "New Delhi (DEL)", price: 5400 },
    { id: "FL-204", from: "Bengaluru (BLR)", to: "Singapore (SIN)", price: 18500 },
    { id: "FL-509", from: "Chennai (MAA)", to: "London (LHR)", price: 42000 },
    { id: "FL-712", from: "Kolkata (CCU)", to: "Dubai (DXB)", price: 21000 }
  ];

  const [selectedFlightId, setSelectedFlightId] = useState(flights[0].id);
  const [ticketsCount, setTicketsCount] = useState(1);
  const [passengerName, setPassengerName] = useState('');
  const [bookingSummary, setBookingSummary] = useState(null);

  const selectedFlight = flights.find(f => f.id === selectedFlightId);

  const handleBooking = (e) => {
    e.preventDefault();
    if (!passengerName.trim()) {
      alert("Please enter the passenger's name.");
      return;
    }
    const totalPrice = selectedFlight.price * ticketsCount;
    setBookingSummary({
      passenger: passengerName,
      flight: `${selectedFlight.from} ➔ ${selectedFlight.to}`,
      flightId: selectedFlight.id,
      tickets: ticketsCount,
      total: totalPrice,
      refNumber: `TXN-${Math.floor(100000 + Math.random() * 900000)}`
    });
    // Reset fields
    setPassengerName('');
    setTicketsCount(1);
  };

  return (
    <div className="portal-card user-portal">
      <div className="section-title">
        <h3>🎟️ Flight Ticket Booking Center (Logged In)</h3>
        <p>You have booking permissions enabled. Place your order below.</p>
      </div>

      <div className="booking-split">
        {/* Booking Form */}
        <form onSubmit={handleBooking} className="booking-form">
          <div className="input-group">
            <label htmlFor="passenger-name">Passenger Name:</label>
            <input 
              id="passenger-name"
              type="text" 
              placeholder="e.g. Rahul Sharma"
              value={passengerName}
              onChange={(e) => setPassengerName(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="flight-select">Select Flight Route:</label>
            <select 
              id="flight-select"
              value={selectedFlightId}
              onChange={(e) => { setSelectedFlightId(e.target.value); setBookingSummary(null); }}
              className="form-input"
            >
              {flights.map(f => (
                <option key={f.id} value={f.id}>
                  {f.id} ({f.from} ➔ {f.to}) - ₹{f.price.toLocaleString('en-IN')}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="tickets-count">Number of Tickets:</label>
            <input 
              id="tickets-count"
              type="number"
              min="1"
              max="10"
              value={ticketsCount}
              onChange={(e) => setTicketsCount(parseInt(e.target.value) || 1)}
              className="form-input"
              required
            />
          </div>

          <button type="submit" className="btn-submit-booking">
            Confirm & Book Tickets
          </button>
        </form>

        {/* Booking Confirmation / Status display */}
        <div className="booking-status-panel">
          {bookingSummary ? (
            <div className="booking-receipt">
              <h4>✅ Booking Confirmed!</h4>
              <div className="receipt-details">
                <p><strong>Ref Number:</strong> <span className="ref-highlight">{bookingSummary.refNumber}</span></p>
                <p><strong>Passenger:</strong> {bookingSummary.passenger}</p>
                <p><strong>Flight:</strong> {bookingSummary.flight} ({bookingSummary.flightId})</p>
                <p><strong>Tickets:</strong> {bookingSummary.tickets}</p>
                <div className="receipt-total">
                  <span>Total Amount Paid:</span>
                  <span className="total-highlight">₹{bookingSummary.total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="booking-placeholder">
              <p>Ready to book your flight. Fill out the form details and submit.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
