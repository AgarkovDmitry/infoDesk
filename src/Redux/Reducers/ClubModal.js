let initState = {
  isOpened: false,
  step: 0,
  err: '',
  type: '',
  message: {
    title: '',
    ageLimit: '',
    description: '',
    schedule: [
      { Start: undefined, End: undefined },
      { Start: undefined, End: undefined },
      { Start: undefined, End: undefined },
      { Start: undefined, End: undefined },
      { Start: undefined, End: undefined }
    ],
    warning: '',
    ids: []
  },
  errs: {
    title: undefined,
    ageLimit: undefined,
    description: undefined,
    schedule: [
      { Start: undefined, End: undefined },
      { Start: undefined, End: undefined },
      { Start: undefined, End: undefined },
      { Start: undefined, End: undefined },
      { Start: undefined, End: undefined }
    ],
    warning: undefined
  }
}

const reducer = (state = initState, action) => {
  let message
  let errs
  switch (action.type) {
    case 'SEND_CLUB_SUCCESS': return initState

    case 'SEND_CLUB_ERROR': return { ...state, err: action.err }

    case 'OPEN_CLUB_MODAL':
      if(action.club){
        message = { ...state.message, ...action.club }
        return { ...state, message: message, isOpened: true, type: 'Edit' }
      }
      else{
        message = { ...state.message }
        return { ...state, message: message, isOpened: true, type: 'Add' }
      }

    case 'CLOSE_CLUB_MODAL':
      return initState

    case 'NEXT_CLUB_PAGE':
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
        if(
          !state.errs.schedule[0].Start && !state.errs.schedule[0].End &&
          !state.errs.schedule[1].Start && !state.errs.schedule[1].End &&
          !state.errs.schedule[2].Start && !state.errs.schedule[2].End &&
          !state.errs.schedule[3].Start && !state.errs.schedule[3].End &&
          !state.errs.schedule[4].Start && !state.errs.schedule[4].End
        )
          return { ...state, step: state.step + 1 }
        else
          return { ...state }
      }
      else
        return { ...state, step: state.step + 1 }

    case 'PREVIOUS_CLUB_PAGE':
      return (state.step) ? { ...state, step: state.step - 1 } : { ...state }

    case 'UPDATE_CLUB_FIELD':
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

    case 'UPDATE_CLUB_SCHEDULE':
      message = state.message
      errs = state.errs

      message.schedule[action.index][action.field] = action.value
      errs.schedule[action.index][action.field] = undefined

      let secondField = (action.field == 'Start') ? 'End' : 'Start'

      if(!message.schedule[action.index][secondField]){
        errs.schedule[action.index][secondField] = 'Has to be filled'
      }

      if(message.schedule[action.index].Start && message.schedule[action.index].End){
        let StartTime = new Date('01-01-1970 ' + message.schedule[action.index].Start)
        let EndTime = new Date('01-01-1970 ' + message.schedule[action.index].End)

        if(StartTime > EndTime){
          errs.schedule[action.index].Start = 'Can\'t be bigger'
          errs.schedule[action.index].End = 'Can\'t be smaller'
        }
        else{
          errs.schedule[action.index].Start = undefined
          errs.schedule[action.index].End = undefined
        }
      }

      return { ...state, message: message, errs: errs }

    default:
      return state
  }
}

export default reducer
