import React, { Component } from 'react';
import { DateRangePicker } from 'react-dates';
import PropTypes from 'prop-types';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

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
          isOutsideRange={() => false}
          minimumNights={0}
          numberOfMonths={2}
          showClearDates={true}
          block={false}
        />
      </div>
    )
  }
}

export default DateInput;

DateInput.propTypes = {
  start: PropTypes.object.isRequired,
  end: PropTypes.object.isRequired,
  focus: PropTypes.string,
  onDatesChange: PropTypes.func.isRequired,
  onFocusChange: PropTypes.func,
};
