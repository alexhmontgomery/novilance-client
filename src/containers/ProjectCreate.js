import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { startLoading, stopLoading, createProject } from '../actions/index'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class ProjectCreate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      type: '',
      description: '',
      rate: '',
      city: '',
      state: '',
      redirect: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange (event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.startLoading()

    fetch('http://0.0.0.0:5000/project/create', {
      method: 'POST',
      body: JSON.stringify({
        name: this.state.name,
        type: this.state.type,
        description: this.state.description,
        rate: this.state.rate,
        city: this.state.city,
        state: this.state.state
      }),
      headers: {
        'content-type': 'application/json',
        'x-access-token': this.props.user.token
      }
    })
    .then(r => r.json())
    .then(json => {
      console.log(json)
      const newProject = json.project
      const message = json.message
      this.props.createProject(newProject, message)
      this.setState({
        redirect: true
      })
    })
    .then(() => {
      this.props.stopLoading()
    })
  }

  render () {
    if (this.state.redirect === true) {
      return (
        <Redirect to={`/project/${this.props.project.newProject.id}`} />
      )
    }

    return (
      <main id='project-create-page'>
        This the project creation page
        <div>
          (Error messages go here)
        </div>

        <div>
          <form onSubmit={this.handleSubmit}>

            <div>
              <input type='text' name='name' onChange={this.handleInputChange} placeholder='Project Name' value={this.state.name} />
            </div>
            <div>
              <input type='text' name='type' onChange={this.handleInputChange} placeholder='Type of project' value={this.state.type} />
            </div>
            <div>
              <textarea name='description' onChange={this.handleInputChange} placeholder='Description of project scope' rows='5' value={this.state.description} />
            </div>
            <div>
              <input type='number' name='rate' onChange={this.handleInputChange} placeholder='Hourly rate of project' value={this.state.rate} />
            </div>
            <div>
              <input type='text' name='city' onChange={this.handleInputChange} placeholder='City of project' value={this.state.city} />
            </div>
            <div>
              <input type='text' name='state' onChange={this.handleInputChange} placeholder='State of project' value={this.state.state} />
            </div>
            <button type='submit'>Create Project</button>

          </form>
        </div>
      </main>
    )
  }
}

function mapStateToProps (state) {
  return {
    user: state.user,
    project: state.project
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    startLoading: startLoading,
    stopLoading: stopLoading,
    createProject: createProject
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCreate)
