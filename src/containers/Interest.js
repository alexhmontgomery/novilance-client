import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import config from '../config/main'

class Interest extends Component {
  constructor (props) {
    super(props)
    this.state = {
      buttonClass: 'unclicked'
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

  render () {
    return (
      <div>
        <button className='interest-button' onClick={this.handleInterest}>Interested</button>
      </div>
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
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Interest)
