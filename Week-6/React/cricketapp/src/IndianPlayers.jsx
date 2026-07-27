import React from 'react';

const IndianPlayers = () => {
  // Array of Indian players for destructuring
  const players = [
    "Virat Kohli",
    "Rohit Sharma",
    "Jasprit Bumrah",
    "Rishabh Pant",
    "Hardik Pandya",
    "Ravindra Jadeja"
  ];

  // Destructuring features of ES6
  const [p1, p2, p3, p4, p5, p6] = players;

  const oddTeam = [p1, p3, p5];
  const evenTeam = [p2, p4, p6];

  // Two arrays for T20 and Ranji Trophy players
  const T20players = ["Suryakumar Yadav", "Ishan Kishan", "Ruturaj Gaikwad"];
  const RanjiTrophyPlayers = ["Cheteshwar Pujara", "Ajinkya Rahane", "Hanuma Vihari"];

  // Merge the two arrays using the ES6 Spread Operator
  const mergedPlayers = [...T20players, ...RanjiTrophyPlayers];

  return (
    <div className="card-container">
      <div className="section-header">
        <h3>🇮🇳 Indian Players Squads</h3>
        <p>Managed using ES6 Array Destructuring and Array Merging (Spread Operator)</p>
      </div>

      <div className="lists-wrapper">
        {/* Odd Team and Even Team Display via Destructuring */}
        <div className="players-list-box odd-even-box">
          <h4>Odd & Even Team Splits (Destructured)</h4>
          
          <div className="split-squads">
            <div className="team-split">
              <h5>Odd Team Players</h5>
              <ul>
                {oddTeam.map((player, idx) => (
                  <li key={idx} className="player-bullet odd-item">{player}</li>
                ))}
              </ul>
            </div>
            <div className="team-split">
              <h5>Even Team Players</h5>
              <ul>
                {evenTeam.map((player, idx) => (
                  <li key={idx} className="player-bullet even-item">{player}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Merged T20 and Ranji Trophy Players */}
        <div className="players-list-box merge-box">
          <h4>Merged T20 & Ranji Squads</h4>
          <div className="players-table-wrapper">
            <table className="players-table">
              <thead>
                <tr>
                  <th>Player Name</th>
                  <th>Source List</th>
                </tr>
              </thead>
              <tbody>
                {mergedPlayers.map((player, index) => {
                  const isT20 = T20players.includes(player);
                  return (
                    <tr key={index}>
                      <td>{player}</td>
                      <td>
                        <span className={`badge ${isT20 ? 'badge-t20' : 'badge-ranji'}`}>
                          {isT20 ? 'T20 Squad' : 'Ranji Trophy'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndianPlayers;
