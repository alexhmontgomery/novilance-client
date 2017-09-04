import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
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
      const user = json.user
      const token = json.token
      this.props.authenticateUser(user, token)
      this.setState({
        redirect: true
      })
    })
    .then(() => {
      this.props.stopLoading()
    })
  }

  render () {
    if (this.state.redirect === true && this.props.user.userInfo.role === 'freelancer') {
      return (
        <Redirect to='/freelancer/home' />
      )
    } else if (this.state.redirect === true && this.props.user.userInfo.role === 'employer') {
      return (
        <Redirect to='/employer/home' />
      )
    }
    return (
      <main id='authenticate-page' >
        <div>
          <h1>Login in to your account as a Freelancer or an employer:</h1>
        </div>

        <div className='login-form-box'>
          <form onSubmit={this.handleLogin}>
            <div>
              <select name='selectedRole' value={this.state.selectedRole} onChange={this.handleInputChange}>
                <option value='freelancer'>Freelancer</option>
                <option value='employer'>Employer</option>
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
