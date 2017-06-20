let initState = {
  isOpened: false,
  step: 0,
  err: '',
  type: '',
  message: {
    name: '',
    surname: '',
    country: '',
    birthday: '',
    gender: '',
    file_url: '',

    arrival: '',
    departure: '',
    aiport: '',

    english: 'B1',
    role: 'Applicant',
    weeks: '',
    email: ''
  },
  errs: {
    name: undefined,
    surname: undefined,
    country: undefined,
    birthday: undefined,
    gender: undefined,
    email: undefined
  }
}

const reducer = (state = initState, action) => {
  let message
  let errs
  switch (action.type) {
    case 'SEND_USER_SUCCESS': return initState

    case 'SEND_USER_ERROR': return { ...state, err: action.err }

    case 'OPEN_USER_MODAL':
      if(action.user){
        message = { ...state.message, ...action.user }
        return { ...state, message: message, isOpened: true, type: 'Edit' }
      }
      else{
        message = { ...state.message }
        return { ...state, message: message, isOpened: true, type: 'Add' }
      }

    case 'CLOSE_USER_MODAL':
      return initState

    case 'NEXT_USER_PAGE':
      if(state.step == 0){
        errs = state.errs

        if(!state.message.name) errs.name = 'This field is required'
        if(!state.message.surname) errs.surname = 'This field is required'
        if(!state.message.country) errs.country = 'This field is required'
        if(!state.message.birthday) errs.birthday = 'This field is required'
        if(!state.message.gender) errs.gender = 'Gender is required'

        if(!errs.name && !errs.surname && !errs.country && !errs.birthday && !errs.gender)
          return { ...state, step: state.step + 1 }
        else
          return { ...state, errs: errs }
      }
      else if(state.step == 2){
        if(!state.errs.email)
          return { ...state, step: state.step + 1 }
        else
          return { ...state }
      }
      else
        return { ...state, step: state.step + 1 }

    case 'PREVIOUS_USER_PAGE':
      return (state.step) ? { ...state, step: state.step - 1 } : { ...state }

    case 'UPDATE_USER_FIELD':
      let field = action.field
      let validation = action.validation
      let error = action.error
      let value = action.value

      message = state.message
      errs = state.errs

      message[field] = value

      if(validation(value))
        errs[field] = undefined
      else
        errs[field] = error
      return { ...state, message: message, errs: errs }

    default:
      return state
  }
}

export default reducer
