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

    this.handleSubmit = this.handleSubmit.bind(this)
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
        <Redirect to={`project/${this.props.project.newProject.id}`} />
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
              <input type='text' onChange={(e) => this.setState({name: e.target.value})} placeholder='Project Name' value={this.state.name} />
            </div>
            <div>
              <input type='text' onChange={(e) => this.setState({type: e.target.value})} placeholder='Type of project' value={this.state.type} />
            </div>
            <div>
              <textarea onChange={(e) => this.setState({description: e.target.value})} placeholder='Description of project scope' rows='5' value={this.state.description} />
            </div>
            <div>
              <input type='number' onChange={(e) => this.setState({rate: e.target.value})} placeholder='Hourly rate of project' value={this.state.rate} />
            </div>
            <div>
              <input type='text' onChange={(e) => this.setState({city: e.target.value})} placeholder='City of project' value={this.state.city} />
            </div>
            <div>
              <input type='text' onChange={(e) => this.setState({state: e.target.value})} placeholder='State of project' value={this.state.state} />
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
