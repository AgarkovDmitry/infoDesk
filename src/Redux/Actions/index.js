import * as Api from './../../Api'

function contentSuccess(res, type) { return { type: 'CONTENT_SUCCESS', contentType: type, res } }

function contentError(err) { return { type: 'CONTENT_ERROR', err } }

function addSubscriber(sub) { return { type: 'ADD_SUBSCRIBER', sub } }

export function LoadActivities(type) {
  return dispatch => {
    return Api.getActivities(type)
    .then(responce => responce.json())
    .then(
      res => dispatch(contentSuccess(res, type)),
      err => dispatch(contentError(err))
    )
  }
}

export function RemoveActivity(type, id) {
  return dispatch => {
    return Api.remove(type, id)
    .then(res => res.json())
    .then(
      () => dispatch(LoadActivities(type)),
      err => dispatch(contentError(err))
    )
  }
}

export function AddActivity(type, message) {
  return dispatch => {
    return Api.send(type, message).then(
      () => dispatch(LoadActivities(type)),
      err => dispatch(contentError(err))
    )
  }
}

export function EditActivity(type, message, activity) {
  return dispatch => {
    return Api.send(type, message, activity).then(
      () => dispatch(LoadActivity(type, activity.title)),
      err => dispatch(contentError(err))
    )
  }
}

export function LoadSubscribers(type, act){
  if(act.isShown)
    return dispatch => dispatch(contentSuccess({ ...act, isShown: false }, type.slice(0, -1)))
  else
    return dispatch => {
      dispatch(contentSuccess({ ...act, isShown: true, subs: [] }, type.slice(0, -1)))
      return Promise.all(act.ids.map(function(id){
        return Api.getSubscriberById(id)
        .then(responce => responce.json())
        .then(
          result => dispatch(addSubscriber(result[0])),
          err => dispatch(contentError(err))
        )
      }))
    }
}

export function LoadActivity(type, title) {
  return dispatch => {
    return Api.getActivity(type, title)
    .then(responce => responce.json())
    .then(
      res => dispatch(contentSuccess({ ...res[0], isShown: false }, type.slice(0, -1))),
      err => dispatch(contentError(err))
    )
  }
}

export function Subscribe(type, act, id){
  let message = act
  message.ids.push(id)
  message.subs = undefined
  return dispatch => {
    return Api.send(type, message, act).then(
      () => (act.isShown) ?
            dispatch(LoadSubscribers(type, { ...message, isShown: false })) :
            dispatch(contentSuccess(message, type.slice(0, -1))),
      err => dispatch(contentError(err))
    )
  }
}

export function Unsubscribe(type, act, id){
  let message = act
  message.ids = message.ids.filter( item => (item.$oid != id.$oid) )
  message.subs = undefined
  return dispatch => {
    return Api.send(type, message, act).then(
      () => (act.isShown) ?
            dispatch(LoadSubscribers(type, { ...message, isShown: false })) :
            dispatch(contentSuccess(message, type.slice(0, -1))),
      err => dispatch(contentError(err))
    )
  }
}

export function RemoveSubscribers(type, act){
  let message = act
  message.ids = []
  message.subs = undefined
  return dispatch => {
    return Api.send(type, message, act).then(
      () => dispatch(contentSuccess({ ...message, isShown: false }, type.slice(0, -1))),
      err => dispatch(contentError(err))
    )
  }
}

export function LoadUsers() {
  return dispatch => {
    return Api.getUsers()
    .then(responce => responce.json())
    .then(
      res => dispatch(contentSuccess(res, 'users')),
      err => dispatch(contentError(err))
    )
  }
}

export function RemoveUser(id) {
  return dispatch => {
    return Api.remove('users', id)
    .then(res => res.json())
    .then(
      () => dispatch(LoadUsers()),
      err => dispatch(contentError(err))
    )
  }
}

export function LoadStudents() {
  return dispatch => {
    return Api.getStudents()
    .then(responce => responce.json())
    .then(
      res => dispatch(contentSuccess(res, 'students')),
      err => dispatch(contentError(err))
    )
  }
}
