import React from 'react'
import { connect } from 'react-redux'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { Stepper, Step, StepLabel } from 'material-ui/Stepper'

import FlightsData from './UserForms/FlightsData'
import PassportData from './UserForms/PassportData'
import SchoolData from './UserForms/SchoolData'

import * as actions from '../../Redux/Actions/User'

const UserDialog = ({ UserModal, closeUserModal, prevPage, nextPage, AddUser, EditUser, updateField, countries, airports }) => {
  return (
    <Dialog
      title={`${UserModal.message.name} ${UserModal.message.surname}`}
      modal={false}
      open={UserModal.isOpened}
      onRequestClose={() => { closeUserModal() }}
    >
      <div className='container-fluid'>
        <div className='row'>
          <Stepper activeStep={UserModal.step}>
            <Step>
              <StepLabel>Passport Data</StepLabel>
            </Step>
            <Step>
              <StepLabel>Flights Data</StepLabel>
            </Step>
            <Step>
              <StepLabel>School Data</StepLabel>
            </Step>
          </Stepper>
        </div>
        { (UserModal.step == 0 && <PassportData user={UserModal.message} errs={UserModal.errs} update={updateField} countries={countries}/>) }
        { (UserModal.step == 1 && <FlightsData user={UserModal.message} update={updateField} airports={airports}/>) }
        { (UserModal.step == 2 && <SchoolData user={UserModal.message} errs={UserModal.errs} update={updateField}/>) }
        <div className='row' style={{ marginTop: '20px' }}>
          <div className="col-md-4"/>
          <div className="col-md-4">
            <div style={{ marginTop: 12 }}>
              {
                UserModal.step == 0 && <FlatButton
                  label='Cancel'
                  onTouchTap={() => { closeUserModal() }}
                />
              }
              {
                UserModal.step != 0 && <FlatButton
                  label='Back'
                  onTouchTap={() => { prevPage() }}
                />
              }
              {
                UserModal.step == 2 && UserModal.type == 'Add' && <RaisedButton
                  label='Save'
                  primary={true}
                  onTouchTap={() => { AddUser(UserModal.message) }}
                />
              }
              {
                UserModal.step == 2 && UserModal.type == 'Edit' && <RaisedButton
                  label='Save'
                  primary={true}
                  onTouchTap={() => { EditUser(UserModal.message, UserModal.message) }}
                />
              }
              {
                UserModal.step != 2 && <RaisedButton
                  label='Next'
                  primary={true}
                  onTouchTap={() => { nextPage() } }
                />
              }
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default connect(
  state => {
    let countries = []
    let airports = []
    if(state.contentType == 'users') state.content
    .filter(user => (user.role != 'Admin'))
    .map(item => {
      if(countries.indexOf(item.country) == -1) countries.push(item.country)
      if(airports.indexOf(item.airport) == -1 && item.airport) airports.push(item.airport)
    })

    return {
      airports: airports,
      countries: countries,
      UserModal: state.UserModal
    }
  }, actions
)(UserDialog)
