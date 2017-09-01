import React, { Component } from 'react'
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

    this.handleRoleChange = this.handleRoleChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleRoleChange (event) {
    this.setState({selectedRole: event.target.value})
  }

  handleEmailChange (event) {
    this.setState({email: event.target.value})
  }

  handlePasswordChange (event) {
    this.setState({password: event.target.value})
  }

  handlePasswordConfChange (event) {
    this.setState({passwordConf: event.target.value})
    // TODO: Handle passwords not matching
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
    })
    .then(() => {
      this.props.stopLoading()
    })
  }

  render () {
    return (
      <main id='authenticate-page' >
        <div>
          <h1>Login in to your account as a Freelancer or an employer:</h1>
        </div>

        <div className='login-form-box'>
          <form onSubmit={this.handleLogin}>
            <div>
              <select value={this.state.selectedRole} onChange={this.handleRoleChange}>
                <option value='freelancer'>Freelancer</option>
                <option value='employer'>Employer</option>
              </select>
            </div>

            <div>
              <input type='email' onChange={this.handleEmailChange} placeholder='Your email' value={this.state.email} />
            </div>

            <div>
              <input type='password' onChange={this.handlePasswordChange} placeholder='Your password' value={this.state.password} />
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
