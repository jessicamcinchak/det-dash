import React, { Component } from 'react';
import moment from 'moment';

import DateInput from './DateInput';
import DataPoints from './DataPoints';

import metrics from '../config';

class Wrapper extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      startDate: moment().subtract(1, 'months'),
      endDate: moment(),
      focusedInput: null,
      permits: [],
      scf: [],
      cad: [],
      demo: [],
      bvn: [],
    };

    this.handleDatesChange = this.handleDatesChange.bind(this);
    this.handleFocusChange = this.handleFocusChange.bind(this);
  }

  handleDatesChange({ startDate, endDate }) {
    if (startDate && endDate) {
      this.getDataInRange(startDate, endDate);
      this.setState({ startDate, endDate });
    }
  }

  handleFocusChange(focusedInput) {
    this.setState({ focusedInput });
  }

  componentDidMount() {
    this.getDataInRange(this.state.startDate, this.state.endDate);
  }

  getDataInRange(start, end) {
    for (let i = 0; i < metrics.length; i++) {
      fetch(`${metrics[i].source}.json?$limit=60000&$where=${metrics[i].dateCol} between '${start.format('YYYY-MM-DD')}' and '${end.format('YYYY-MM-DD')}'&${metrics[i].params}`)
        .then(response => response.json())
        .then(d => {
          this.setState({ [`${metrics[i].key}`]: d });
        })
        .catch(error => {
          console.log("Error: " + error);
        });
    }
  }

  render() {
    return (
      <div>
        <DateInput start={this.state.startDate} end={this.state.endDate} focus={this.state.focusedInput} onDatesChange={this.handleDatesChange} onFocusChange={this.handleFocusChange} />
        { !this.state.startDate && !this.state.endDate ? 
        <p>Loading...</p> : <DataPoints meta={metrics} permits={this.state.permits} scf={this.state.scf} cad={this.state.cad} demo={this.state.demo} bvn={this.state.bvn} /> }
      </div>
    );
  }
}

export default Wrapper;
