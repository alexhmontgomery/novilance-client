import React, { Component } from 'react'
import AsideClient from '../components/AsideClient'
import AsideFreelancer from '../components/AsideFreelancer'
import ProfileClientUpdate from '../containers/ProfileClientUpdate'
import ProfileFreelancerUpdate from '../containers/ProfileFreelancerUpdate'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { startLoading, stopLoading } from '../actions/index'
import config from '../config/main'

class ProfileUpdate extends Component {
  constructor (props) {
    super(props)

    // this.state = {
    //   projects: []
    // }
  }

  // componentDidMount () {
  //   this.props.startLoading()
  //
  //   fetch(`${config.server}/projects/client/master`, {
  //     method: 'GET',
  //     headers: {
  //       'content-type': 'application/json',
  //       'x-access-token': this.props.user.token
  //     }
  //   })
  //   .then(r => r.json())
  //   .then(json => {
  //     console.log(json)
  //     this.setState({
  //       projects: json.projects
  //     })
  //   })
  //   .then(() => {
  //     this.props.stopLoading()
  //   })
  // }

  render () {
    if (this.props.user.profile.role === 'client') {
      return (
        <main id='profile-update-page'>
          <AsideClient />
          <ProfileClientUpdate />
        </main>
      )
    } else if (this.props.user.profile.role === 'freelancer') {
      return (
        <main id='profile-update-page'>
          <AsideFreelancer />
          <ProfileFreelancerUpdate />
        </main>
      )
    }
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
    stopLoading: stopLoading
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUpdate)
