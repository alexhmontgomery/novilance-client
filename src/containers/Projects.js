import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { startLoading, stopLoading } from '../actions/index'
import config from '../config/main'

class Projects extends Component {
  constructor (props) {
    super(props)

    this.state = {
      projects: [],
      searchKey: '',
      searchValue: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleJobSearch = this.handleJobSearch.bind(this)
  }

  handleInputChange (event) {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value
    })
  }

  handleJobSearch (event) {
    event.preventDefault()

    fetch(`${config.server}/projects/search?key=${this.state.searchKey}&value=${this.state.searchValue}`, {
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
  }

  componentDidMount () {
    this.props.startLoading()

    fetch(`${config.server}/projects/all`, {
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
          <form onSubmit={this.handleJobSearch}>
            <input type='text' name='searchValue' onChange={this.handleInputChange} value={this.state.searchValue} placeholder='Search projects' />
            <select type='text' name='searchKey' onChange={this.handleInputChange} value={this.state.searchKey}>
              <option value='type'>Project Type</option>
              <option value='name'>Title</option>
              <option value='client'>Client</option>
              <option value='description'>Description</option>
            </select>
            <button type='submit'>Search Jobs</button>
          </form>
        </div>

        <div>
          <h2>Project List:</h2>

          {this.state.projects.map((project) =>
            <div key={project.id}>
              <Link to={`/projects/view/${project.id}`}><h3>Title: {project.name}</h3></Link>
              <p>Client: {project.client.displayName}</p>
              <p>Type: {project.type}</p>
              <p>Description: {project.description}</p>
              {project.interest.map((interestEach) =>
                interestEach.freelancerId === this.props.user.profile.id &&
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
