import React from 'react';
import ReactDOM from 'react-dom';
import Time from './Time.jsx';
import Calendar from './Calendar.jsx'
import Form from './Form.jsx';
import Chrono from '../lib/chrono.min.js';
import artyom from '../lib/artyom.min.js';
import $ from '../lib/jquery.js';
const commands = require('../scripts/commands.js');


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    }
  }

  appendEvent(event) {
    this.setState({
      events: this.state.events.concat([event])
    });
  }

  componentDidMount() {
    fetch('http://localhost:9000/api/calendar/getEvent')
      .then((res) => res.json())
      .then((data) => {
        let eventList = data.map((event) => {
          return {
            eventName: event.name,
            location: event.location,
            startTime: event.startdatetime,
            eventUrl: event.eventUrl
          };
        });

        this.setState({
          events: eventList
        });
      })
      .catch((err) => {
        console.log('Error retrieving events', err);
      })
  }

  render() {
    return (
      <div>
        <div>
          <Time />
        </div>
        <div>
          <Form appendEvent={this.appendEvent.bind(this)} commands={commands}/>
        </div>
        <div>
          <Calendar events={this.state.events} />
        </div>
      </div>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('app'));