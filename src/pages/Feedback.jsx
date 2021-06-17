import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    // this.state = { };
    this.msgFeedback = this.msgFeedback.bind(this);
    this.createAvatar = this.createAvatar.bind(this);
  }

  msgFeedback() {
    const { assertions } = this.props;

    const param = 3;
    if (assertions < param) {
      return (
        <p data-testid="feedback-text">Podia ser melhor...</p>
      );
    }
    return (
      <p data-testid="feedback-text">Mandou bem!</p>
    );
  }

  createAvatar() {
    const { picture, name, score } = this.props;
    return (
      <div>
        <img
          src={ picture }
          alt="imagem do jogador"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h1>Feedback</h1>
        {this.msgFeedback()}
        {this.createAvatar()}
      </div>
    );
  }
}

const mapStateToProps = ({ player: { name, score, picture, assertions } }) => ({
  name,
  score,
  picture,
  assertions,
});

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  picture: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
