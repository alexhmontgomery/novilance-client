import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import ActionSearch from 'material-ui/svg-icons/action/search'
import FileFolder from 'material-ui/svg-icons/file/folder'
import FileCreateNewFolder from 'material-ui/svg-icons/file/create-new-folder'
import SocialPerson from 'material-ui/svg-icons/social/person'
import ActionSettings from 'material-ui/svg-icons/action/settings'

class Aside extends Component {

  render () {
    switch (this.props.user.profile.role) {
      case 'freelancer':
        return (
          <aside>
            <List>
              <Link to='/projects/search'><ListItem className='aside-link' primaryText='Find a project' leftIcon={<ActionSearch className='aside-icon' />} /></Link>
              <Divider />
              <Link to='/projects'><ListItem className='aside-link' primaryText='My projects' leftIcon={<FileFolder className='aside-icon' />} /></Link>
              <Divider />
              <Link to='/profile/update'><ListItem className='aside-link' primaryText='Edit profile' leftIcon={<SocialPerson className='aside-icon' />} /></Link>
              <Divider />
              <Link to='/projects'><ListItem className='aside-link' primaryText='Settings' leftIcon={<ActionSettings className='aside-icon' />} /></Link>
              <Divider />
            </List>
          </aside>
        )
      case 'client':
        return (
          <aside>
            <List>
              <Link to='/projects/create'><ListItem className='aside-link' primaryText='New project' leftIcon={<FileCreateNewFolder className='aside-icon' />} /></Link>
              <Divider />
              <Link to='/client/home'><ListItem className='aside-link' primaryText='Active projects' leftIcon={<FileFolder className='aside-icon' />} /></Link>
              <Divider />
              <Link to='/projects'><ListItem className='aside-link' primaryText='Find a freelancer' leftIcon={<ActionSearch className='aside-icon' />} /></Link>
              <Divider />
              <Link to='/profile/update'><ListItem className='aside-link' primaryText='Edit profile' leftIcon={<SocialPerson className='aside-icon' />} /></Link>
              <Divider />
              <Link to='/projects'><ListItem className='aside-link' primaryText='Settings' leftIcon={<ActionSettings className='aside-icon' />} /></Link>
              <Divider />
            </List>
          </aside>
        )
      default:
        return (null)
    }

    // if (this.props.user.profile.role === 'freelancer') {
    //   return (
    //     <aside>
    //       <div className='aside-link'>
    //         <Link to='/projects/search'>> Find a New Project</Link>
    //       </div>
    //       <div className='aside-link'>
    //         <Link to='/projects'>> My Projects</Link>
    //       </div>
    //       <div className='aside-link'>
    //         <Link to='/profile/update'>> Edit Profile</Link>
    //       </div>
    //       <div className='aside-link'>
    //         <Link to='/projects'>> Settings</Link>
    //       </div>
    //     </aside>
    //   )
    // } else if (this.props.user.profile.role === 'client') {
    //   return (
    //     <aside>
    //       <div className='aside-link'>
    //         <Link to='/projects'>> Find a Freelancer</Link>
    //       </div>
    //       <div className='aside-link'>
    //         <Link to='/client/home'>> Active Projects</Link>
    //       </div>
    //       <div className='aside-link'>
    //         <Link to='/projects/create'>> Create New Project</Link>
    //       </div>
    //       <div className='aside-link'>
    //         <Link to='/profile/update'>> Edit Profile</Link>
    //       </div>
    //       <div className='aside-link'>
    //         <Link to='/projects'>> Settings</Link>
    //       </div>
    //     </aside>
    //   )
    // }
  }
}

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Aside)
