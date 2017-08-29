import React, { Component } from 'react'

export default class Register extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedRole: '',
      email: '',
      password: '',
      passwordConf: '',
      redirect: false
    }

    this.handleRoleChange = this.handleRoleChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handlePasswordConfChange = this.handlePasswordConfChange.bind(this)
    this.handleRegistration = this.handleRegistration.bind(this)
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

  handleRegistration (event) {
    event.preventDefault()

    fetch('http://0.0.0.0:5000/register', {
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
    })
  }

  render () {
    return (
      <main id='register-page' >
        <div>
          <h1>Sign up to use Novilance as a Freelancer or an employer:</h1>
        </div>

        <div className='register-form-box'>
          <form onSubmit={this.handleRegistration}>
            <div>
              <select value={this.state.selectedRole} default='Select your role' onChange={this.handleRoleChange}>
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

            <div>
              <input type='password' onChange={this.handlePasswordConfChange} placeholder='Confirm your password' value={this.state.passwordConf} />
            </div>

            <div>
              <p>Password confirmation errors here</p>
            </div>

            <button type='submit'>Register</button>
          </form>
        </div>

      </main>
    )
  }
}
