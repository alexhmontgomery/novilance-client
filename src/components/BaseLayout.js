import React, { Component } from 'react'
import UserOptions from '../containers/UserOptions'
import Aside from '../containers/Aside'
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

        <main>
          {/* <Aside /> */}
          { this.props.children }

        </main>

        <footer>
          {/* Insert footer here. */}
        </footer>
      </div>
    )
  }
}
