import React from 'react'
import { connect } from 'react-redux'

import * as filtersActions from '../../Redux/Actions/Filter'

import TextField from 'material-ui/TextField'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Checkbox from 'material-ui/Checkbox'


const Filter = ({ filters, updateField, updateCheckBox, updateOrder }) => {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <TextField
          floatingLabelText={'Name'}
          defaultValue={filters.name}
          style={{ width: 'auto' }}
          onChange = {(event, value)=>{
            updateField('name', value)
          }}
        />
        <TextField
          floatingLabelText={'Country'}
          defaultValue={filters.country}
          style={{ width: 'auto' }}
          onChange = {(event, value)=>{
            updateField('country', value)
          }}
        />
        <TextField
          floatingLabelText={'Airport'}
          defaultValue={filters.airport}
          style={{ width: 'auto' }}
          onChange = {(event, value)=>{
            updateField('airport', value)
          }}
        />
        <TextField
          floatingLabelText={'Older then'}
          defaultValue={filters.lowestAge}
          style={{ width: 'auto' }}
          onChange = {(event, value)=>{
            updateField('lowestAge', value)
          }}
        />
        <TextField
          floatingLabelText={'Younger then'}
          defaultValue={filters.highestAge}
          style={{ width: 'auto' }}
          onChange = {(event, value)=>{
            updateField('highestAge', value)
          }}
        />
        <Checkbox label="Applicants" checked={filters.applicants} onCheck = {()=>{
          updateCheckBox('applicants')
        }}/>
        <Checkbox label="Students" checked={filters.students} onCheck = {()=>{
          updateCheckBox('students')
        }}/>
        <Checkbox label="Assistants" checked={filters.assistants} onCheck = {()=>{
          updateCheckBox('assistants')
        }}/>
        <br/>
        <RadioButtonGroup
          valueSelected={filters.order}
          name='order'
          onChange = {(event, value)=>{updateOrder(value)}}
        >
          <RadioButton
            value={'arrival'}
            label={'Order by arrival'}
          />
          <RadioButton
            value={'departure'}
            label={'Order by departure'}
          />
          <RadioButton
            value={'birthday'}
            label={'Order by Age'}
          />
        </RadioButtonGroup>
      </div>
    </div>
  )
}

export default connect(
  state => {
    return {
      filters: state.Filter
    }
  }, { ...filtersActions })(Filter)
