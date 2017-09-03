import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class UserOptions extends Component() {
  render () {
    return (
      <div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserOptions)
