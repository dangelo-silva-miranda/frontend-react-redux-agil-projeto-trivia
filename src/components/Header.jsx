import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const { name, score, picture } = this.props;

    return (
      <div>
        <img src={ picture } alt="avatar" data-testid="header-profile-picture" />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </div>
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
  score: PropTypes.number,
  picture: PropTypes.string.isRequired,
};

// Specifies the default values for props:
// https://pt-br.reactjs.org/docs/typechecking-with-proptypes.html#default-prop-values
Header.defaultProps = {
  score: 0,
};

/* const mapDispatchToProps = {

}; */

export default connect(mapStateToProps/* , mapDispatchToProps */)(Header);
