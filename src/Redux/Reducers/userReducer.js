import cookie from 'react-cookie'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      cookie.save('user', action.res, { path: '/' })
      return action.res
    default:
      return cookie.load('user') || state
  }
}

export default reducer
