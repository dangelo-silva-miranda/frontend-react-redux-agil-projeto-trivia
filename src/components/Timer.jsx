import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import { updateTime } from '../redux/actions/game';

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = { };
    this.timerCounter = this.timerCounter.bind(this);
  }

  componentDidMount() {
    this.timerCounter();
  }

  componentDidUpdate() {
    const { time } = this.props;
    if (time === 0) clearInterval(this.time);
  }

  timerCounter() {
    const { updateTime: setTime } = this.props;
    const ONE_SEC = 1000;
    this.time = setInterval(() => {
      setTime();
    }, ONE_SEC);
  }

  render() {
    const { time } = this.props;

    return (
      <p>{ time }</p>
    );
  }
}

Timer.propTypes = {
  time: PropTypes.number.isRequired,
  updateTime: PropTypes.func.isRequired,
};

const mapStateToProps = ({ game: { time } }) => ({
  time,
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({ updateTime }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
