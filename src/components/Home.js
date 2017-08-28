import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Home extends Component {
  render () {
    return (
      <main id='home-page'>
        <div id='home-main-box'>
          <div className='home-boxes'>
            <div className='home-inner-boxes'>
              <div className='home-text-group'>
                <div className='home-headings'>
                  <h1>Do Work</h1>
                </div>
                <div className='home-description'>
                  <p>Develop new skills and get real world experience through freelance work.</p>
                </div>
              </div>
              <Link className='home-box-link' to='/project'>Sign up as a Freelancer</Link>
            </div>
          </div>
          <div className='home-boxes'>
            <div className='home-inner-boxes'>
              <div className='home-text-group'>
                <div className='home-headings'>
                  <h1>Find Help</h1>
                </div>
                <div className='home-description'>
                  <p>Hire high caliber freelance students at a fraction of the cost of professional freelancers.</p>
                </div>
              </div>
              <Link className='home-box-link' to='/freelancer'>Sign up as an Employer</Link>
            </div>
          </div>
        </div>
      </main>
    )
  }
}
