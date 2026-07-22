import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { trainersMock } from './TrainersMock';

const TrainerDetail = () => {
  const { id } = useParams();
  const trainer = trainersMock.find(t => t.TrainerId.toString() === id);

  if (!trainer) {
    return (
      <div className="trainer-detail-card error-card">
        <h2>Trainer Not Found</h2>
        <p>No trainer exists with ID: {id}</p>
        <Link to="/trainers" className="back-link">Back to Trainers List</Link>
      </div>
    );
  }

  return (
    <div className="trainer-detail-card">
      <h2>Trainer Profile Details</h2>
      <div className="detail-table-container">
        <table className="detail-table">
          <tbody>
            <tr>
              <th>Trainer ID</th>
              <td>{trainer.TrainerId}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{trainer.Name}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{trainer.Email}</td>
            </tr>
            <tr>
              <th>Phone</th>
              <td>{trainer.Phone}</td>
            </tr>
            <tr>
              <th>Technology Stream</th>
              <td>{trainer.Technology}</td>
            </tr>
            <tr>
              <th>Skills</th>
              <td>{trainer.Skills}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="detail-actions">
        <Link to="/trainers" className="back-link">← Back to Trainers List</Link>
      </div>
    </div>
  );
};

export default TrainerDetail;
