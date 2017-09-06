import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { startLoading, stopLoading } from '../actions/index'
import config from '../config/main'

class EmployerHome extends Component {
  constructor (props) {
    super(props)

    this.state = {
      projects: []
    }
  }

  componentDidMount () {
    this.props.startLoading()

    fetch(`${config.server}/projects/employer/master`, {
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

          <div>
            <h2>Project List:</h2>

            {this.state.projects.map((project) =>
              <div key={project.id}>
                <Link to={`/project/${project.id}`}><h3>Title: {project.name}</h3></Link>
                <p>Type: {project.type}</p>
                <p>Description: {project.description}</p>
                <p>Interested Employees: {project.interest.length || 0}</p>
              </div>
            )}
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
    startLoading: startLoading,
    stopLoading: stopLoading
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployerHome)
