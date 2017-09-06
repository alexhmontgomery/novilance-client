import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { startLoading, stopLoading } from '../actions/index'

class Projects extends Component {
  constructor (props) {
    super(props)

    this.state = {
      projects: []
    }
  }

  componentDidMount () {
    this.props.startLoading()

    fetch(`http://0.0.0.0:5000/projects/all`, {
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
        projects: json.projects
      })
    })
    .then(() => {
      this.props.stopLoading()
    })
  }

  render () {
    return (
      <main id='projects-page'>
        This is all of the projects

        <div>
          <h2>Project List:</h2>

          {this.state.projects.map((project) =>
            <div key={project.id}>
              <Link to={`/project/${project.id}`}><h3>Title: {project.name}</h3></Link>
              <p>Employer: {project.employer.displayName}</p>
              <p>Type: {project.type}</p>
              <p>Description: {project.description}</p>
              {project.interest.map((interestEach) =>
                interestEach.freelancerId === this.props.user.userInfo.id &&
                <div>INTERESTED</div>
              )}
              {/* {project.interest.id &&
                <div>
                  INTERESTED
                </div>
              } */}
              <p>--------------------------</p>
            </div>
          )}
        </div>
      </main>
    )
  }
}

function mapStateToProps (state, ownProps) {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Projects))
