import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Game extends Component {
  render() {
    const { questions } = this.props;
    console.log(questions);
    return (
      <div>
        <Header />
        {/* {questions.map((question, index) => (
          <h5 data-testid="question-category" key={index}>{question}</h5> */}
        ))}
        <h5 data-testid="question-text">{questions[0].category}</h5>
      </div>
    );
  }
}

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = ({ game: { questions } }) => ({
  questions,
});

export default connect(mapStateToProps)(Game);