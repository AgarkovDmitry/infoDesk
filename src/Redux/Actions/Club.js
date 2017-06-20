import * as Api from './../../Api'
import { LoadActivities, LoadActivity } from './index'

export function openClubModal(club) { return { type: 'OPEN_CLUB_MODAL', club } }

export function closeClubModal() { return { type: 'CLOSE_CLUB_MODAL' } }

export function nextPage() { return { type: 'NEXT_CLUB_PAGE' } }

export function prevPage() { return { type: 'PREVIOUS_CLUB_PAGE' } }

export function updateSchedule(index, field, value) { return { type: 'UPDATE_CLUB_SCHEDULE', index, field, value }}

export function updateField(field, value, validation, error) { return { type: 'UPDATE_CLUB_FIELD', field, value, validation, error }}

function sendSuccess() { return { type: 'SEND_CLUB_SUCCESS' } }

function sendError(err) { return { type: 'SEND_CLUB_ERROR', err } }

export function AddClub(message) {
  return dispatch => {
    return Api.send('clubs', message)
    .then(res => res.json())
    .then(
      () => {
        dispatch(sendSuccess())
        dispatch(LoadActivities('clubs'))
      },
      err => dispatch(sendError(err))
    )
  }
}

export function EditClub(message, activity) {
  return dispatch => {
    return Api.send('clubs', { ...message, _id: undefined }, activity)
    .then(res => res.json())
    .then(
      () => {
        dispatch(LoadActivity('clubs', activity.title))
        dispatch(sendSuccess())
      },
      err => dispatch(sendError(err))
    )
  }
}
