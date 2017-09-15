import React, { Component } from 'react'
import UserOptions from '../containers/UserOptions'
import { NavLink } from 'react-router-dom'

export default class BaseLayout extends Component {
  render () {
    return (
      <div>
        <nav>
          <NavLink exact to='/' id='home-link'>novilance</NavLink>
          <span id='nav-spacer' />
          <UserOptions />
        </nav>

        { this.props.children }

        <footer>
          {/* Insert footer here. */}
        </footer>
      </div>
    )
  }
}
