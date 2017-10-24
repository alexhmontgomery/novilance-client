import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import config from '../config/main'
import RaisedButton from 'material-ui/RaisedButton'

class Interest extends Component {
  constructor (props) {
    super(props)
    this.state = {
      buttonClass: 'unclicked',
      isInterested: false
    }

    this.handleInterest = this.handleInterest.bind(this)
  }

  handleInterest (e) {
    fetch(`${config.server}/project/interest`, {
      method: 'POST',
      body: JSON.stringify({
        projectId: this.props.currentProject.id
      }),
      headers: {
        'content-type': 'application/json',
        'x-access-token': this.props.user.token
      }
    })
    .then(r => r.json())
    .then(json => {
      console.log(json)
      this.setState({
        buttonClass: 'clicked'
      })
    })
  }

  componentWillMount () {
    let interestLength = this.props.currentProject.interest.length
    // Check if freelancer is interested in the project
    if (this.props.user.profile.role === 'freelancer') {
      for (var i = 0; i < interestLength; i++) {
        if (
          this.props.currentProject.interest[i].freelancerId === this.props.user.profile.id
        ) {
          this.setState({isInterested: true})
        }
      }
    }
  }

  render () {
    console.log(this)
    // console.log('length is ' + this.props.currentProject.interest.length)
    switch (this.props.user.profile.role) {
      case 'freelancer':
        return (
          <div>
            {(this.state.isInterested)
              ? (<p>Already Interested</p>)
              : (<RaisedButton className='interest-button' label='Interested?' onClick={this.handleInterest} primary />)
            }
            {/* <p>{this.props.currentProject.interest.length} is the length</p> */}
          </div>
        )
      case 'client':
        return (
          <div>
            {(this.props.user.profile.id === this.props.currentProject.clientId)
              ? ((this.props.currentProject.interest.length)
                  ? (<p>Prospects: {this.props.currentProject.interest.length}</p>)
                  : (<p>No interest yet</p>)
              )
              : (<p />)
            }
            {/* <p>{this.props.currentProject.interest.length} is the length</p> */}
          </div>
        )
      default:
        return (null)
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
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Interest)
