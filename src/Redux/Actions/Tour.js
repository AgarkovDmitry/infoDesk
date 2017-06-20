import * as Api from './../../Api'
import { LoadActivities, LoadActivity } from './index'

export function openTourModal(tour) { return { type: 'OPEN_TOUR_MODAL', tour } }

export function closeTourModal() { return { type: 'CLOSE_TOUR_MODAL' } }

export function nextPage() { return { type: 'NEXT_TOUR_PAGE' } }

export function prevPage() { return { type: 'PREVIOUS_TOUR_PAGE' } }

export function updateField(field, value, validation, error) { return { type: 'UPDATE_TOUR_FIELD', field, value, validation, error }}

function sendSuccess() { return { type: 'SEND_TOUR_SUCCESS' } }

function sendError(err) { return { type: 'SEND_TOUR_ERROR', err } }

export function AddTour(message) {
  return dispatch => {
    return Api.send('tours', message)
    .then(res => res.json())
    .then(
      () => {
        dispatch(sendSuccess())
        dispatch(LoadActivities('tours'))
      },
      err => dispatch(sendError(err))
    )
  }
}

export function EditTour(message, activity) {
  return dispatch => {
    return Api.send('tours', { ...message, _id: undefined }, activity)
    .then(res => res.json())
    .then(
      () => {
        dispatch(LoadActivity('tours', activity.title))
        dispatch(sendSuccess())
      },
      err => dispatch(sendError(err))
    )
  }
}
