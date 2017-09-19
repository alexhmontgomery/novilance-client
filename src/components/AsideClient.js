import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class AsideClient extends Component {
  render () {
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
}
