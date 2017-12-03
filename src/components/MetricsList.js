import React, { Component } from 'react';

const metrics = [
  {
    title: 'Building Permits',
    key: 'bldgPermit',
    label: 'Number of permits issued: ',
    api4x4: 'but4-ky7y',
    dateCol: 'permit_issued'
  },
  {
    title: 'Improve Detroit',
    key: 'improveDet',
    label: 'Number of issues submitted: ',
    api4x4: 'j7tb-epek',
    dateCol: 'ticket_created_date_time'
  },
  {
    title: '911 Calls for Service',
    key: 'nineOneOne',
    label: 'Average response time: ',
    api4x4: 'dvu3-6qvr',
    dateCol: 'call_timestamp'
  }
];

class MetricsList extends Component {
  constructor(props) {
    super(props);
  }

  // loads data for default time span
  componentDidMount() {
    return this._fetchDataInRange();
  }

  // checks if date range has changed
  shouldComponentUpdate(nextProps) {
    const diffStart = this.props.start !== nextProps.start;
    const diffEnd = this.props.end !== nextProps.end;
    return diffStart || diffEnd;
  }

  // invoked when shouldComponentUpdate returns false
  componentDidUpdate() {
    console.log(this.props.start, this.props.end);
    return this._fetchDataInRange();
  }

  _fetchDataInRange() {
    for (let i = 0; i < metrics.length; i++) {
      fetch(`https://data.detroitmi.gov/resource/${metrics[i].api4x4}.json?$limit=50000&$where=${metrics[i].dateCol} between '${this.props.start}' and '${this.props.end}'`)
        .then(response => response.json())
        .then(d => {
          console.log(d);
        })
    }
  }

  render() {
    return (
      <div>
        <p>{this.props.start} through {this.props.end}</p>
      </div>
    )
  }
}

export default MetricsList;
