let initState = {
  isOpened: false,
  err: '',
  message: {
    login: '',
    pass: ''
  },
  errs: {
    login: '',
    pass: ''
  }
}

const reducer = (state = initState, action) => {
  let message
  let errs
  switch (action.type) {
    case 'LOGIN_SUCCESS': return initState
    case 'LOGIN_ERROR': return { ...state, err: action.err }
    case 'OPEN_LOGIN_MODAL': return { ...initState, isOpened: true }
    case 'CLOSE_LOGIN_MODAL': return initState
    case 'SUCCESS_LOGIN_FIELD':
      message = { ...state.message, login: action.value }
      errs = { ...state.errs, login: '' }
      return { ...state, message: message, errs: errs }
    case 'ERROR_LOGIN_FIELD':
      errs = { ...state.errs, login: action.value }
      return { ...state, errs: errs }
    case 'SUCCESS_PASSWORD_FIELD':
      message = { ...state.message, pass: action.value }
      errs = { ...state.errs, pass: '' }
      return { ...state, message: message, errs: errs }
    case 'ERROR_PASSWORD_FIELD':
      errs = { ...state.errs, pass: action.value }
      return { ...state, errs: errs }
    default:
      return state
  }
}

export default reducer
