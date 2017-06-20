import React from 'react'

import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import Avatar from 'material-ui/Avatar'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'

import request from 'superagent'
import IconButton from 'material-ui/IconButton'
import CloudUpload from 'material-ui/svg-icons/file/cloud-upload'

function formatDate(date){
  let day = date.getDate()
    if(day < 10) day = '0' + day

  let month = date.getMonth() + 1
    if(month < 10) month = '0' + month

  return day + '.' + month + '.' + date.getFullYear()
}

const PassportData = ({ user, errs, update }) => (
  <div>
    <div className='row'>
      <div className="col-md-1"/>
      <div className="col-md-4">
        {
          (user.file_url) ?
          <Avatar
            size={200}
            src={user.file_url}
            onTouchTap={() => document.getElementById('fileUpload').click()}
            style={{ cursor: 'pointer' }}
          /> :
          <Avatar
            size={200}
            onTouchTap={() => document.getElementById('fileUpload').click()}
            style={{ cursor: 'pointer' }}>
            <IconButton tooltip={'Add Photo'}>
              <CloudUpload/>
            </IconButton>
          </Avatar>
        }
        <input
          id="fileUpload"
          type="file"
          style={{ 'display': 'none' }}
          accept="image/*"
          onChange={(e) => {
            request
               .post('https://api.cloudinary.com/v1_1/dztttm53o/upload')
               .field('upload_preset', 'ajsogkd9')
               .field('file', e.target.files[0])
               .end((err, response) => {
                  update('file_url', response.body.url, () => true, '')
                })
          }}/>
      </div>
      <div className="col-md-3">
        <TextField
          floatingLabelText={'Name'}
          defaultValue={user.name}
          errorText={errs.name}
          style={{ width: 'auto' }}
          onChange = {(event, value)=>{update('name', value, val => !!(val.trim()), 'This  field is required')}}
        />
        <TextField
          floatingLabelText={'Country'}
          defaultValue={user.country}
          errorText={errs.country}
          style={{ width: 'auto' }}
          onChange = {(event, value)=>{update('country', value, val => !!(val.trim()), 'This  field is required')}}
        />
        <RadioButtonGroup
          name='gender'
          defaultSelected={user.gender}
          onChange = {(event, value)=>{update('gender', value, val => !!(val.trim()), 'Gender is required')}}
          style = {{ display: 'flex', marginTop: 20 }}
        >
          <RadioButton
            value={'Male'}
            label={'Male'}
            style={{ width: 'auto', marginRight: '100px' }}
          />
          <RadioButton
            value={'Female'}
            label={'Female'}
            style={{ width: 'auto', marginRight: '40px' }}
          />
        </RadioButtonGroup>
        <div id='genderError'>
          <p style={{ color: '#FF0000', textAlign: 'center' }}>
            {errs.gender}
          </p>
        </div>
      </div>
      <div className="col-md-3">
        <TextField
          floatingLabelText={'Surname'}
          defaultValue={user.surname}
          errorText={errs.surname}
          style={{ width: 'auto' }}
          onChange = {(event, value)=>{update('surname', value, val => !!(val.trim()), 'This  field is required')}}
        />
        <DatePicker
          floatingLabelText={'Birthday'}
          textFieldStyle={{ width: 'auto' }}
          formatDate={formatDate}
          defaultDate={
            (user.birthday) ?
              new Date(user.birthday):
              undefined
          }
          errorText={errs.birthday}
          onChange = {(event, value)=>{update('birthday', value, val => !!(val), 'This  field is required')}}
        />
      </div>
    </div>

  </div>
)

export default PassportData
