import React, { Component } from 'react';

export default class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 30,
    };
    this.timerCounter = this.timerCounter.bind(this);
  }

  componentDidMount() {
    this.timerCounter();
  }

  componentDidUpdate() {
    const { count } = this.state;
    if (count === 0) clearInterval(this.time);
  }

  timerCounter() {
    const ONE_SEC = 1000;
    this.time = setInterval(() => {
      this.setState((prevState) => ({
        count: prevState.count - 1,
      }));
    }, ONE_SEC);
  }

  render() {
    const { count } = this.state;

    return (
      <p>{ count }</p>
    );
  }
}
