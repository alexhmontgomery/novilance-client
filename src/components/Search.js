import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Search extends Component {
  render () {
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
  }
}
