import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logoutUser } from '../actions/index'

class UserOptions extends Component {
  render () {
    return (
      <div className='navbar-horizontal-item'>
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
          <NavLink onClick={this.props.logoutUser} to='/authenticate'>Logout</NavLink>
        }
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
    logoutUser: logoutUser
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserOptions)
