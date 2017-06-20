const initState = {
  prevPage: undefined,
  nextPage: undefined,
  parentPage: undefined,
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'CHANGE_PAGE':
      return {
        ...action,
        type: undefined
      }

    default:
      return state
  }
}

export default reducer
