import React from 'react';

const ListofPlayers = () => {
  // Declare an array with 11 players storing names and scores
  const players = [
    { name: "Virat Kohli", score: 110 },
    { name: "Rohit Sharma", score: 85 },
    { name: "Sachin Tendulkar", score: 100 },
    { name: "MS Dhoni", score: 75 },
    { name: "Yuvraj Singh", score: 70 },
    { name: "KL Rahul", score: 65 },
    { name: "Hardik Pandya", score: 50 },
    { name: "Rishabh Pant", score: 45 },
    { name: "Ravindra Jadeja", score: 68 },
    { name: "Jasprit Bumrah", score: 20 },
    { name: "Mohammed Shami", score: 15 }
  ];

  // Filter players with scores below 70 using arrow functions
  const lowScorers = players.filter(player => player.score < 70);

  return (
    <div className="card-container">
      <div className="section-header">
        <h3>📋 Cricket Players Directory</h3>
        <p>Managed using ES6 .map() and .filter()</p>
      </div>

      <div className="lists-wrapper">
        {/* All Players List */}
        <div className="players-list-box">
          <h4>All Players ({players.length})</h4>
          <div className="players-table-wrapper">
            <table className="players-table">
              <thead>
                <tr>
                  <th>Player Name</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player, index) => (
                  <tr key={index}>
                    <td>{player.name}</td>
                    <td className="score-value">{player.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Filtered Players List (< 70) */}
        <div className="players-list-box low-scorers-box">
          <h4>Filtered: Scores Below 70 ({lowScorers.length})</h4>
          <div className="players-table-wrapper">
            <table className="players-table">
              <thead>
                <tr>
                  <th>Player Name</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {lowScorers.map((player, index) => (
                  <tr key={index} className="low-score-row">
                    <td>{player.name}</td>
                    <td className="score-value-low">{player.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListofPlayers;
