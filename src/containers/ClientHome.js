import React, { Component } from 'react'
import Aside from '../containers/Aside'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { startLoading, stopLoading } from '../actions/index'
import config from '../config/main'
import Paper from 'material-ui/Paper'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'

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
        <Aside />

        <section>
          {this.props.user.profile.displayName !== '' &&
            this.props.user.profile.displayName != null &&
              <Paper className='user-header-box' zDepth={2} >
                <h1>{this.props.user.profile.displayName}</h1>
                <p>Location: {this.props.user.profile.city}, {this.props.user.profile.state}</p>
              </Paper>
          }

          {this.props.user.profile.displayName === '' ||
            this.props.user.profile.displayName == null &&
              <Paper className='user-header-box' zDepth={2} >
                <h1>Please update your profile information</h1>
              </Paper>
          }

          <Paper className='pending-projects-box' zDepth={2} >
            <h2>Active Projects:</h2>

            <Table className='pending-projects-table'>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn>Project</TableHeaderColumn>
                  <TableHeaderColumn>Type</TableHeaderColumn>
                  <TableHeaderColumn>Description</TableHeaderColumn>
                  <TableHeaderColumn style={{width: 150}}>Prospects</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false} stripedRows >
                {this.state.projects.map((project) =>
                  <TableRow key={project.id}>
                    <TableRowColumn><Link to={`/projects/view/${project.id}`}>{project.name}</Link></TableRowColumn>
                    <TableRowColumn>{project.type}</TableRowColumn>
                    <TableRowColumn>{project.description}</TableRowColumn>
                    <TableRowColumn style={{width: 150}}>{project.interest.length || 0}</TableRowColumn>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Paper>

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
