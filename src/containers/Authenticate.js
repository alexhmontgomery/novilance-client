import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { startLoading, stopLoading, authenticateUser } from '../actions/index'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Authenticate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedRole: 'freelancer', // default is freelancer
      email: '',
      password: '',
      message: '',
      redirect: false
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleInputChange (event) {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value
    })
  }

  handleLogin (event) {
    event.preventDefault()
    this.props.startLoading()
    fetch('http://0.0.0.0:5000/authenticate', {
      method: 'POST',
      body: JSON.stringify({
        role: this.state.selectedRole,
        email: this.state.email,
        password: this.state.password
      }),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(r => r.json())
    .then(json => {
      console.log(json)
      if (json.success === true) {
        const user = json.user
        const token = json.token
        this.props.authenticateUser(user, token)
        this.setState({
          redirect: true
        })
      } else {
        // Display error messages
        this.setState({
          message: json.message
        })
      }
    })
    .then(() => {
      this.props.stopLoading()
    })
  }

  render () {
    if (this.state.redirect === true) {
      return (
        <Redirect to={`/${this.props.user.userInfo.role}/home`} />
      )
    }
    return (
      <main id='authenticate-page' >
        <div className='outer-border-box'>
          <div className='login-container'>
            <div className='login-title-box'>
              <h1>novilance</h1>
            </div>

            {this.state.message &&
              <div>
                <p>Warning: {this.state.message}</p>
              </div>
            }

            <form className='login-form' onSubmit={this.handleLogin}>
              <div>
                <select name='selectedRole' value={this.state.selectedRole} onChange={this.handleInputChange}>
                  <option value='freelancer'>Freelancer</option>
                  <option value='client'>Client</option>
                </select>
              </div>

              <div>
                <input type='email' name='email' onChange={this.handleInputChange} placeholder='Your email' value={this.state.email} />
              </div>

              <div>
                <input type='password' name='password' onChange={this.handleInputChange} placeholder='Your password' value={this.state.password} />
              </div>

              <button type='submit'>Login</button>
            </form>

            <p>Don't have an account? <Link className='login-link' to='/register'>Sign Up</Link></p>
          </div>
        </div>

      </main>
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
    startLoading: startLoading,
    stopLoading: stopLoading,
    authenticateUser: authenticateUser
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Authenticate)
