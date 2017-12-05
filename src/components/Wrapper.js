import React, { Component } from 'react';
import moment from 'moment';

import DateInput from './DateInput';
import DataPoints from './DataPoints';

const metrics = [
  {
    title: 'Building Permits',
    key: 'permits',
    label: 'Number of permits issued: ',
    dateCol: 'permit_issued',
    params: '$select=count(permit_no)',
    resKey: 'count_permit_no',
    source: 'https://data.detroitmi.gov/resource/but4-ky7y'
  },
  {
    title: 'Improve Detroit',
    key: 'scf',
    label: 'Number of issues submitted: ',
    dateCol: 'ticket_created_date_time',
    params: '',
    source: 'https://data.detroitmi.gov/resource/j7tb-epek'
  },
  {
    title: '911 Calls for Service',
    key: 'cad',
    label: 'Number of calls: ',
    dateCol: 'call_timestamp',
    params: '$select=avg(totalresponsetime)',
    resKey: 'avg_total_response_time',
    source: 'https://data.detroitmi.gov/resource/dvu3-6qvr'
  },
  {
    title: 'Demolitions',
    key: 'demo',
    label: 'Number of residential knock-downs: ',
    dateCol: 'demolition_date',
    params: '',
    source: 'https://data.detroitmi.gov/resource/uzpg-2pfj'
  },
  {
    title: 'Blight Violations',
    key: 'bvn',
    label: 'Number of tickets issued: ',
    dateCol: 'violation_date',
    params: '',
    source: 'https://data.detroitmi.gov/resource/s7hj-n86v'
  }
];

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
      fetch(`${metrics[i].source}.json?$limit=60000&$where=${metrics[i].dateCol} between '${start.format('YYYY-MM-DD')}' and '${end.format('YYYY-MM-DD')}'`)
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
          <p>Please select a date range.</p> : <DataPoints meta={metrics} permits={this.state.permits} scf={this.state.scf} cad={this.state.cad} demo={this.state.demo} bvn={this.state.bvn} /> }
      </div>
    );
  }
}

export default Wrapper;
