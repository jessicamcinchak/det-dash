import React, { Component } from 'react';
import { DateRangePicker, isInclusivelyAfterDay } from 'react-dates';
import PropTypes from 'prop-types';
import moment from 'moment';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import '../App.css';

class DateInput extends Component {
  render() {
    return (
      <div>
        <DateRangePicker
          startDateId="startDate"
          startDate={this.props.start}
          endDateId="endDate"
          endDate={this.props.end}
          onDatesChange={this.props.onDatesChange}
          focusedInput={this.props.focus}
          onFocusChange={this.props.onFocusChange}
          isOutsideRange={day => isInclusivelyAfterDay(day, moment().add(1, 'day'))}
          minimumNights={0}
          numberOfMonths={2}
          showClearDates={false}
          block={false}
          orientation="vertical"
        />
      </div>
    )
  }
}

DateInput.propTypes = {
  start: PropTypes.object.isRequired,
  end: PropTypes.object.isRequired,
  focus: PropTypes.string,
  onDatesChange: PropTypes.func.isRequired,
  onFocusChange: PropTypes.func,
};

export default DateInput;
