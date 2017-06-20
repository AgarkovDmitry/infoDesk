import React from 'react'

import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

const SchoolData = ({ user, errs, update }) => {
  return(
    <div>
      <div className='row'>
        <div className='col-md-2'/>
        <div className='col-md-4'>
          <SelectField
            value={user.english}
            onChange={(event, index, value) => {
              update('english', value, () => true, '')
            }}
            autoWidth={true}
          >
            <MenuItem value={'A1'} primaryText='A1(Begginer)' />
            <MenuItem value={'A2'} primaryText='A2(Elementary)' />
            <MenuItem value={'B1'} primaryText='B1(Pre-Intermidiate)' />
            <MenuItem value={'B2'} primaryText='B2(Intermidiate)' />
            <MenuItem value={'C1'} primaryText='C1(Upper-Intermidiate)' />
            <MenuItem value={'C2'} primaryText='C2(Advanced)' />
          </SelectField>
        </div>
        <div className='col-md-4'>
          <SelectField
            value={user.role}
            onChange={(event, index, value) => {
              update('role', value, () => true, '')
            }}
            autoWidth={true}
          >
            <MenuItem value={'Applicant'} primaryText='Applicant' />
            <MenuItem value={'Student'} primaryText='Student' />
            <MenuItem value={'Assistant'} primaryText='Assistant' />
          </SelectField>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-2'/>
        <div className='col-md-4'>
          <TextField
            floatingLabelText={'Weeks'}
            defaultValue={user.weeks}
            errorText={errs.weeks}
            style={{ width: 'auto' }}
            onChange = {(event, value)=>{
              update('weeks', value, val => !(isNaN(val) && val), 'Field requires a number')
            }}
          />
        </div>
        <div className='col-md-4'>
          <TextField
            floatingLabelText={'Email'}
            defaultValue={user.email}
            errorText={errs.email}
            style={{ width: 'auto' }}
            onChange = {(event, value)=>{
              update('email', value, val => true, 'Invalid email address')
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default SchoolData
