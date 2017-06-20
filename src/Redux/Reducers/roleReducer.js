import cookie from 'react-cookie'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'ROLE_SUCCESS':
      cookie.save('role', action.res, { path: '/' })
      return action.res
    default:
      return cookie.load('role') || state
  }
}

export default reducer
