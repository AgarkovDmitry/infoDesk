let initState = {
  name: undefined,
  country: undefined,
  airport: undefined,
  lowestAge: undefined,
  highestAge: undefined,
  applicants: true,
  students: true,
  assistants: true,
  order: undefined,
  startIndex: 0
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'UPDATE_FILTER_INDEX':
      if(action.delta > 0 && state.startIndex < action.MaxIndex)
        return { ...state, startIndex: parseInt(state.startIndex) + 1 }
      else if(action.delta < 0 && state.startIndex > 0)
        return { ...state, startIndex: parseInt(state.startIndex) - 1 }
      else
        return { ...state }

    case 'UPDATE_FILTER_FIELD':
      let field = action.field
      let value = action.value

      return { ...state, [field]: value, startIndex: 0 }

    case 'UPDATE_FILTER_CHECKBOX':
      return { ...state, [action.field]: !state[action.field], startIndex: 0 }

    case 'UPDATE_FILTER_ORDER':
      let newOrder = (action.value == state.order) ? undefined : action.value
      return { ...state, order: newOrder }

    default:
      return state
  }
}

export default reducer
