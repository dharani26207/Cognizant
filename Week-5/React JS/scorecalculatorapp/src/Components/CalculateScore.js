import React from 'react';
import '../Stylesheets/mystyle.css';

const CalculateScore = ({ Name, School, Total, goal }) => {
  const studentName = Name || "Unknown";
  const studentSchool = School || "Unknown";
  const totalScore = Number(Total) || 0;
  const assessmentGoal = Number(goal) || 1; // avoid division by zero
  const average = (totalScore / assessmentGoal).toFixed(2);

  return (
    <div className="score-card">
      <h2 className="card-title">Student Score Report</h2>
      <div className="card-content">
        <div className="info-row">
          <span className="info-label">Student Name:</span>
          <span className="info-value">{studentName}</span>
        </div>
        <div className="info-row">
          <span className="info-label">School:</span>
          <span className="info-value">{studentSchool}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Total Score:</span>
          <span className="info-value">{totalScore}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Number of Goals/Subjects:</span>
          <span className="info-value">{assessmentGoal}</span>
        </div>
        <div className="divider"></div>
        <div className="average-box">
          <span className="average-label">Average Score</span>
          <span className="average-value">{average}</span>
        </div>
      </div>
    </div>
  );
};

export default CalculateScore;
