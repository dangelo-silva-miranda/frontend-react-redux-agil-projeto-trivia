import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import './css/Game.css';
import Header from '../components/Header';
import Questions from '../components/Questions';
import { saveLocalStorage } from '../functions';
import { addScore, addAssertion } from '../redux/actions/player';
import { newAnswers } from '../redux/actions/game';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: 30,
      stopTime: false,
      indexQuestion: 0,
      chosenAnswer: false,
      disabledButton: false,
    };
    this.timer = this.timer.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.calcPointsScore = this.calcPointsScore.bind(this);
    this.buttonNext = this.buttonNext.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    this.timer();
  }

  componentDidUpdate() {
    this.stopTimer();
  }

  stopTimer() {
    const { time, stopTime, disabledButton, chosenAnswer } = this.state;
    if ((time === 0 || stopTime === true)) {
      clearInterval(this.time);
    }
    if ((time === 0 || chosenAnswer) && !disabledButton) {
      this.setState({ disabledButton: true });
    }
  }

  timer() {
    const ONE_SEC = 1000;
    this.time = setInterval(() => {
      this.setState((prevState) => ({ time: prevState.time - 1 }));
    }, ONE_SEC);
  }

  nextQuestion() {
    const { state: { indexQuestion }, props: { newAnswers: uptAnswers, history } } = this;

    this.setState({
      indexQuestion: indexQuestion + 1,
      chosenAnswer: false,
      disabledButton: false,
      stopTime: false,
      time: 30,
    });
    const NUM_OF_QUEST = 4;
    if (indexQuestion === NUM_OF_QUEST) {
      history.push('/feedback');
    } else {
      uptAnswers(true);
      this.timer();
    }
  }

  buttonNext() {
    const {
      state: { chosenAnswer, time, indexQuestion },
      props: { questionsNumber } } = this;
    console.log(questionsNumber);
    if (chosenAnswer || time === 0) {
      return (
        <button
          type="button"
          data-testid="btn-next"
          onClick={ this.nextQuestion }
        >
          {(indexQuestion === (questionsNumber - 1)) ? 'Feedback' : 'Próxima Pergunta'}
        </button>
      );
    }
  }

  calcPointsScore({ target: { innerText } }) {
    const {
      state: { time, indexQuestion },
      props: { questions, assertions, addAssertion: addToAssertion } } = this;
    const questionSelected = questions[indexQuestion];
    const { correct_answer: correctAnswer, difficulty } = questionSelected;
    const answer = innerText;
    const level = { easy: 1, medium: 2, hard: 3 };
    const INITIAL_VALUE = 10;

    if (answer === correctAnswer) {
      const updateAssertions = assertions + 1;
      addToAssertion(updateAssertions);
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
  }

  handleClick(event) {
    const {
      props: { addScore: addToScore, score, name, gravatarEmail,
      } } = this;

    this.setState({
      stopTime: true,
      chosenAnswer: true,
    });
    const scorePage = this.calcPointsScore(event);
    if (scorePage) {
      const currScore = score + scorePage;
      const newScore = {
        player: {
          name,
          gravatarEmail,
          score: currScore,
        },
      };
      const key = 'state';
      saveLocalStorage(key, newScore);
      addToScore(currScore);
    }
  }

  render() {
    const {
      time, indexQuestion, chosenAnswer, disabledButton,
    } = this.state;

    return (
      <div>
        <Header />
        <Questions
          handleClick={ this.handleClick }
          indexQuestion={ indexQuestion }
          chosenAnswer={ chosenAnswer }
          disabledButton={ disabledButton }
        />
        <h5>{`Tempo: ${time}`}</h5>
        { this.buttonNext() }
      </div>
    );
  }
}

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  questionsNumber: PropTypes.number.isRequired,
  addAssertion: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  addScore: PropTypes.func.isRequired,
  newAnswers: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  game: { questions, questionsNumber },
  player: { name, gravatarEmail, assertions, score },
}) => ({

  questions,
  name,
  gravatarEmail,
  assertions,
  score,
  questionsNumber,
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({ addScore, newAnswers, addAssertion }, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(Game);
