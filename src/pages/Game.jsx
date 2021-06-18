import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { stopTime } from '../redux/actions/game';
import { addScore } from '../redux/actions/player';
import Header from '../components/Header';
import Timer from '../components/Timer';
import './css/Game.css';
import { saveLocalStorage } from '../functions';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      indexQuestion: 0,
      chosenAnswer: false,
      disabledButton: false,
      answerHasCorrect: false,
      sendToScore: false,
    };
    this.renderQuestions = this.renderQuestions.bind(this);
    this.randomQuestions = this.randomQuestions.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.endTime = this.endTime.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.addPointsScore = this.addPointsScore.bind(this);
    this.sendScore = this.sendScore.bind(this);
  }

  componentDidMount() {
    this.endTime();
  }

  componentDidUpdate() {
    this.sendScore();
  }

  endTime() {
    const finalTime = 30000;
    setTimeout(() => {
      this.setState({
        disabledButton: true,
      });
    }, finalTime);
  }

  sendScore() {
    const { addToScore, score } = this.props;
    const { sendToScore } = this.state;
    if (sendToScore) {
      const syncTime = 1000;
      setTimeout(() => {
        const sumQuestion = this.addPointsScore();
        const currScore = score + sumQuestion;
        const newScore = {
          player: {
            score: currScore,
          },
        };
        const key = 'state';
        saveLocalStorage(key, newScore);
        addToScore(currScore);
      }, syncTime);
      this.setState({
        sendToScore: false,
      });
    }
  }

  addPointsScore() {
    const { questions, time } = this.props;
    const { indexQuestion, answerHasCorrect } = this.state;
    const questionSelected = questions[indexQuestion];
    const { difficulty } = questionSelected;
    const level = { easy: 1, medium: 2, hard: 3 };
    const INITIAL_VALUE = 10;

    if (answerHasCorrect) {
      const { easy, medium, hard } = level;
      switch (difficulty) {
      case 'easy':
        return (INITIAL_VALUE + (time * easy));
      case 'medium':
        return (INITIAL_VALUE + (time * medium));
      case 'hard':
        return (INITIAL_VALUE + (time * hard));
      default:
        return '';
      }
    }
    return 0;
  }

  checkAnswer({ target: { innerText } }) {
    const { questions } = this.props;
    const { indexQuestion } = this.state;
    const questionSelected = questions[indexQuestion];
    const { correct_answer: correctAnswer } = questionSelected;
    const answer = innerText;
    if (answer === correctAnswer) {
      this.setState({
        answerHasCorrect: true,
        sendToScore: true,
      });
    }
  }

  handleClick(event) {
    const { stoppedTime } = this.props;
    this.setState({
      chosenAnswer: true,
    });
    stoppedTime();
    this.checkAnswer(event);
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
  time: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  stoppedTime: PropTypes.func.isRequired,
  addToScore: PropTypes.func.isRequired,
};

const mapStateToProps = ({ game: { questions, time }, player: { token, score } }) => ({
  questions,
  token,
  time,
  score,
});

const mapDispatchToProps = (dispatch) => ({
  stoppedTime: () => dispatch(stopTime()),
  addToScore: (score) => dispatch(addScore(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
