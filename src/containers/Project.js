import React, { Component } from 'react'
import config from '../config/main'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { startLoading, stopLoading } from '../actions/index'
import Aside from './Aside'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'

class Project extends Component {
  constructor (props) {
    super(props)
    this.state = {
      project: '',
      interests: [],
      client: '',
      isInterested: false
    }
    this.handleInterest = this.handleInterest.bind(this)
  }

  handleInterest (e) {
    fetch(`${config.server}/project/interest`, {
      method: 'POST',
      body: JSON.stringify({
        projectId: this.props.projectId
      }),
      headers: {
        'content-type': 'application/json',
        'x-access-token': this.props.user.token
      }
    })
    .then(r => r.json())
    .then(json => {
      console.log(json)
      this.setState({
        isInterested: true
      })
    })
  }

  componentWillMount () {
    this.props.startLoading()
    const projectId = this.props.projectId
    fetch(`${config.server}/projects/${projectId}`, {
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
        project: json.project,
        interests: json.interests,
        client: json.project.client
      })
    })
    .then(() => {
      // Check if freelancer is intersted in the project
      let interestLength = this.state.interests.length
      if (this.props.user.profile.role === 'freelancer') {
        for (var i = 0; i < interestLength; i++) {
          if (
            this.state.interests[i].freelancerId === this.props.user.profile.id
          ) {
            this.setState({isInterested: true})
          }
        }
      }
      this.props.stopLoading()
    })
  }

  render () {
    if (this.props.loading) {
      return (<p>...loading...</p>)
    } else {
      console.log(this)
      switch (this.props.user.profile.role) {
        case 'freelancer':
          return (
            <main id='project-view-page'>
              <Aside />
              <section>
                <Paper zDepth={2} className='project-view-header'>
                  <div className='project-view-name'>
                    <h1>{this.state.project.name}</h1>
                    <h3><em>{this.state.client.displayName}</em></h3>
                  </div>
                  <div className='project-view-rate'>
                    <p>{this.state.project.type}</p>
                    <p>${this.state.project.rate} / hr</p>
                  </div>
                </Paper>

                <Paper zDepth={2} className='project-view-description'>
                  <p className='primary-text-color'>Scope of Work</p>
                  <p>{this.state.project.description}</p>
                </Paper>

                {/* <Interest currentProject={this.state.project} /> */}
                <div>
                  {(this.state.isInterested)
                      ? (<p>Already Interested</p>)
                      : (<RaisedButton className='interest-button' label='Interested?' onClick={this.handleInterest} primary />)
                    }
                </div>
              </section>
            </main>
          )
        case 'client':
          return (
            <main id='project-view-page'>
              <Aside />
              <section>
                <Paper zDepth={2} className='project-view-header'>
                  <div className='project-view-name'>
                    <h1>{this.state.project.name}</h1>
                    <h3><em>{this.state.client.displayName}</em></h3>
                  </div>
                  <div className='project-view-rate'>
                    <p>{this.state.project.type}</p>
                    <p>${this.state.project.rate} / hr</p>
                  </div>
                </Paper>

                <Paper zDepth={2} className='project-view-description'>
                  <p className='primary-text-color'>Scope of Work</p>
                  <p>{this.state.project.description}</p>
                </Paper>

                <Paper className='project-view-prospect-box' zDepth={2} >
                  <p className='primary-text-color'><u>Propsects</u></p>
                  <Table className='project-view-prospect-table'>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
                      <TableRow>
                        <TableHeaderColumn style={{width: 50}}>#</TableHeaderColumn>
                        <TableHeaderColumn style={{textAlign: 'center'}}>Name</TableHeaderColumn>
                        <TableHeaderColumn style={{textAlign: 'center'}}>Status</TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} stripedRows >
                      {this.state.interests.map((interest, index) =>
                        <TableRow key={interest.freelancerId}>
                          <TableRowColumn style={{width: 50}}>{index + 1}</TableRowColumn>
                          <TableRowColumn style={{textAlign: 'center'}}>{interest.freelancer.givenName} {interest.freelancer.surname}</TableRowColumn>
                          <TableRowColumn style={{textAlign: 'center'}}>candidate</TableRowColumn>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </Paper>
              </section>
            </main>
          )
        default:
          return (null)
      }
    }
  }

}

function mapStateToProps (state, ownProps) {
  return {
    loading: state.loading,
    user: state.user,
    projectId: ownProps.match.params.id
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    startLoading: startLoading,
    stopLoading: stopLoading
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Project))
