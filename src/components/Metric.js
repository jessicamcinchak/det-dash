import React, { Component } from 'react';
import numeral from 'numeral';

class Metric extends Component {
  render() {
    return (
      <div>
        {this.props.meta.map((metric) => 
          <div key={metric.key} className="metric-container">
            <h2 className="metric-header">{metric.title}</h2>
            <p className="metric">{metric.label} {numeral(this.props[metric.key].length).format('0,0')}</p>
            <p className="metric-source-link"><a href={metric.source} target="_blank">(source)</a></p>
          </div>
        )}
      </div>
    )
  }
}

export default Metric;
