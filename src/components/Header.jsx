import React, { Component } from 'react'

//redux
// imgGravatar = www.gravatar.com/avatar/okasokokasosoak
// name
export default class Header extends Component {
  render() {
    return (
      <div>
        <img src={imgGravatar} alt="avatar" data-testid="header-profile-picture" />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">0</p>
      </div>
    )
  }
}
