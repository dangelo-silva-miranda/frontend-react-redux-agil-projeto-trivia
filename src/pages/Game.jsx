import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      indexQuestion: 0,
      timer: 0,
      // chosenAnswer: false,
    };
    this.renderQuestions = this.renderQuestions.bind(this);
    this.logicaDeRenderizaçãoDoBotão = this.logicaDeRenderizaçãoDoBotão.bind(this);
  }

  // function() {
  //   const { indexQuestion } = this.state;
  //   this.setState({ indexQuestion: indexQuestion + 1});
  //   }
  // }

  // A cada nova pergunta o temporizador deve ser reiniciado para 30 segundos
  // temporizador(() => {
  //   const interval = setInterval(() => {
  //     this.setState({ timer: timer + 1 })
  //   }, 1000);

  // Após a quinta pergunta, o botão "Próxima" deve redirecionar a pessoa para a tela de Feedback

  // Para perguntas com type:"boolean", mostrar somente 2 campos (um para cada resposta possível)
  // Para perguntas com type:"multiple", mostrar a quantidade necessária de campos (um para cada resposta possível)
  // O elemento da mensagem de feedback deve possuir o atributo data-testid com o valor feedback-text

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
      </>
    );
  }

  render() {
    return (
      <div>
        {this.renderQuestions()}

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

export default connect(mapStateToProps)(Game);
