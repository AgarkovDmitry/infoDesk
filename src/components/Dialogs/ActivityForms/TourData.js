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

const TourData = ({ mes, errs, update }) => {
  return(
    <div className='row'>
      <div className='col-md-1'/>
      <div className="col-md-3">
        <DatePicker
          floatingLabelText='Tour Date'
          textFieldStyle={{ width: 'auto' }}
          formatDate={ formatDate }
          defaultDate={
            (mes.runtime != undefined) ?
              new Date(mes.runtime):
              undefined
          }
          onChange = {(event, value) => {
            let runtime = new Date(mes.runtime)
            runtime.setFullYear(value.getFullYear())
            runtime.setMonth(value.getMonth())
            runtime.setDate(value.getDate())
            update('runtime', runtime, () => true, '')
          }}
        />
      </div>
      <div className="col-md-3">
        <TimePicker
          textFieldStyle={{ width: 'auto' }}
          floatingLabelText='Tour Time'
          format='24hr'
          defaultTime={
            (mes.runtime != undefined) ?
              new Date(mes.runtime):
              undefined
          }
          onChange = {(event, value)=>{
            let runtime = new Date(mes.runtime)
            runtime.setHours(value.getHours(), value.getMinutes())
            update('runtime', runtime, () => true, '')
          }}
        />
        </div>
        <div className='col-md-1'/>
        <div className='col-md-3'>
          <TextField
            floatingLabelText={'Price'}
            defaultValue={mes.price}
            errorText={errs.price}
            style={{ width: 'auto' }}
            onChange = {(event, value)=>{
              update('price', value, val => !(isNaN(val) && val), 'Field requires a number')
            }}
          />
        </div>
    </div>
  )
}

export default TourData
