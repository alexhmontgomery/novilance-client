import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { startLoading, stopLoading, authenticateUser } from '../actions/index'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import config from '../config/main'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'

class Register extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedRole: '', // default is freelancer
      email: '',
      password: '',
      passwordConf: '',
      message: '',
      redirect: false
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleRegistration = this.handleRegistration.bind(this)
    this.handleRoleChange = this.handleRoleChange.bind(this)
  }

  handleRoleChange (event, index, value) {
    this.setState({selectedRole: value})
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
          <Paper className='login-container' zDepth={5}>
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
                <SelectField className='login-select-field login-form-fields' floatingLabelText='Select Role' name='selectedRole' value={this.state.selectedRole} onChange={this.handleRoleChange}>
                  <MenuItem value={'freelancer'} primaryText='Freelancer' />
                  <MenuItem value={'client'} primaryText='Client' />
                </SelectField>
              </div>

              <div>
                <TextField className='login-form-fields' type='email' name='email' onChange={this.handleInputChange} floatingLabelText='Enter a valid email address' value={this.state.email} />
              </div>

              <div>
                <TextField className='login-form-fields' type='password' name='password' onChange={this.handleInputChange} floatingLabelText='Create a password of 5-20 characters' value={this.state.password} errorText={this.state.password.length < 5 || this.state.password.length > 20 && 'Password must be 5-20 characters'} />
              </div>

              <div>
                <TextField className='login-form-fields' type='password' name='passwordConf' onChange={this.handleInputChange} floatingLabelText='Confirm your password' value={this.state.passwordConf} errorText={this.state.passwordConf !== this.state.password && 'Passwords do not match'} />
              </div>

              <RaisedButton className='login-form-button' type='submit' label='Register' primary fullWidth />
            </form>

            <p>Already have an account? <Link className='login-link' to='/authenicate'>Log In</Link></p>
          </Paper>
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
