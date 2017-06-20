const reducer = (state = '', action) => {
  switch (action.type) {
    case 'CONTENT_SUCCESS':
      return action.res
    case 'ADD_SUBSCRIBER':
      return { ...state, subs: [...state.subs, action.sub] }
    default:
      return state
  }
}

export default reducer
