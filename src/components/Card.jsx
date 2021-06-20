import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Card extends Component {
  render() {
    const { index, player: { name, score, picture } } = this.props;
    return (
      <article>
        <h3 data-testid={ `player-name-${index}` }>{name}</h3>
        <img src={ picture } alt={ `Avatar de ${name}` } />
        <p>
          Score:
          {' '}
          <span data-testid={ `player-score-${index}` }>{score}</span>
        </p>
      </article>
    );
  }
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    picture: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;
