import React from 'react'
import { connect } from 'react-redux'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import * as actions from '../../Redux/Actions/Auth'

const LoginDialog = ({ loginModal, closeLoginModal, updateLoginField, updatePassField, LogIn }) => {
  return (
    <Dialog
      title="Login"
      modal={false}
      open={loginModal.isOpened}
      onRequestClose={ () => closeLoginModal() }
    >
      <div className='row' style={{ marginTop: '20px' }}>
        <div className="col-md-2"/>
        <div className="col-md-3">
          <TextField
            floatingLabelText='Login'
            onChange={ (event, value) => updateLoginField(value) }
            errorText={loginModal.errs.login}
            style={{ width: 'auto' }}
          />
        </div>
        <div className="col-md-2"/>
        <div className="col-md-3">
          <TextField
            floatingLabelText='Password'
            onChange={ (event, value) => updatePassField(value) }
            errorText={loginModal.errs.pass}
            type='password'
            style={{ width: 'auto' }}
          />
        </div>
      </div>

      <div className='row' style={{ marginTop: '20px' }}>
        <div className="col-md-4"/>
        <div className="col-md-4">
          <p style={{ color: '#FF0000' }}>{loginModal.err}</p>
        </div>
      </div>

      <div className='row' style={{ marginTop: '20px' }}>
        <div className="col-md-4"/>
        <div className="col-md-4">
          <div style={{ marginTop: 12 }}>
            <FlatButton
              label={'Cancel'}
              onTouchTap={ () => closeLoginModal() }
            />
            <RaisedButton
              label={'Log In'}
              primary={true}
              onTouchTap={ () => LogIn(loginModal.message) }
            />
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default connect(
  state => ({ loginModal: state.loginModal }), actions
)(LoginDialog)
