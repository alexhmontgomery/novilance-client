import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { startLoading, stopLoading } from '../actions/index'
import config from '../config/main'
import Interest from './Interest'
import Aside from './Aside'

class Projects extends Component {
  constructor (props) {
    super(props)

    this.state = {
      projects: [],
      searchKey: '',
      searchValue: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleProjectSearch = this.handleProjectSearch.bind(this)
  }

  handleInputChange (event) {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value
    })
  }

  handleProjectSearch (event) {
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

  componentWillMount () {
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
      <main id='projects-search-page'>
        <Aside />

        <section>
          <form className='projects-search-box' onSubmit={this.handleProjectSearch}>
            <input type='text' name='searchValue' onChange={this.handleInputChange} value={this.state.searchValue} placeholder='Search projects' />
            <select type='text' name='searchKey' onChange={this.handleInputChange} value={this.state.searchKey}>
              <option value='type'>Project Type</option>
              <option value='name'>Title</option>
              <option value='client'>Client</option>
              <option value='description'>Description</option>
            </select>
            <button type='submit'>Search Projects</button>
          </form>

          <div className='projects-display-box'>
            {this.state.projects.map((project) =>
              <div className='projects-map' key={project.id}>
                <div className='projects-map-info'>
                  <h3><Link to={`/projects/view/${project.id}`}><b>{project.name}</b></Link></h3>
                  <p><i>{project.client.displayName}</i></p>
                  <p>{project.description}</p>
                  <div className='projects-map-info-rate'>
                    <p>{project.type}</p>
                    <p>${project.rate} / hr</p>
                  </div>
                </div>

                <Interest currentProject={project} />

              </div>
            )}
          </div>
        </section>
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
