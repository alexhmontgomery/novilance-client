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
          <div className='navbar-link-group'>
            <NavLink to='/projects' className='navbar-horizontal-item'>Projects</NavLink>
            <NavLink to='/freelancers' className='navbar-horizontal-item'>Freelancers</NavLink>
            <UserOptions />
          </div>
        </nav>

        { this.props.children }

        <footer>
          {/* Insert footer here. */}
        </footer>
      </div>
    )
  }
}
