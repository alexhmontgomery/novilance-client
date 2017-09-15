import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Welcome extends Component {
  render () {
    return (
      <main id='welcome-page'>
        <div className='outer-border-box welcome-box'>
          <div className='welcome-container'>
            <div className='welcome-title-box'>
              <h1>Do Work</h1>
            </div>
            <div className='welcome-instructions'>
              <p>Develop new skills and get real world experience through freelance work.</p>
            </div>
            <Link className='welcome-link' to='/register'>Sign up as a Freelancer</Link>
          </div>
        </div>

        <div className='outer-border-box welcome-box'>
          <div className='welcome-container'>
            <div className='welcome-title-box'>
              <h1>Find Help</h1>
            </div>
            <div className='welcome-instructions'>
              <p>Hire high caliber freelance students at a fraction of the cost of professional freelancers.</p>
            </div>
            <Link className='welcome-link' to='/register'>Sign up as a Client</Link>
          </div>
        </div>
      </main>
    )
  }
}
