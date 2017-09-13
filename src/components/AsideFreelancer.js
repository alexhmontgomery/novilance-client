import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class AsideFreelancer extends Component {
  render () {
    return (
      <aside>
        <div className='aside-link'>
          <Link to='/projects'>> Find a New Project</Link>
        </div>
        <div className='aside-link'>
          <Link to='/projects'>> My Projects</Link>
        </div>
        <div className='aside-link'>
          <Link to='/projects'>> Edit Profile</Link>
        </div>
        <div className='aside-link'>
          <Link to='/projects'>> Settings</Link>
        </div>
      </aside>
    )
  }
}