import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

class Trivia extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timer: 30,
      stopTime: false,
    };
    this.timerCounter = this.timerCounter.bind(this);
  }

  componentDidMount() {
    this.timerCounter();
  }

  componentDidUpdate() {
    const { timer, stopTime } = this.state;
    if (timer === 0 || stopTime === true) clearInterval(this.time);
  }

  timerCounter() {
    const ONE_SEC = 1000;
    this.time = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }, ONE_SEC);
  }

  render() {
    const { timer } = this.state;
    return (
      <div>
        <p>Questions</p>
        {timer}
      </div>
    );
  }
}

export default connect()(Trivia);
