const reducer = (state = '', action) => {
  switch (action.type) {
    case 'CONTENT_SUCCESS':
      return action.contentType
    default:
      return state
  }
}

export default reducer
