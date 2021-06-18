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
      // readyToDesable: false,
    };
    this.timerCounter = this.timerCounter.bind(this);
    // this.stopTimer = this.stopTimer.bind(this);
  }

  componentDidMount() {
    this.timerCounter();
  }

  componentDidUpdate() {
    const { count } = this.state;
    // this.stopTimer(count);
    if (count === 0) clearInterval(this.time);
  }

  // stopTimer(count) {
  //   const { disableBtns } = this.props;
  //   const { readyToDesable } = this.state;
  //   if (count === 0) {
  //     clearInterval(this.time);
  //     this.setState({
  //       readyToDesable: true,
  //     });
  //   }
  //   if (readyToDesable) {
  //     disableBtns();
  //     this.setState({
  //       readyToDesable: false,
  //     });
  //   }
  // }

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
  // disableBtns: PropTypes.func.isRequired,
  updateTime: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({ updateTime }, dispatch)
);

export default connect(null, mapDispatchToProps)(Timer);
