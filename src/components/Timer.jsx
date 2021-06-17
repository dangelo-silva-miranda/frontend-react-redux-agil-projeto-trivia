import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
    if (count === 0) clearInterval(this.time);
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
    const { updateTime: setTime } = this.props;
    setTime(count);
    return (
      <p>{ count }</p>
    );
  }
}

Timer.propTypes = {
  // time: PropTypes.number.isRequired,
  updateTime: PropTypes.func.isRequired,
};

const mapStateToProps = ({ game: { time } }) => ({
  time,
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({ updateTime }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
