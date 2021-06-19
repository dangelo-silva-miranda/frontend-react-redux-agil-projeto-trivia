import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      randomAnswers: [],
    };
    this.randomAnswers = this.randomAnswers.bind(this);
    this.answersButtons = this.answersButtons.bind(this);
  }

  componentDidMount() {
    this.randomAnswers();
  }

  randomAnswers() {
    const { questions, indexQuestion } = this.props;
    const questionSelected = questions[indexQuestion];
    const { correct_answer: correctAnswer,
      incorrect_answers: incorrectAswers } = questionSelected;

    const answers = [correctAnswer, ...incorrectAswers];
    const FACTOR_POSITION = 0.5;
    const randomAnswers = [...answers].sort(() => FACTOR_POSITION - Math.random());
    this.setState({
      randomAnswers,
    });
  }

  answersButtons(answer, correctAnswer, index) {
    const { disabledButton, handleClick } = this.props;

    const classButtons = (ans, correct) => {
      const { chosenAnswer } = this.props;
      if ((chosenAnswer && (ans === correct))) {
        return 'correctAnswer';
      }
      if ((chosenAnswer && (ans !== correct))) {
        return 'incorrectAnswer';
      }
      return '';
    };

    return (
      <button
        type="button"
        disabled={ disabledButton }
        onClick={ handleClick } //
        className={ classButtons(answer, correctAnswer) }
        data-testid={ (answer === correctAnswer) ? (
          'correct-answer') : (`wrong-answer-${index}`) }
      >
        { answer }
      </button>
    );
  }

  render() {
    const { state: { randomAnswers }, props: { questions, indexQuestion } } = this;
    const questionSelected = questions[indexQuestion];
    const { question, category, correct_answer: correctAnswer } = questionSelected;

    return (
      <div>
        <h5 data-testid="question-category">{category}</h5>
        <h5 data-testid="question-text">{question}</h5>
        <div className="answersButtons">
          {randomAnswers.map((answer, index) => (
            <div key={ index }>
              {this.answersButtons(answer, correctAnswer, index)}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  indexQuestion: PropTypes.number.isRequired,
  disabledButton: PropTypes.bool.isRequired,
  chosenAnswer: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  // time: PropTypes.number.isRequired,
};

const mapStateToProps = ({ game: { questions } }) => ({
  questions,
});

// const mapDispatchToProps = (dispatch) => ({
// });

export default connect(mapStateToProps /* mapDispatchToProps */)(Questions);
