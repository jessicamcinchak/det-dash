import React, { Component } from 'react';
import moment from 'moment';
import './App.css';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import { DateRangePicker } from 'react-dates';

class DataPoint extends Component {
  render() {
    return (
      <p># of Residential Structures Demolished from {this.props.start} - {this.props.end}:</p>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      startDate: moment().subtract(1, 'months'),
      endDate: moment(),
      focusedInput: null,
    };
  }

  render() {
    return (
      <div className="App">
        <DateRangePicker
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onDatesChange={({ startDate, endDate }) => { this.setState({ startDate, endDate })}}
          focusedInput={this.state.focusedInput}
          onFocusChange={(focusedInput) => { this.setState({ focusedInput })}}
        />
      </div>
    );
  }
}


export default App;
