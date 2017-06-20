import React from 'react'

import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'

function formatDate(date){
  let day = date.getDate()
    if(day < 10) day = '0' + day

  let month = date.getMonth() + 1
    if(month < 10) month = '0' + month

  return day + '.' + month + '.' + date.getFullYear()
}

const FlightsData = ({ user, update }) => (
  <div>
    <div className='row'>
      <div className="col-md-1"/>
      <div className="col-md-3">
        <DatePicker
          floatingLabelText={'Arrival Date'}
          textFieldStyle={{ width: 'auto' }}
          formatDate={formatDate}
          maxDate={
            (user.departure) ?
              new Date(user.departure):
              undefined
          }
          defaultDate={
            (user.arrival) ?
              new Date(user.arrival):
              undefined
          }
          onChange = {(event, value)=>{
            let arrival = new Date(user.arrival)
            arrival.setFullYear(value.getFullYear())
            arrival.setMonth(value.getMonth())
            arrival.setDate(value.getDate())
            update('arrival', arrival, () => true, '')
          }}
        />
      </div>
      <div className="col-md-3">
        <TimePicker
          textFieldStyle={{ width: 'auto' }}
          floatingLabelText={'Arrival Time'}
          format='24hr'
          defaultTime={
            (user.arrival) ?
              new Date(user.arrival):
              undefined
          }
          onChange = {(event, value)=>{
            let arrival = new Date(user.arrival)
            arrival.setHours(value.getHours(), value.getMinutes())
            update('arrival', arrival, () => true, '')
          }}
        />
      </div>
      <div className="col-md-4">
        <TextField
          floatingLabelText={'Airport'}
          defaultValue={user.airport}
          style={{ width: 'auto' }}
          onChange = {(event, value)=>{update('airport', value, () => true, '')}}
        />
      </div>
    </div>
    <div className='row'>
      <div className="col-md-1"/>
      <div className="col-md-3">
        <DatePicker
          floatingLabelText={'Departure Date'}
          textFieldStyle={{ width: 'auto' }}
          formatDate={formatDate}
          minDate={
            (user.arrival) ?
              new Date(user.arrival):
              undefined
          }
          defaultDate={
            (user.departure) ?
              new Date(user.departure):
              undefined
          }
          onChange = {(event, value)=>{
            let departure = new Date(user.departure)
            departure.setFullYear(value.getFullYear())
            departure.setMonth(value.getMonth())
            departure.setDate(value.getDate())
            update('departure', departure, () => true, '')
          }}
        />
      </div>
      <div className="col-md-3">
        <TimePicker
          textFieldStyle={{ width: 'auto' }}
          floatingLabelText={'Departure Time'}
          format='24hr'
          defaultTime={
            (user.departure) ?
              new Date(user.departure):
              undefined
          }
          onChange = {(event, value)=>{
            let departure = new Date(user.departure)
            departure.setHours(value.getHours(), value.getMinutes())
            update('departure', departure, () => true, '')
          }}
        />
      </div>
    </div>
  </div>
)

export default FlightsData
