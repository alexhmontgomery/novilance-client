import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { startLoading, stopLoading, updateUserProfile } from '../actions/index'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import config from '../config/main'

class ProfileFreelancerUpdate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      profile: '',
      givenName: '',
      surname: '',
      description: '',
      city: '',
      state: '',
      school: '',
      message: '',
      redirect: false
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleProfileEdit = this.handleProfileEdit.bind(this)
  }

  handleInputChange (event) {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value
    })
  }

  handleProfileEdit (event) {
    event.preventDefault()

    this.props.startLoading()
    fetch(`${config.server}/profile/freelancer/update`, {
      method: 'PUT',
      body: JSON.stringify({
        givenName: this.state.givenName,
        surname: this.state.surname,
        description: this.state.description,
        city: this.state.city,
        state: this.state.state,
        school: this.state.school
      }),
      headers: {
        'content-type': 'application/json',
        'x-access-token': this.props.user.token
      }
    })
    .then(r => r.json())
    .then(json => {
      console.log(json)
      if (json.success === true) {
        console.log('successfully update user profile')
        this.setState({
          profile: json.freelancer,
          message: json.message
        })
        this.props.updateUserProfile(json.freelancer)
      } else {
        // Display error messages
        this.setState({
          message: json.error.errors[0].message
        })
      }
    })
    .then(() => {
      this.props.stopLoading()
    })
  }

  componentDidMount () {
    this.props.startLoading()

    fetch(`${config.server}/profile/freelancer/${this.props.user.profile.id}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'x-access-token': this.props.user.token
      }
    })
    .then(r => r.json())
    .then(json => {
      console.log(json)
      this.setState({
        givenName: json.freelancer.givenName,
        surname: json.freelancer.surname,
        description: json.freelancer.description,
        city: json.freelancer.city,
        state: json.freelancer.state,
        school: json.freelancer.school
      })
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
      <section id='profile-edit' >

        <div className='profile-update-box'>

          <h1>Freelancer Profile Update</h1>

          {this.state.message &&
          <div>
            <p>{this.state.message}</p>
          </div>
          }

          <form className='profile-edit-form' onSubmit={this.handleProfileEdit}>
            <div>
              <label>First Name *</label><br />
              <input type='text' name='givenName' onChange={this.handleInputChange} value={this.state.givenName} />
            </div>

            <div>
              <label>Last Name *</label><br />
              <input type='text' name='surname' onChange={this.handleInputChange} value={this.state.surname} />
            </div>

            <div>
              <label>Your Job Title (i.e. Web Developer or Graphic Designer)</label><br />
              <input type='text' name='description' onChange={this.handleInputChange} value={this.state.description} />
            </div>

            <div>
              <div>
                <label>City</label>
                <input type='text' name='city' onChange={this.handleInputChange} value={this.state.city} />
              </div>
              <div>
                <label>State</label>
                <select name='state' value={this.state.state} onChange={this.handleInputChange}>
                  <option value='AL'>Alabama (AL)</option>
                  <option value='AK'>Alaska (AK)</option>
                  <option value='AZ'>Arizona (AZ)</option>
                  <option value='AR'>Arkansas (AR)</option>
                  <option value='CA'>California (CA)</option>
                  <option value='CO'>Colorado (CO)</option>
                  <option value='CT'>Connecticut (CT)</option>
                  <option value='DE'>Delaware (DE)</option>
                  <option value='DC'>District Of Columbia (DC)</option>
                  <option value='FL'>Florida (FL)</option>
                  <option value='GA'>Georgia (GA)</option>
                  <option value='HI'>Hawaii (HI)</option>
                  <option value='ID'>Idaho (ID)</option>
                  <option value='IL'>Illinois (IL)</option>
                  <option value='IN'>Indiana (IN)</option>
                  <option value='IA'>Iowa (IA)</option>
                  <option value='KS'>Kansas (KS)</option>
                  <option value='KY'>Kentucky (KY)</option>
                  <option value='LA'>Louisiana (LA)</option>
                  <option value='ME'>Maine (ME)</option>
                  <option value='MD'>Maryland (MD)</option>
                  <option value='MA'>Massachusetts (MA)</option>
                  <option value='MI'>Michigan (MI)</option>
                  <option value='MN'>Minnesota (MN)</option>
                  <option value='MS'>Mississippi (MS)</option>
                  <option value='MO'>Missouri (MO)</option>
                  <option value='MT'>Montana (MT)</option>
                  <option value='NE'>Nebraska (NE)</option>
                  <option value='NV'>Nevada (NV)</option>
                  <option value='NH'>New Hampshire (NH)</option>
                  <option value='NJ'>New Jersey (NJ)</option>
                  <option value='NM'>New Mexico (NM)</option>
                  <option value='NY'>New York (NY)</option>
                  <option value='NC'>North Carolina (NC)</option>
                  <option value='ND'>North Dakota (ND)</option>
                  <option value='OH'>Ohio (OH)</option>
                  <option value='OK'>Oklahoma (OK)</option>
                  <option value='OR'>Oregon (OR)</option>
                  <option value='PA'>Pennsylvania (PA)</option>
                  <option value='RI'>Rhode Island (RI)</option>
                  <option value='SC'>South Carolina (SC)</option>
                  <option value='SD'>South Dakota (SD)</option>
                  <option value='TN'>Tennessee (TN)</option>
                  <option value='TX'>Texas (TX)</option>
                  <option value='UT'>Utah (UT)</option>
                  <option value='VT'>Vermont</option>
                  <option value='VA'>Virginia</option>
                  <option value='WA'>Washington</option>
                  <option value='WV'>West Virginia</option>
                  <option value='WI'>Wisconsin</option>
                  <option value='WY'>Wyoming</option>
                </select>
              </div>
            </div>

            <div>
              <label>School *</label><br />
              <input type='text' name='school' onChange={this.handleInputChange} value={this.state.school} />
            </div>

            <button type='submit'>Update Profile</button>
          </form>

        </div>

      </section>

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
    updateUserProfile: updateUserProfile
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileFreelancerUpdate)
