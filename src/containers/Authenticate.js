import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { startLoading, stopLoading, authenticateUser } from '../actions/index'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'

class Authenticate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedRole: '', // default is freelancer
      email: '',
      password: '',
      message: '',
      redirect: false
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleRoleChange = this.handleRoleChange.bind(this)
  }

  handleRoleChange (event, index, value) {
    this.setState({selectedRole: value})
  }

  handleInputChange (event, index) {
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
        <Redirect to={`/${this.props.user.profile.role}/home`} />
      )
    }
    console.log(this.state)
    return (
      <main id='authenticate-page' >
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

            <form className='login-form' onSubmit={this.handleLogin}>
              <div>
                <SelectField className='login-select-field login-form-fields' floatingLabelText='Select Role' name='selectedRole' value={this.state.selectedRole} onChange={this.handleRoleChange}>
                  <MenuItem value={'freelancer'} primaryText='Freelancer' />
                  <MenuItem value={'client'} primaryText='Client' />
                </SelectField>
                {/* <select name='selectedRole' value={this.state.selectedRole} onChange={this.handleInputChange}>
                  <option value='freelancer'>Freelancer</option>
                  <option value='client'>Client</option>
                </select> */}
              </div>

              <div>
                <TextField className='login-form-fields' type='email' name='email' onChange={this.handleInputChange} floatingLabelText='Your email' value={this.state.email} />
              </div>

              <div>
                <TextField className='login-form-fields' type='password' name='password' onChange={this.handleInputChange} floatingLabelText='Your password' value={this.state.password} />
              </div>

              <RaisedButton className='login-form-button' type='submit' label='Login' primary fullWidth />
            </form>

            <p>Don't have an account? <Link className='login-link' to='/register'>Sign Up</Link></p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Authenticate)
