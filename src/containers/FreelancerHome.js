import React, { Component } from 'react'
import AsideFreelancer from '../components/AsideFreelancer'
import config from '../config/main'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { startLoading, stopLoading } from '../actions/index'
import { bindActionCreators } from 'redux'

class FreelancerHome extends Component {
  constructor (props) {
    super(props)

    this.state = {
      projects: []
    }
  }

  componentDidMount () {
    this.props.startLoading()

    fetch(`${config.server}/projects/freelancer/master`, {
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
        <AsideFreelancer />

        <section>

          {this.props.user.profile.surname !== '' &&
            this.props.user.profile.surname != null &&
              <div className='user-header-box'>
                <h1>{this.props.user.profile.givenName} {this.props.user.profile.surname}</h1>
                <p><em>{this.props.user.profile.description}</em></p>
                {this.props.user.profile.city !== '' &&
                  <p>Location: {this.props.user.profile.city}, {this.props.user.profile.state}</p>
                }
              </div>
          }

          {this.props.user.profile.surname === '' ||
             this.props.user.profile.surname == null &&
             <div className='user-header-box'>
               <h1>Please update your profile information</h1>
             </div>
          }

          <div className='pending-projects-box'>
            <h2>Pending Projects:</h2>

            <table className='pending-projects-table'>
              <tbody>
                <tr>
                  <th>Project</th>
                  <th>Type</th>
                  <th>Description</th>
                </tr>
                {this.state.projects.map((project) =>
                  <tr key={project.id}>
                    <td><Link to={`/project/${project.id}`}>{project.name}</Link></td>
                    <td>{project.type}</td>
                    <td>{project.description}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(FreelancerHome)
