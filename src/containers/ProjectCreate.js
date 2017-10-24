import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { startLoading, stopLoading, createProject } from '../actions/index'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Aside from './Aside'
import Paper from 'material-ui/Paper'

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
        <Aside />
        <section>
          <Paper className='project-create-container' zDepth={2}>
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
                <select name='state' value={this.state.state} onChange={this.handleInputChange}>
                  <option value='AL'>Alabama (AL)</option>
                  <option value='AK'>Alaska (AK)</option>
                  <option value='AZ'>Arizona (AZ)</option>
                  <option value='AR'>Arkansas (AR)</option>
                  <option value='CA'>California (CA)</option>
                  <option value='CO'>Colorado (CO)</option>
                  <option value='CT'>Connecticut (CT)</option>
                  <option value='DE'>Delaware (DE)</option>
                  <option value='DC'>District Of Columbia (DC)</option>
                  <option value='FL'>Florida (FL)</option>
                  <option value='GA'>Georgia (GA)</option>
                  <option value='HI'>Hawaii (HI)</option>
                  <option value='ID'>Idaho (ID)</option>
                  <option value='IL'>Illinois (IL)</option>
                  <option value='IN'>Indiana (IN)</option>
                  <option value='IA'>Iowa (IA)</option>
                  <option value='KS'>Kansas (KS)</option>
                  <option value='KY'>Kentucky (KY)</option>
                  <option value='LA'>Louisiana (LA)</option>
                  <option value='ME'>Maine (ME)</option>
                  <option value='MD'>Maryland (MD)</option>
                  <option value='MA'>Massachusetts (MA)</option>
                  <option value='MI'>Michigan (MI)</option>
                  <option value='MN'>Minnesota (MN)</option>
                  <option value='MS'>Mississippi (MS)</option>
                  <option value='MO'>Missouri (MO)</option>
                  <option value='MT'>Montana (MT)</option>
                  <option value='NE'>Nebraska (NE)</option>
                  <option value='NV'>Nevada (NV)</option>
                  <option value='NH'>New Hampshire (NH)</option>
                  <option value='NJ'>New Jersey (NJ)</option>
                  <option value='NM'>New Mexico (NM)</option>
                  <option value='NY'>New York (NY)</option>
                  <option value='NC'>North Carolina (NC)</option>
                  <option value='ND'>North Dakota (ND)</option>
                  <option value='OH'>Ohio (OH)</option>
                  <option value='OK'>Oklahoma (OK)</option>
                  <option value='OR'>Oregon (OR)</option>
                  <option value='PA'>Pennsylvania (PA)</option>
                  <option value='RI'>Rhode Island (RI)</option>
                  <option value='SC'>South Carolina (SC)</option>
                  <option value='SD'>South Dakota (SD)</option>
                  <option value='TN'>Tennessee (TN)</option>
                  <option value='TX'>Texas (TX)</option>
                  <option value='UT'>Utah (UT)</option>
                  <option value='VT'>Vermont</option>
                  <option value='VA'>Virginia</option>
                  <option value='WA'>Washington</option>
                  <option value='WV'>West Virginia</option>
                  <option value='WI'>Wisconsin</option>
                  <option value='WY'>Wyoming</option>
                </select>
              </div>
              <button type='submit'>Create Project</button>

            </form>
          </Paper>
        </section>

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
