import React from 'react';
import './App.css';
import CohortDetails from './CohortDetails';

function App() {
  // Sample cohort list data containing ongoing and completed cohorts
  const cohorts = [
    {
      id: 1,
      name: 'Cohort 1',
      course: 'Java Full Stack Developer',
      startDate: '01-Jun-2026',
      endDate: '30-Aug-2026',
      status: 'ongoing'
    },
    {
      id: 2,
      name: 'Cohort 2',
      course: 'React Developer',
      startDate: '15-May-2026',
      endDate: '15-Jul-2026',
      status: 'completed'
    },
    {
      id: 3,
      name: 'Cohort 3',
      course: 'Angular Developer',
      startDate: '01-Jul-2026',
      endDate: '01-Sep-2026',
      status: 'ongoing'
    }
  ];

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="dashboard-title">Cognizant Academy Cohorts</h1>
        <div className="cohorts-container">
          {cohorts.map(cohort => (
            <CohortDetails key={cohort.id} cohort={cohort} />
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
