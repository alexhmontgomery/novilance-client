import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import './styles/index.css'
// redux imports
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers'
import BaseLayout from './components/BaseLayout'
import Welcome from './components/Welcome'
import Register from './containers/Register'
import Authenticate from './containers/Authenticate'
import FreelancerHome from './containers/FreelancerHome'
import ClientHome from './containers/ClientHome'
import Projects from './containers/Projects'
import Project from './containers/Project'
import ProjectCreate from './containers/ProjectCreate'
import ProfileUpdate from './containers/ProfileUpdate'
import registerServiceWorker from './registerServiceWorker'
// import injectTapEventPlugin from 'react-tap-event-plugin'
//
// injectTapEventPlugin()

const createStoreWithMiddleware = applyMiddleware()(createStore)

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
      <BrowserRouter>
        <BaseLayout>
          <Switch>
            <Route exact path='/' component={Welcome} />
            <Route path='/register' component={Register} />
            <Route path='/authenticate' component={Authenticate} />
            <Route path='/freelancer/home' component={FreelancerHome} />
            <Route path='/client/home' component={ClientHome} />
            <Route path='/projects/search/' component={Projects} />
            <Route path='/projects/create' component={ProjectCreate} />
            <Route path='/projects/view/:id' component={Project} />
            <Route path='/profile/update' component={ProfileUpdate} />
            {/* <Route component={NoMatch} /> */}
          </Switch>
        </BaseLayout>
      </BrowserRouter>
    </Provider>
  </MuiThemeProvider>

, document.getElementById('root'))
registerServiceWorker()
