import React, { Component } from 'react';
import Header from '../components/Header';

//redux
// assertions
export default class Feedback extends Component {
  constructor(props) {
    super(props);
  
    this.state = { }
    this.msgFeedback = this.msgFeedback.bind(this);
  }
  
  msgFeedback() {
    // const { assertions } = this.props;
    if(assertions < 3 ) {
      return (
        <p data-testid="feedback-text">Podia ser melhor...</p>
      )
    }
    return (
      <p data-testid="feedback-text">Mandou bem!</p>
    )
  }
  render() {
    return (
      <div>
        <Header />
        {this.msgFeedback()}
      </div>
    )
  }
}