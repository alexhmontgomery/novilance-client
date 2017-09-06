import React, { Component } from 'react'
// import UserOptions from '../containers/UserOptions'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class BaseLayout2 extends Component {
  render () {
    return (
      <div>
        <nav>
          <NavLink exact to='/' id='home-link'>novilance</NavLink>
          <span id='nav-spacer' />
          <div className='navbar-link-group'>
            <NavLink to='/projects' className='navbar-horizontal-item'>Projects</NavLink>
            <NavLink to='/freelancers' className='navbar-horizontal-item'>Freelancers</NavLink>
            {!this.props.user.isAuthenticated &&
              <div className='navbar-horizontal-item' id='navbar-vertical-section'>
                <div className='navbar-vertical-item' id='top-vert-navbar-item'>
                  <NavLink to='/authenticate'>Login</NavLink>
                </div>
                <div className='navbar-vertical-item'>
                  <NavLink to='/register'>Sign Up Free</NavLink>
                </div>
              </div>
            }
            {this.props.user.isAuthenticated &&
              <NavLink to='/logout' className='navbar-horizontal-item'>Logout</NavLink>
            }
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

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({

  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseLayout2)
