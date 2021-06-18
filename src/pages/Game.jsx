import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { stopTime } from '../redux/actions/game';
import Header from '../components/Header';
import Timer from '../components/Timer';
import './css/Game.css';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      indexQuestion: 0,
      chosenAnswer: false,
      disabledButton: false,
    };
    this.renderQuestions = this.renderQuestions.bind(this);
    this.randomQuestions = this.randomQuestions.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.endTime = this.endTime.bind(this);
  }

  componentDidMount() {
    this.endTime();
  }

  endTime() {
    const finalTime = 30000;
    setTimeout(() => {
      this.setState({
        disabledButton: true,
      });
    }, finalTime);
  }

  handleClick() {
    const { stoppedTime } = this.props;
    this.setState({
      chosenAnswer: true,
    });
    stoppedTime();
  }

  randomQuestions(answers) {
    const FACTOR_POSITION = 0.5;
    const randomAnswers = [...answers].sort(() => FACTOR_POSITION - Math.random());
    return randomAnswers;
  }

  renderQuestions() {
    const { questions } = this.props;
    const { indexQuestion, chosenAnswer, disabledButton } = this.state;
    const questionSelected = questions[indexQuestion];
    const { question, category, correct_answer: correctAnswer,
      incorrect_answers: incorrectAswers } = questionSelected;

    const classButtons = (index, chosenAns) => {
      if ((index || index === 0) && chosenAns) {
        return 'incorrectAnswer';
      }
      if ((!index && chosenAnswer)) {
        return 'correctAnswer';
      }
      return '';
    };

    const button = (answer, index) => (
      <button
        type="button"
        disabled={ disabledButton }
        onClick={ this.handleClick }
        className={ classButtons(index, chosenAnswer) }
        data-testid={ (index || index === 0) ? (
          `wrong-answer-${index}`) : ('correct-answer') }
      >
        { answer }
      </button>
    );

    const correct = button(correctAnswer);
    const incorrect = incorrectAswers.map((incorrectAswer, index) => (
      button(incorrectAswer, index)
    ));

    const answers = [correct, ...incorrect];
    const randomAnswers = this.randomQuestions(answers);
    return (
      <>
        <Header />
        <h5 data-testid="question-category">{category}</h5>
        <h5 data-testid="question-text">{question}</h5>
        {randomAnswers.map((buttons) => buttons)}
        <Timer />
      </>
    );
  }

  render() {
    return (
      this.renderQuestions()
    );
  }
}

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  stoppedTime: PropTypes.func.isRequired,
};

const mapStateToProps = ({ game: { questions }, player: { token } }) => ({
  questions,
  token,
});

const mapDispatchToProps = (dispatch) => ({
  stoppedTime: (time) => dispatch(stopTime(time)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
