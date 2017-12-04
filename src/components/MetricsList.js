import React, { Component } from 'react';

import Metric from './Metric';

const metrics = [
  {
    title: 'Building Permits',
    key: 'permits',
    label: 'Number of permits issued: ',
    dateCol: 'permit_issued',
    source: 'https://data.detroitmi.gov/resource/but4-ky7y'
  },
  {
    title: 'Improve Detroit',
    key: 'scf',
    label: 'Number of issues submitted: ',
    dateCol: 'ticket_created_date_time',
    source: 'https://data.detroitmi.gov/resource/j7tb-epek'
  },
  {
    title: '911 Calls for Service',
    key: 'cad',
    label: 'Number of calls: ',
    dateCol: 'call_timestamp',
    source: 'https://data.detroitmi.gov/resource/dvu3-6qvr'
  },
  {
    title: 'Demolitions',
    key: 'demo',
    label: 'Number of residential knock-downs: ',
    dateCol: 'demolition_date',
    source: 'https://data.detroitmi.gov/resource/uzpg-2pfj'
  },
  {
    title: 'Blight Violations',
    key: 'bvn',
    label: 'Number of tickets issued: ',
    dateCol: 'violation_date',
    source: 'https://data.detroitmi.gov/resource/s7hj-n86v'
  }
];

class MetricsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      permits: [],
      scf: [],
      cad: [],
      demo: [],
      bvn: [],
      isLoading: true
    };
  }

  // loads data for default time span
  componentDidMount() {
    return this.getDataInRange();
  }

  // // checks if date range has changed
  // shouldComponentUpdate(nextProps) {
  //   const diffStart = this.props.start !== nextProps.start;
  //   const diffEnd = this.props.end !== nextProps.end;
  //   return diffStart || diffEnd;
  // }

  // // invoked when shouldComponentUpdate returns true
  // componentDidUpdate() {
  //   return this.getDataInRange();
  // }

  getDataInRange() {
    for (let i = 0; i < metrics.length; i++) {
      fetch(`${metrics[i].source}.json?$limit=50000&$where=${metrics[i].dateCol} between '${this.props.start}' and '${this.props.end}'`)
        .then(response => response.json())
        .then(d => {
          if ( i !== metrics.length - 1) {
            this.setState({ [`${metrics[i].key}`]: d });
          } else {
            // set isLoading to false on last iteration
            this.setState({ [`${metrics[i].key}`]: d, isLoading: false });
          }
        })
        .catch(error => {
          console.log("Error: " + error);
        });
    }
  }

  render() {
    console.log('render triggered');
    return (
      <div>
        { this.state.isLoading ? 
          <p>Loading...</p> : <Metric meta={metrics} permits={this.state.permits} scf={this.state.scf} cad={this.state.cad} demo={this.state.demo} bvn={this.state.bvn} /> }
      </div>
    )
  }
}

export default MetricsList;
