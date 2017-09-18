import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { startLoading, stopLoading, authenticateUser } from '../actions/index'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import config from '../config/main'
// import { states } from 'countryjs'

class Register extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedRole: 'freelancer', // default is freelancer
      email: '',
      password: '',
      passwordConf: '',
      message: '',
      redirect: false
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleRegistration = this.handleRegistration.bind(this)
  }

  handleInputChange (event) {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value
    })
  }

  handleRegistration (event) {
    event.preventDefault()
    if (this.state.password !== this.state.passwordConf) {
      return (
        this.setState({
          message: 'Passwords do not match.'
        })
      )
    }
    this.props.startLoading()
    fetch(`${config.server}/register`, {
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
          message: json.message || json.error.errors[0].message
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
        <Redirect to={`/${this.props.user.profile.role}/home`} />
      )
    }
    return (
      <main id='register-page' >
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

            <form className='login-form' onSubmit={this.handleRegistration}>
              <div>
                <label>Select your role:</label><br />
                <select name='selectedRole' value={this.state.selectedRole} onChange={this.handleInputChange}>
                  <option value='freelancer'>Freelancer</option>
                  <option value='client'>Client</option>
                  {/* {states('US').map((eachState) =>
                    <option key={eachState} value={eachState}>{eachState}</option>
                  )} */}
                </select>
              </div>

              <div>
                <label>A valid email address is required</label><br />
                <input type='email' name='email' onChange={this.handleInputChange} placeholder='Your email' value={this.state.email} />
              </div>

              <div>
                <label>Password must be 5-20 characters in length</label><br />
                <input type='password' name='password' onChange={this.handleInputChange} placeholder='Create a password' value={this.state.password} />
              </div>

              <div>
                <input type='password' name='passwordConf' onChange={this.handleInputChange} placeholder='Confirm your password' value={this.state.passwordConf} />
              </div>

              <button type='submit'>Register</button>
            </form>

            <p>Already have an account? <Link className='login-link' to='/authenicate'>Log In</Link></p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Register)
