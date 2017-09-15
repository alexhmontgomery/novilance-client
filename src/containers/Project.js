import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { startLoading, stopLoading } from '../actions/index'
import Interest from './Interest'

class Project extends Component {
  constructor (props) {
    super(props)

    this.state = {
      project: '',
      interests: ''
    }
  }

  componentDidMount () {
    this.props.startLoading()

    const projectId = this.props.projectId

    fetch(`http://0.0.0.0:5000/project/${projectId}`, {
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
        project: json.project,
        interests: json.interests
      })
    })
    .then(() => {
      this.props.stopLoading()
    })
  }

  render () {
    return (
      <main id='project-page'>
        This is the project page
        <div>
          <p>{this.props.project.message}</p>
        </div>
        <section>
          <div>
            <h1>Project: {this.state.project.name}</h1>
            <h3>Type: {this.state.project.type}</h3>
            <p>Description {this.state.project.description}</p>
          </div>
          {this.props.user.userInfo.role === 'freelancer' &&
            <Interest currentProject={this.state.project} />
          }

          {this.props.user.userInfo.role === 'client' &&
          this.props.user.userInfo.id === this.state.project.clientId &&
            <p># Freelancers Interested: {this.state.interests.length}</p>
          }

        </section>
        <div>
          <Link to='/projects'>Back to all projects</Link>
        </div>
      </main>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {
    user: state.user,
    project: state.project,
    projectId: ownProps.match.params.id
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    startLoading: startLoading,
    stopLoading: stopLoading
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Project))
