import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class EmployerHome extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <main id='profile-page'>
        This is the Employer home page
        <aside>
          <div>
            <Link to='/project/new'>Create New Project</Link>
          </div>
          <div>
            <Link to='/freelancers/search'>Browse Freelancers</Link>
          </div>
        </aside>
        <section>
          <div>
            <h1>{this.props.user.userInfo.displayName}</h1>
            <p>Location: {this.props.user.userInfo.city}, {this.props.user.userInfo.state}</p>
          </div>
        </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(EmployerHome)
