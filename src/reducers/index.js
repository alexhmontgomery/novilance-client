import { combineReducers } from 'redux'
import { LOADING_START, LOADING_STOP, USER_AUTHENTICATED, PROJECT_CREATED } from '../actions/index'
import update from 'immutability-helper'

const initialUserState = {
  isAuthenticated: false,
  token: '',
  userInfo: ''
}

const initialProjectState = {
  newProject: '',
  message: ''
}

const loadingReducer = (state = false, action) => {
  if (action.type === LOADING_START) {
    return true
  } else if (action.type === LOADING_STOP) {
    return false
  }
  return state
}

const userReducer = (state = initialUserState, action) => {
  if (action.type === USER_AUTHENTICATED) {
    return update(state, {
      isAuthenticated: {
        $set: true
      },
      token: {
        $set: action.token
      },
      userInfo: {
        $set: action.user
      }
    })
  }
  return state
}

const projectReducer = (state = initialProjectState, action) => {
  if (action.type === PROJECT_CREATED) {
    return update(state, {
      newProject: {
        $set: action.project
      },
      message: {
        $set: action.message
      }
    })
  }
  return state
}

const reducer = combineReducers({
  loading: loadingReducer,
  user: userReducer,
  project: projectReducer
})

export default reducer
