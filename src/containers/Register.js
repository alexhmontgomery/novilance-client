import React, { Component } from 'react'

export default class Register extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedRole: 'freelancer', // default is freelancer
      email: '',
      password: '',
      passwordConf: '',
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

    // TODO: handle conflicting passwords!!!!!!!

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

            <div>
              <input type='password' name='passwordConf' onChange={this.handleInputChange} placeholder='Confirm your password' value={this.state.passwordConf} />
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
