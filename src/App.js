import React, { Component } from 'react';
import './App.css';

import Picker from './components/Picker';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>DETROIT DASHBOARD</h1>
        <Picker />
      </div>
    );
  }
}

export default App;
