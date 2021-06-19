import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';
import Questions from '../components/Questions';
import './css/Trivia.css';
// import PropTypes from 'prop-types';

class Trivia extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timer: 30,
      stopTime: false,
      indexQuestion: 0,
      chosenAnswer: false,
      disabledButton: false,
      answerHasCorrect: false,
    };
    this.timerCounter = this.timerCounter.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.timerCounter();
  }

  componentDidUpdate() {
    const { timer, stopTime } = this.state;
    if (timer === 0 || stopTime === true) clearInterval(this.time);
  }

  timerCounter() {
    const { timer } = this.state;
    const ONE_SEC = 1000;
    this.time = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }, ONE_SEC);

    if (timer === 0) {
      this.setState({
        disabledButton: true,
      });
    }
  }

  handleClick() {
    this.setState({
      stopTime: true,
      chosenAnswer: true,
    });
  }

  render() {
    const {
      timer, indexQuestion, chosenAnswer, disabledButton, answerHasCorrect,
    } = this.state;
    return (
      <div>
        <Header />
        <Questions
          handleClick={ this.handleClick }
          indexQuestion={ indexQuestion }
          chosenAnswer={ chosenAnswer }
          disabledButton={ disabledButton }
          answerHasCorrect={ answerHasCorrect }
        />
        {timer}
      </div>
    );
  }
}

export default connect()(Trivia);
