import React from 'react';
import { Link } from 'react-router-dom';

const TrainersList = ({ trainers }) => {
  return (
    <div className="trainers-list-card">
      <h2>List of Registered Academy Trainers</h2>
      <ul className="trainers-ul">
        {trainers.map(trainer => (
          <li key={trainer.TrainerId} className="trainer-li">
            <Link to={`/trainers/${trainer.TrainerId}`} className="trainer-link">
              {trainer.Name} (ID: {trainer.TrainerId})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrainersList;
