import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { startLoading, stopLoading } from '../actions/index'

class Project extends Component {
  constructor (props) {
    super(props)

    this.state = {
      project: ''
    }
  }

  componentDidMount () {
    this.props.startLoading()

    const {id} = this.props.match.params

    fetch(`http://0.0.0.0:5000/project/1`, {
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
        project: json.project
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
    stopLoading: stopLoading
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Project)