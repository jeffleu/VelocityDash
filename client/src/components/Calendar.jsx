import React from 'react';
import CalendarEntry from './CalendarEntry.jsx';
const moment = require('moment');

class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className='Calendar'>
        Today's Events
        {this.props.events.map((event, i) =>
          <CalendarEntry key={i} event={event} />
        )};
      </div>
    )
  }
}

export default Calendar;