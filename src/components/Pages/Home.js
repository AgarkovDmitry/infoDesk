import React from 'react'
import ReactSVG from 'react-svg'
import { connect } from 'react-redux'

import * as contentActions from '../../Redux/Actions/index'
import * as modalActions from '../../Redux/Actions/Tour'

class MainPage extends React.Component {
  render(){
    return(
      <div style={{ display: 'flex', textAlign: 'center', color: 'orange' }}>
        <h1>{'Welcome to GAU GCI'}</h1>
      </div>
    )
  }
}


export default connect(
  state => {
    return {
      user: state.user,
      [state.contentType]: state.content,
      role: state.role,
      editActivities: state.role.editActivities
    }
  },  { ...contentActions, ...modalActions })(MainPage)
