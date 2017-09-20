import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Aside extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    switch (this.props.user.profile.role) {
      case 'freelancer':
        return (
          <aside>
            <div className='aside-link'>
              <Link to='/projects/search'>> Find a New Project</Link>
            </div>
            <div className='aside-link'>
              <Link to='/projects'>> My Projects</Link>
            </div>
            <div className='aside-link'>
              <Link to='/profile/update'>> Edit Profile</Link>
            </div>
            <div className='aside-link'>
              <Link to='/projects'>> Settings</Link>
            </div>
          </aside>
        )
      case 'client':
        return (
          <aside>
            <div className='aside-link'>
              <Link to='/projects'>> Find a Freelancer</Link>
            </div>
            <div className='aside-link'>
              <Link to='/client/home'>> Active Projects</Link>
            </div>
            <div className='aside-link'>
              <Link to='/projects/create'>> Create New Project</Link>
            </div>
            <div className='aside-link'>
              <Link to='/profile/update'>> Edit Profile</Link>
            </div>
            <div className='aside-link'>
              <Link to='/projects'>> Settings</Link>
            </div>
          </aside>
        )
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
