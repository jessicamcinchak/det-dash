import React, { Component } from 'react';
import './App.css';

// import Picker from './components/Picker';
import Wrapper from './components/Wrapper';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>DETROIT DASHBOARD</h1>
        <Wrapper />
      </div>
    );
  }
}

export default App;
