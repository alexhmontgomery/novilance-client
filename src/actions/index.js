export const LOADING_START = 'LOADING_START'
export const LOADING_STOP = 'LOADING_STOP'
export const USER_AUTHENTICATED = 'USER_AUTHENTICATED'
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT'
export const PROJECT_CREATED = 'PROJECT_CREATED'
export const USER_PROFILE_UPDATED = 'USER_PROFILE_UPDATED'

export function startLoading () {
  return {
    type: LOADING_START
  }
}

export function stopLoading () {
  return {
    type: LOADING_STOP
  }
}

export function authenticateUser (user, token) {
  return {
    type: USER_AUTHENTICATED,
    user: user,
    token: token
  }
}

export function logoutUser () {
  return {
    type: USER_LOGGED_OUT
  }
}

export function createProject (project, message) {
  return {
    type: PROJECT_CREATED,
    project: project,
    message: message
  }
}

export function updateUserProfile (profile) {
  return {
    type: USER_PROFILE_UPDATED,
    profile: profile
  }
}
