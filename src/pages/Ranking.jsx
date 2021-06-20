import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import CardList from '../components/CardList';
import { restoreFromLocalStorage } from '../functions';
import { clearHistoryGame } from '../redux/actions/player';
import { newAnswers } from '../redux/actions/game';

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.clearHistoryGame = this.clearHistoryGame.bind(this);
  }

  clearHistoryGame() {
    const { clearHistoryGame: clearHistory, newAnswers: uptAnswers } = this.props;
    clearHistory();
    uptAnswers(true);
  }

  render() {
    const ranking = restoreFromLocalStorage('ranking');
    // ordena decrescentemente o ranking
    ranking.sort((player1, player2) => {
      if (player2.score !== player1.score) {
        return player2.score - player1.score;
      }
      return player1.name - player2.name;
    });
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ this.clearHistoryGame }
          >
            Voltar ao início
          </button>
        </Link>
        <CardList ranking={ ranking } />
      </div>
    );
  }
}

Ranking.propTypes = {
  newAnswers: PropTypes.func.isRequired,
  clearHistoryGame: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({ newAnswers, clearHistoryGame }, dispatch)
);

export default connect(null, mapDispatchToProps)(Ranking);
