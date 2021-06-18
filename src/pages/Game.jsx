import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
    this.handleClick = this.handleClick.bind(this);
    this.endTime = this.endTime.bind(this);
    this.buttonNext = this.buttonNext.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.buttonToFeedback = this.buttonToFeedback.bind(this);
    // this.handleDisableButtons = this.handleDisableButtons.bind(this);
  }

  componentDidMount() {
    this.endTime();
  }

  // handleDisableButtons() {
  //   this.setState({
  //     disabledButton: true,
  //   });
  // }

  endTime() {
    const finalTime = 30000;
    setTimeout(() => {
      this.setState({
        disabledButton: true,
      });
    }, finalTime);
  }

  handleClick() {
    this.setState({
      chosenAnswer: true,
    });
  }

  nextQuestion() {
    const { indexQuestion } = this.state;
    this.setState({ indexQuestion: indexQuestion + 1 });
    // implementar aqui lógica para resetar o cronometro;
  }

  buttonNext() {
    const { chosenAnswer } = this.state;
    if (chosenAnswer) {
      return (
        <button
          type="button"
          data-testid="btn-next"
          onClick={ this.nextQuestion }
        >
          Next
        </button>
      );
    }
  }

  buttonToFeedback() {
    return (
      <Link to="/feedback">
        <button type="button">Feedback</button>
      </Link>
    );
  }

  renderQuestions() {
    const { questions } = this.props;
    const { indexQuestion, chosenAnswer, disabledButton } = this.state;
    const questionSelected = questions[indexQuestion];
    const {
      category, question,
      correct_answer: correctAnswer,
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
    const FACTOR_POSITION = 0.5;
    const randomAnswers = [...answers].sort(() => FACTOR_POSITION - Math.random());
    return (
      <>
        <Header />
        <h5 data-testid="question-category">{category}</h5>
        <h5 data-testid="question-text">{question}</h5>
        {randomAnswers.map((buttons) => buttons)}
        <Timer disableBtns={ this.handleDisableButtons } />
      </>
    );
  }

  render() {
    const { indexQuestion } = this.state;
    const NUM_OF_QUEST = 4;
    return (
      <div>
        {this.renderQuestions()}
        { indexQuestion === NUM_OF_QUEST ? this.buttonToFeedback() : this.buttonNext() }
      </div>
    );
  }
}

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = ({ game: { questions }, player: { token } }) => ({
  questions,
  token,
});

const mapDispatchToProps = (dispatch) => ({
  getTime: (time) => dispatch(stopTime(time)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
