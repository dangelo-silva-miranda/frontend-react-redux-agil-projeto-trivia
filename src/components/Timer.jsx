import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateTime } from '../redux/actions/game';

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 30,
    };
    this.timerCounter = this.timerCounter.bind(this);
  }

  componentDidMount() {
    this.timerCounter();
  }

  componentDidUpdate() {
    const { count } = this.state;
    const { stopTime } = this.props;
    if (count === 0 || stopTime === true) clearInterval(this.time);
  }

  timerCounter() {
    const ONE_SEC = 1000;
    this.time = setInterval(() => {
      this.setState((prevState) => ({
        count: prevState.count - 1,
      }));
    }, ONE_SEC);
  }

  render() {
    const { count } = this.state;
    const { updateTime: getTime } = this.props;
    getTime(count);
    return (
      <p>{ count }</p>
    );
  }
}

Timer.propTypes = {
  updateTime: PropTypes.func.isRequired,
  stopTime: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ game: { stopTime } }) => ({
  stopTime,
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({ updateTime }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
