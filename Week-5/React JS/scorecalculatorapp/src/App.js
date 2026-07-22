import React, { useState } from 'react';
import './App.css';
import CalculateScore from './Components/CalculateScore';

function App() {
  const [formData, setFormData] = useState({
    Name: 'Dharani',
    School: 'Cognizant Academy',
    Total: 285,
    goal: 3
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'Total' || name === 'goal' ? (value === '' ? '' : Number(value)) : value
    }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="portal-title">Student Management Portal</h1>
        
        <div className="dashboard-container">
          <div className="form-card">
            <h2 className="form-title">Enter Score Details</h2>
            <div className="input-group">
              <label htmlFor="Name">Student Name</label>
              <input 
                type="text" 
                id="Name" 
                name="Name" 
                value={formData.Name} 
                onChange={handleChange}
                placeholder="Enter student name"
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="School">School Name</label>
              <input 
                type="text" 
                id="School" 
                name="School" 
                value={formData.School} 
                onChange={handleChange}
                placeholder="Enter school name"
              />
            </div>

            <div className="input-group-row">
              <div className="input-group">
                <label htmlFor="Total">Total Score</label>
                <input 
                  type="number" 
                  id="Total" 
                  name="Total" 
                  value={formData.Total} 
                  onChange={handleChange}
                  placeholder="Total marks"
                  min="0"
                />
              </div>

              <div className="input-group">
                <label htmlFor="goal">Goal (Subjects)</label>
                <input 
                  type="number" 
                  id="goal" 
                  name="goal" 
                  value={formData.goal} 
                  onChange={handleChange}
                  placeholder="Total subjects"
                  min="1"
                />
              </div>
            </div>
          </div>

          <div className="preview-container">
            <CalculateScore 
              Name={formData.Name} 
              School={formData.School} 
              Total={formData.Total} 
              goal={formData.goal} 
            />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
