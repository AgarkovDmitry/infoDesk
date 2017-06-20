import { getUserByLogin, getRole } from './../../Api'

export function openLoginModal() { return { type: 'OPEN_LOGIN_MODAL' } }

export function closeLoginModal() { return { type: 'CLOSE_LOGIN_MODAL' } }

function successNewLogin(value) { return { type: 'SUCCESS_LOGIN_FIELD', value } }

function errorNewLogin(value) { return { type: 'ERROR_LOGIN_FIELD', value } }

function successNewPass(value) { return { type: 'SUCCESS_PASSWORD_FIELD', value } }

function errorNewPass(value) { return { type: 'ERROR_PASSWORD_FIELD', value } }

function userSuccess(res) { return { type: 'LOGIN_SUCCESS', res } }

function userError(err) { return { type: 'LOGIN_ERROR', err } }

function roleSuccess(res) { return { type: 'ROLE_SUCCESS', res } }

function GetRole(res){
  return dispatch => {
    if(res)
      return getRole(res.role)
      .then(responce => responce.json())
      .then(
        responce => {
          dispatch(userSuccess(res))
          dispatch(roleSuccess(responce[0]))
        },
        err => dispatch(userError(err))
      )
    else
      return dispatch(userError('Wrong username/password'))
  }
}

export function LogIn(message) {
  return dispatch => {
    return getUserByLogin(message.login)
    .then(responce => responce.json())
    .then(
      res => {
        if(res[0] && res[0].role == 'Admin' && (res[0].password == message.pass))
          dispatch(GetRole(res[0]))
        else if(res[0] && res[0]._id.$oid.includes(message.pass))
          dispatch(GetRole(res[0]))
        else
          dispatch(userError('Wrong username/password'))
      },
      err => dispatch(userError(err))
    )
  }
}

export function LogOut() {
  return dispatch => {
      dispatch(userSuccess({}))
      dispatch(roleSuccess({}))
  }
}

export function updateLoginField(value){
  return dispatch => {
    function validateLogin(value){
      return new Promise((resolve, reject) => {
          if(value.length > 3)
            resolve(value)
          else
            reject('Login has to be 4+ symbols')
      })
    }

    return validateLogin(value).then(
      res => dispatch(successNewLogin(res)),
      err => dispatch(errorNewLogin(err))
    )
  }
}

export function updatePassField(value){
  return dispatch => {
    function validatePass(value){
      return new Promise((resolve, reject) => {
          if(value.length > 5)
            resolve(value)
          else
            reject('Password has to be 6+ symbols')
      })
    }

    return validatePass(value).then(
      res => dispatch(successNewPass(res)),
      err => dispatch(errorNewPass(err))
    )
  }
}
