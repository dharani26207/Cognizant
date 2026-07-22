import React from 'react';

const IndianPlayers = () => {
  // Odd and Even Team players using Destructuring
  const allIndianPlayers = ['Virat Kohli', 'Rohit Sharma', 'MS Dhoni', 'KL Rahul', 'Ravindra Jadeja', 'Jasprit Bumrah'];
  
  // Destructuring elements
  const [first, second, third, fourth, fifth, sixth] = allIndianPlayers;
  
  const oddPlayers = [first, third, fifth];   // odd indices (1st, 3rd, 5th)
  const evenPlayers = [second, fourth, sixth]; // even indices (2nd, 4th, 6th)

  // Merge feature: T20players and RanjiTrophy players merged via spread operator
  const T20players = ['Hardik Pandya', 'Rishabh Pant', 'Suryakumar Yadav'];
  const RanjiTrophyPlayers = ['Sarfaraz Khan', 'Yashasvi Jaiswal', 'Abhimanyu Easwaran'];
  const mergedPlayers = [...T20players, ...RanjiTrophyPlayers];

  return (
    <div className="cricket-card">
      <h2>Indian Team Rosters</h2>
      
      <div className="destructure-section">
        <div className="team-col">
          <h3>Odd Team Players (Destructured)</h3>
          <ul className="players-ul">
            {oddPlayers.map((name, idx) => (
              <li key={idx} className="player-li">{name}</li>
            ))}
          </ul>
        </div>
        <div className="team-col">
          <h3>Even Team Players (Destructured)</h3>
          <ul className="players-ul">
            {evenPlayers.map((name, idx) => (
              <li key={idx} className="player-li">{name}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="merge-section">
        <h3>Merged Squads (T20 &amp; Ranji Trophy)</h3>
        <div className="merged-grid">
          {mergedPlayers.map((name, idx) => (
            <div key={idx} className="merged-player-card">
              {name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndianPlayers;
