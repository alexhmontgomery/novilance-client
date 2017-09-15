import React, { Component } from 'react'
import AsideClient from '../components/AsideClient'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { startLoading, stopLoading } from '../actions/index'
import config from '../config/main'

class ClientHome extends Component {
  constructor (props) {
    super(props)

    this.state = {
      projects: []
    }
  }

  componentDidMount () {
    this.props.startLoading()

    fetch(`${config.server}/projects/client/master`, {
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
        <AsideClient />

        <section>
          <div className='user-header-box'>
            <h1>{this.props.user.userInfo.displayName}</h1>
            <p>Location: {this.props.user.userInfo.city}, {this.props.user.userInfo.state}</p>
          </div>

          <div className='pending-projects-box'>
            <h2>Active Projects:</h2>

            <table className='pending-projects-table'>
              <tbody>
                <tr>
                  <th>Project</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Prospects</th>
                </tr>
                {this.state.projects.map((project) =>
                  <tr key={project.id}>
                    <td><Link to={`/project/${project.id}`}>{project.name}</Link></td>
                    <td>{project.type}</td>
                    <td>{project.description}</td>
                    <td>{project.interest.length || 0}</td>
                  </tr>
                )}
              </tbody>
            </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(ClientHome)
