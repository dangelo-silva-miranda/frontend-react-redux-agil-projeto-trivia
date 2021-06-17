import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Timer from '../components/Timer';
import './css/Game.css';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      indexQuestion: 0,
      chosenAnswer: false,
    };
    this.renderQuestions = this.renderQuestions.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      chosenAnswer: true,
    });
  }

  renderQuestions() {
    const { questions } = this.props;
    const { indexQuestion, chosenAnswer } = this.state;
    const questionSelected = questions[indexQuestion];
    const {
      category,
      question,
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
};

const mapStateToProps = ({ game: { questions }, player: { token } }) => ({
  questions,
  token,
});

export default connect(mapStateToProps)(Game);
