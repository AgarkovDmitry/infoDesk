import React from 'react'

import TextField from 'material-ui/TextField'

const MainData = ({ mes, errs, update }) => {
  return(
    <div>
      <div className='row'>
        <div className='col-md-2'/>
        <div className='col-md-4'>
          <TextField
            floatingLabelText={'Title'}
            defaultValue={mes.title}
            errorText={errs.title}
            style={{ width: 'auto' }}
            onChange = {(event, value)=>{
              update('title', value, val => !!(val.trim()), 'This  field is required')
            }}
          />
        </div>
        <div className='col-md-4'>
          <TextField
            floatingLabelText={'Age limit'}
            defaultValue={mes.ageLimit}
            errorText={errs.ageLimit}
            style={{ width: 'auto' }}
            onChange = {(event, value)=>{
              update('ageLimit', value, val => !(isNaN(val) && val), 'Field requires a number')
            }}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-md-12'>
          <TextField
            floatingLabelText={'Description'}
            defaultValue={mes.description}
            multiLine={true}
            rows={6}
            fullWidth={true}
            onChange = {(event, value)=>{
              update('description', value, () => true, '')
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default MainData
