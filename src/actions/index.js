export const LOADING_START = 'LOADING_START'
export const LOADING_STOP = 'LOADING_STOP'
export const USER_AUTHENTICATED = 'USER_AUTHENTICATED'

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
