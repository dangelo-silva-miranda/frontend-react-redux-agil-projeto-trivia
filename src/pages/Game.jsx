import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

// import { fetchQuestions } from '../redux/actions/game';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      indexQuestion: 0,
      // chosenAnswer: false,
    };
    this.renderQuestions = this.renderQuestions.bind(this);
  }

  componentDidMount() {
    // const { getQuestions, token } = this.props;
    // const questionsNumber = 5;
    // getQuestions(token, questionsNumber);
  }

  renderQuestions() {
    const { questions } = this.props;
    const { indexQuestion } = this.state;
    const questionSelected = questions[indexQuestion];
    const {
      category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAswers } = questionSelected;

    const button = (answer, index) => (
      <button
        type="button"
        data-testid={ index ? `wrong-answer-${index}` : 'correct-answer' }
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
      </>
    );
  }

  render() {
    // const haveQuestions = questions.length;
    // if (haveQuestions > 0) {
    //   return (
    //     <div>
    //       <Header />
    //       <h5 data-testid="question-category">{questions[0].category}</h5>
    //       <h5 data-testid="question-text">{questions[0].question}</h5>
    //     </div>
    //   );
    // }
    return (
      this.renderQuestions()
    );
  }
}

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  // token: PropTypes.string.isRequired,
  // getQuestions: PropTypes.func.isRequired,
};

const mapStateToProps = ({ game: { questions }, player: { token } }) => ({
  questions,
  token,
});

// const mapDispatchToProps = (dispatch) => ({
//   getQuestions: (token, questionsNumber) => dispatch(
//     fetchQuestions(token, questionsNumber),
//   ),
// });

export default connect(mapStateToProps /* mapDispatchToProps */)(Game);
