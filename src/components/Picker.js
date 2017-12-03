import React, { Component } from 'react';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import MetricsList from './MetricsList';

class Picker extends Component {
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
      <div>
        <DateRangePicker
          startDateId={'start'}
          startDate={this.state.startDate}
          endDateId={'end'}
          endDate={this.state.endDate}
          onDatesChange={({ startDate, endDate }) => { this.setState({ startDate, endDate })}}
          focusedInput={this.state.focusedInput}
          onFocusChange={(focusedInput) => { this.setState({ focusedInput })}}
          isOutsideRange={() => false}
          minimumNights={0}
          numberOfMonths={2}
          showClearDates={true}
          block={false}
        />
        { this.state.startDate && this.state.endDate ? 
          <MetricsList start={this.state.startDate.format('YYYY-MM-DD')} end={this.state.endDate.format('YYYY-MM-DD')} /> : <p>Please select a date range.</p> }
      </div>
    );
  }
}

export default Picker;
