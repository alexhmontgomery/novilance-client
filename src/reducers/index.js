import { combineReducers } from 'redux'
import { LOADING_START, LOADING_STOP, USER_AUTHENTICATED, PROJECT_CREATED, USER_LOGGED_OUT, USER_PROFILE_UPDATED } from '../actions/index'
import update from 'immutability-helper'

const initialUserState = {
  isAuthenticated: false,
  token: '',
  profile: ''
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
  switch (action.type) {
    case USER_AUTHENTICATED:
      return update(state, {
        isAuthenticated: {
          $set: true
        },
        token: {
          $set: action.token
        },
        profile: {
          $set: action.user
        }
      })
    case USER_LOGGED_OUT:
      return update(state, {
        isAuthenticated: {
          $set: false
        },
        token: {
          $set: ''
        },
        profile: {
          $set: ''
        }
      })
    case USER_PROFILE_UPDATED:
      return update(state, {
        profile: {
          $set: action.profile
        }
      })

    default:
      return state
  }
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
