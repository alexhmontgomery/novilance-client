import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
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
import EmployerHome from './containers/EmployerHome'
import Project from './containers/Project'
import ProjectCreate from './containers/ProjectCreate'
import registerServiceWorker from './registerServiceWorker'

const createStoreWithMiddleware = applyMiddleware()(createStore)

ReactDOM.render(

  <Provider store={createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
    <BrowserRouter>
      <BaseLayout>
        <Switch>
          <Route exact path='/' component={Welcome} />
          <Route path='/register' component={Register} />
          <Route path='/authenticate' component={Authenticate} />
          <Route path='/freelancer/home' component={FreelancerHome} />
          <Route path='/employer/home' component={EmployerHome} />
          <Route path='/project/new' component={ProjectCreate} />
          <Route path='/project/:id' component={Project} />
        </Switch>
      </BaseLayout>
    </BrowserRouter>
  </Provider>

, document.getElementById('root'))
registerServiceWorker()
