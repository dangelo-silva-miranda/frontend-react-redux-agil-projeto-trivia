import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { name, score, picture } = this.props;

    return (
      <header>
        <img src={ picture } alt="avatar" data-testid="header-profile-picture" />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </header>
    );
  }
}

const mapStateToProps = ({ player: { name, score, picture } }) => ({
  name,
  score,
  picture,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  picture: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
