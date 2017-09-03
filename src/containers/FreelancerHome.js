import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class FreelancerHome extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <main id='profile-page'>
        This is the Freelancer home page
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

  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FreelancerHome)
