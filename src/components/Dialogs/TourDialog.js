import React from 'react'
import { connect } from 'react-redux'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { Stepper, Step, StepLabel } from 'material-ui/Stepper'

import MainData from './ActivityForms/MainData'
import WarningData from './ActivityForms/WarningData'
import TourData from './ActivityForms/TourData'

import * as actions from '../../Redux/Actions/Tour'

const TourDialog = ({ TourModal, closeTourModal, prevPage, nextPage, AddTour, EditTour, updateField }) => {
  return (
    <Dialog
      title={TourModal.type + ' tour'}
      modal={false}
      open={TourModal.isOpened}
      onRequestClose={() => { closeTourModal() }}
    >
      <div className='container-fluid'>
        <div className='row'>
          <Stepper activeStep={TourModal.step}>
            <Step>
              <StepLabel>Main Data</StepLabel>
            </Step>
            <Step>
              <StepLabel>Tour Data</StepLabel>
            </Step>
            <Step>
              <StepLabel>Warning</StepLabel>
            </Step>
          </Stepper>
        </div>
        { (TourModal.step == 0 && <MainData mes={TourModal.message} errs={TourModal.errs} update={updateField}/>) }
        { (TourModal.step == 1 && <TourData mes={TourModal.message} errs={TourModal.errs} update={updateField}/>) }
        { (TourModal.step == 2 && <WarningData mes={TourModal.message} update={updateField}/>) }
        <div className='row' style={{ marginTop: '20px' }}>
          <div className="col-md-4"/>
          <div className="col-md-4">
            <div style={{ marginTop: 12 }}>
              {
                TourModal.step == 0 && <FlatButton
                  label='Cancel'
                  onTouchTap={() => { closeTourModal() }}
                />
              }
              {
                TourModal.step != 0 && <FlatButton
                  label='Back'
                  onTouchTap={() => { prevPage() }}
                />
              }
              {
                TourModal.step == 2 && TourModal.type == 'Add' && <RaisedButton
                  label='Save'
                  primary={true}
                  onTouchTap={() => { AddTour(TourModal.message) }}
                />
              }
              {
                TourModal.step == 2 && TourModal.type == 'Edit' && <RaisedButton
                  label='Save'
                  primary={true}
                  onTouchTap={() => { EditTour(TourModal.message, TourModal.message) }}
                />
              }
              {
                TourModal.step != 2 && <RaisedButton
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
  state => ({ TourModal: state.TourModal }), actions
)(TourDialog)
