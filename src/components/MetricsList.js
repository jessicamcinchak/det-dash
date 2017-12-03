import React, { Component } from 'react';

const metrics = [
  {
    title: 'Building Permits',
    key: 'bldgPermit',
    label: 'Number of permits issued: ',
    api4x4: 'but4-ky7y',
    dateCol: 'permit_issued',
    source: 'https://data.detroitmi.gov/resource/xw2a-a7tf'
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
    label: 'Number of calls: ',
    api4x4: 'dvu3-6qvr',
    dateCol: 'call_timestamp'
  }
];

class MetricsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bldgPermit: [],
      improveDet: [],
      nineOneOne: []
    };
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
          this.setState({ [`${metrics[i].key}`]: d.length });
        })
    }
  }

  render() {
    return (
      <div>
        {metrics.map((metric) => 
          <div key={metric.key} className="metric-container">
            <h2 className="metric-header">{metric.title}</h2>
            <p className="metric">{metric.label} {this.state[metric.key]}</p>
            <p className="metric-source-link"><a href={metric.source} target="_blank">(source)</a></p>
          </div>
        )}
      </div>
    )
  }
}

export default MetricsList;
