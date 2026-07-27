import React from 'react';
import './App.css';

function App() {
  // Create an object of a single office to display featured details
  const featuredOffice = {
    name: "Apex Executive Suites",
    rent: 85000,
    address: "Level 15, Gateway Towers, Bengaluru, KA",
    image: "/office.jpg" // referencing the public image
  };

  // Create a list of objects representing other office spaces
  const officeList = [
    {
      id: 1,
      name: "Nexus Shared Workspace",
      rent: 42000,
      address: "2nd Floor, MG Road, Pune, MH",
      image: "/office.jpg"
    },
    {
      id: 2,
      name: "Elite Corporate Lounge",
      rent: 110000,
      address: "Bandra Kurla Complex, Mumbai, MH",
      image: "/office.jpg"
    },
    {
      id: 3,
      name: "Co-Innovate Startup Hub",
      rent: 55000,
      address: "Tech Park Phase 2, Hyderabad, TS",
      image: "/office.jpg"
    },
    {
      id: 4,
      name: "Summit Enterprise Office",
      rent: 135000,
      address: "DLF Cyber City, Gurugram, HR",
      image: "/office.jpg"
    },
    {
      id: 5,
      name: "Greenfield Workspace",
      rent: 38000,
      address: "Sector 62, Noida, UP",
      image: "/office.jpg"
    }
  ];

  return (
    <div className="app-container">
      {/* 1. Element to display the heading of the page */}
      <header className="page-header">
        <h1>🏢 WorkSpace Premium Rentals</h1>
        <p>Premium Corporate & Co-working Office Spaces</p>
      </header>

      <main className="main-content">
        {/* Featured Office Space Object Details */}
        <section className="featured-section">
          <h2>⭐ Featured Office Space</h2>
          <div className="featured-card">
            {/* 2. Attribute to display the image of the office space */}
            <div className="featured-image-wrapper">
              <img src={featuredOffice.image} alt={featuredOffice.name} className="featured-image" />
              <div className="featured-badge">Featured</div>
            </div>
            
            {/* 3. Displaying details from the office object */}
            <div className="featured-info">
              <h3>{featuredOffice.name}</h3>
              <p className="featured-address">📍 {featuredOffice.address}</p>
              
              {/* 5. Inline CSS: Red if rent < 60000, Green if rent >= 60000 */}
              <div className="rent-box">
                Monthly Rent:{" "}
                <span 
                  className="rent-price" 
                  style={{ color: featuredOffice.rent < 60000 ? 'red' : 'green' }}
                >
                  ₹{featuredOffice.rent.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. List of Objects & Loop (map) through the office space items */}
        <section className="directory-section">
          <h2>📂 Available Office Spaces Directory</h2>
          <div className="office-grid">
            {officeList.map((office) => (
              <div key={office.id} className="office-card">
                <div className="card-image-wrapper">
                  <img src={office.image} alt={office.name} className="card-image" />
                  <div className="card-badge">ID: #{office.id}</div>
                </div>
                <div className="card-info">
                  <h3>{office.name}</h3>
                  <p className="card-address">📍 {office.address}</p>
                  
                  {/* Inline CSS dynamic pricing check */}
                  <div className="card-rent">
                    Rent:{" "}
                    <span 
                      className="rent-amount" 
                      style={{ color: office.rent < 60000 ? 'red' : 'green' }}
                    >
                      ₹{office.rent.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="page-footer">
        <p>JSX Elements, Attributes, & Styling Lab &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
