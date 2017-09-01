import { combineReducers } from 'redux'
import { LOADING_START, LOADING_STOP, USER_AUTHENTICATED } from '../actions/index'
import update from 'immutability-helper'

const initialUserState = {
  isAuthenticated: false,
  token: '',
  user: ''
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
      user: {
        $set: action.user
      }
    })
  }
  return state
}

const reducer = combineReducers({
  loadingReducer,
  userReducer
})

export default reducer
