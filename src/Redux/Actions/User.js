import * as Api from './../../Api'
import { LoadUsers } from './index'

export function openUserModal(user) { return { type: 'OPEN_USER_MODAL', user } }

export function closeUserModal() { return { type: 'CLOSE_USER_MODAL' } }

export function nextPage() { return { type: 'NEXT_USER_PAGE' } }

export function prevPage() { return { type: 'PREVIOUS_USER_PAGE' } }

export function updateField(field, value, validation, error) { return { type: 'UPDATE_USER_FIELD', field, value, validation, error }}

function sendSuccess() { return { type: 'SEND_USER_SUCCESS' } }

function sendError(err) { return { type: 'SEND_TOUR_ERROR', err } }

export function AddUser(message) {
  return dispatch => {
    return Api.send('users', message)
    .then(res => res.json())
    .then(
      () => {
        dispatch(sendSuccess())
        dispatch(LoadUsers())
      },
      err => dispatch(sendError(err))
    )
  }
}

export function EditUser(message, user) {
  return dispatch => {
    return Api.send('users', { ...message, _id: undefined }, user)
    .then(res => res.json())
    .then(
      () => {
        dispatch(sendSuccess())
        dispatch(LoadUsers())
      },
      err => dispatch(sendError(err))
    )
  }
}
