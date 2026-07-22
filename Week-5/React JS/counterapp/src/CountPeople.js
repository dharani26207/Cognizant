import React, { Component } from 'react';

class CountPeople extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entrycount: 0,
      exitcount: 0
    };
  }

  UpdateEntry = () => {
    this.setState(prevState => ({
      entrycount: prevState.entrycount + 1
    }));
  };

  UpdateExit = () => {
    this.setState(prevState => ({
      exitcount: prevState.exitcount + 1
    }));
  };

  render() {
    return (
      <div className="counter-card">
        <h2>People Counter Dashboard</h2>
        <div className="counter-panels">
          <div className="panel entry-panel">
            <span className="panel-label">Entered Mall</span>
            <span className="panel-number">{this.state.entrycount}</span>
            <button className="btn btn-entry" onClick={this.UpdateEntry}>Login</button>
          </div>
          <div className="panel exit-panel">
            <span className="panel-label">Exited Mall</span>
            <span className="panel-number">{this.state.exitcount}</span>
            <button className="btn btn-exit" onClick={this.UpdateExit}>Exit</button>
          </div>
        </div>
      </div>
    );
  }
}

export default CountPeople;
