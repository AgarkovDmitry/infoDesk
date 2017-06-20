import React from 'react'
import { connect } from 'react-redux'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { Stepper, Step, StepLabel } from 'material-ui/Stepper'

import MainData from './ActivityForms/MainData'
import WarningData from './ActivityForms/WarningData'
import ClubData from './ActivityForms/ClubData'

import * as actions from '../../Redux/Actions/Club'

const ClubDialog = ({ ClubModal, closeClubModal, prevPage, nextPage, AddClub, EditClub, updateField, updateSchedule }) => {
  return (
    <Dialog
      title={ClubModal.type + ' club'}
      modal={false}
      open={ClubModal.isOpened}
      onRequestClose={() => { closeClubModal() }}
    >
      <div className='container-fluid'>
        <div className='row'>
          <Stepper activeStep={ClubModal.step}>
            <Step>
              <StepLabel>Main Data</StepLabel>
            </Step>
            <Step>
              <StepLabel>Schedule</StepLabel>
            </Step>
            <Step>
              <StepLabel>Warning</StepLabel>
            </Step>
          </Stepper>
        </div>
        { (ClubModal.step == 0 && <MainData mes={ClubModal.message} errs={ClubModal.errs} update={updateField}/>) }
        { (ClubModal.step == 1 && <ClubData mes={ClubModal.message} errs={ClubModal.errs} update={updateSchedule}/>) }
        { (ClubModal.step == 2 && <WarningData mes={ClubModal.message} update={updateField}/>) }
        <div className='row' style={{ marginTop: '20px' }}>
          <div className="col-md-4"/>
          <div className="col-md-4">
            <div style={{ marginTop: 12 }}>
              {
                ClubModal.step == 0 && <FlatButton
                  label='Cancel'
                  onTouchTap={() => { closeClubModal() }}
                />
              }
              {
                ClubModal.step != 0 && <FlatButton
                  label='Back'
                  onTouchTap={() => { prevPage() }}
                />
              }
              {
                ClubModal.step == 2 && ClubModal.type == 'Add' && <RaisedButton
                  label='Save'
                  primary={true}
                  onTouchTap={() => { AddClub(ClubModal.message) }}
                />
              }
              {
                ClubModal.step == 2 && ClubModal.type == 'Edit' && <RaisedButton
                  label='Save'
                  primary={true}
                  onTouchTap={() => { EditClub(ClubModal.message, ClubModal.message) }}
                />
              }
              {
                ClubModal.step != 2 && <RaisedButton
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
  state => ({ ClubModal: state.ClubModal }), actions
)(ClubDialog)
