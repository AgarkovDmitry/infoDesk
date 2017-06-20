let initState = {
  isOpened: false,
  step: 0,
  err: '',
  type: '',
  message: {
    title: '',
    ageLimit: '',
    description: '',
    price: '',
    runtime: undefined,
    warning: '',
    ids: []
  },
  errs: {
    title: undefined,
    ageLimit: undefined,
    description: undefined,
    price: undefined,
    runtime: undefined,
    warning: undefined
  }
}

const reducer = (state = initState, action) => {
  let message
  let errs
  switch (action.type) {
    case 'SEND_TOUR_SUCCESS': return initState

    case 'SEND_TOUR_ERROR': return { ...state, err: action.err }

    case 'OPEN_TOUR_MODAL':
      if(action.tour){
        message = { ...state.message, ...action.tour }
        return { ...state, message: message, isOpened: true, type: 'Edit' }
      }
      else{
        message = { ...state.message }
        return { ...state, message: message, isOpened: true, type: 'Add' }
      }

    case 'CLOSE_TOUR_MODAL':
      return initState

    case 'NEXT_TOUR_PAGE':
      if(state.step == 0){
        if(!state.message.title){
          errs = { ...state.errs, title: 'This field is required' }
          return { ...state, errs: errs }
        }
        else if(!state.errs.title && !state.errs.ageLimit)
          return { ...state, step: state.step + 1 }
        else
          return { ...state }
      }
      else if(state.step == 1){
        if(!state.errs.price)
          return { ...state, step: state.step + 1 }
        else
          return { ...state }
      }
      else
        return { ...state, step: state.step + 1 }

    case 'PREVIOUS_TOUR_PAGE':
      return (state.step) ? { ...state, step: state.step - 1 } : { ...state }

    case 'UPDATE_TOUR_FIELD':
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
