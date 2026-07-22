import React from 'react';

const ListofPlayers = () => {
  // Declare an array with 11 players and their details (name, score)
  const players = [
    { name: 'Virat Kohli', score: 110 },
    { name: 'Rohit Sharma', score: 95 },
    { name: 'KL Rahul', score: 45 },
    { name: 'Shikhar Dhawan', score: 55 },
    { name: 'MS Dhoni', score: 105 },
    { name: 'Ravindra Jadeja', score: 75 },
    { name: 'Hardik Pandya', score: 68 },
    { name: 'Jasprit Bumrah', score: 25 },
    { name: 'Rishabh Pant', score: 85 },
    { name: 'Shreyas Iyer', score: 52 },
    { name: 'Suryakumar Yadav', score: 72 }
  ];

  // Filter players with scores below 70 using arrow functions of ES6
  const playersBelow70 = players.filter(p => p.score < 70);

  return (
    <div className="cricket-card">
      <h2>Player Scorecard Directory</h2>
      
      <div className="grid-sections">
        <div className="section-col">
          <h3>All Players (Map List)</h3>
          <table className="cricket-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Player Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{player.name}</td>
                  <td>{player.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="section-col">
          <h3>Filtered Players (Scores &lt; 70)</h3>
          <table className="cricket-table filter-table">
            <thead>
              <tr>
                <th>Player Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {playersBelow70.map((player, idx) => (
                <tr key={idx}>
                  <td>{player.name}</td>
                  <td className="highlight-score">{player.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListofPlayers;
