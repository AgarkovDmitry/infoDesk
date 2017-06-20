import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import * as contentActions from '../../Redux/Actions/index'
import * as modalActions from '../../Redux/Actions/Club'

import { getSchedule } from '../../Convert'

import ClubDialog from '../Dialogs/ClubDialog'

import { List, ListItem } from 'material-ui/List'
import IconButton from 'material-ui/IconButton'
import AddCircle from 'material-ui/svg-icons/content/add-circle'
import DeleteForever from 'material-ui/svg-icons/action/delete-forever'
import Spa from 'material-ui/svg-icons/places/spa'
import Paper from 'material-ui/Paper'

const ClubItem = ({ club, RemoveActivity, editActivities }) => {
  let schedule = getSchedule(club.schedule)

  return (
    <ListItem
      leftIcon={<Spa/>}
      rightIconButton = {
        editActivities &&
        <IconButton onTouchTap={() => RemoveActivity('clubs', club._id) }>
          <DeleteForever/>
        </IconButton>
      }
      primaryText={club.title}
      secondaryText={
        <div className='row'>
          <div className='col-md-2 col-xs-2' style={{ padding: 0 }}> {`Members: ${club.ids.length}`} </div>
          <div className='col-md-2 col-xs-2'> {schedule[0]} </div>
          <div className='col-md-2 col-xs-2'> {schedule[1]} </div>
          <div className='col-md-2 col-xs-2'> {schedule[2]} </div>
          <div className='col-md-2 col-xs-2'> {schedule[3]} </div>
          <div className='col-md-2 col-xs-2'> {schedule[4]} </div>
        </div>
      }
      onTouchTap={() => { browserHistory.push('/clubs/' + club.title) }}
    />
  )
}

const ClubsPage = ({ LoadActivities, RemoveActivity, clubs, editActivities, openClubModal }) => {
  if(!clubs) LoadActivities('clubs')
  if(clubs) return (
    <div className='row'>
      <div className='col-md-2 col-xs-2'/>
      <div className='col-md-8 col-xs-8'>
        <Paper zDepth={5} className='paper'>
          <List style={{ textAlign: 'left' }}>
            { clubs.map(club => <ClubItem club={club} RemoveActivity={RemoveActivity} editActivities={editActivities} key={club._id.$oid}/> ) }
          </List>
          {
            editActivities && <IconButton
              onTouchTap={() => { openClubModal() }}
              tooltip={'Add Club'}
              touch={true}
            >
              <AddCircle/>
            </IconButton>
          }
          <ClubDialog/>
        </Paper>
      </div>
    </div>
  )
  else return null
}

export default connect(
  state => {
    return {
      [state.contentType]: state.content,
      editActivities: state.role.editActivities
    }
  }, { ...contentActions, ...modalActions })(ClubsPage)
