import React from 'react'
import { connect } from 'react-redux'
import * as contentActions from '../../Redux/Actions/index'
import * as modalActions from '../../Redux/Actions/Tour'

import { browserHistory } from 'react-router'

import Paper from 'material-ui/Paper'
import { List, ListItem } from 'material-ui/List'
import IconButton from 'material-ui/IconButton'
import AddCircle from 'material-ui/svg-icons/content/add-circle'
import DeleteForever from 'material-ui/svg-icons/action/delete-forever'
import AirportShuttle from 'material-ui/svg-icons/places/airport-shuttle'

import TourModal from '../Dialogs/TourDialog'
import { getDate } from '../../Convert'

const FreeTour = (props) => (
  <ListItem
    leftIcon={<AirportShuttle/>}
    rightIconButton = {
      (props.access &&
        <IconButton onTouchTap={() => props.RemoveActivity('tours', props.tour._id) }>
          <DeleteForever/>
        </IconButton>)
    }
    primaryText={props.tour.title}
    secondaryText={
      ((props.tour.runtime) ? `${getDate(props.tour.runtime)}, ` : '') +
      `FREE, members: ${props.tour.ids.length}`
    }
    onTouchTap={browserHistory.push.bind(this, '/tours/'+props.tour.title)}
  />
)

const ExtraTour = (props) => (
  <ListItem
    key = {props.tour.title}
    leftIcon={<AirportShuttle/>}
    rightIconButton = {
      (props.access &&
        <IconButton onTouchTap={() => props.RemoveActivity('tours', props.tour._id) }>
          <DeleteForever/>
        </IconButton>)
    }
    primaryText={props.tour.title}
    secondaryText={
      ((props.tour.runtime) ? `${getDate(props.tour.runtime)}, ` : '') +
      `${props.tour.price}$, members: ${props.tour.ids.length}`
    }
    onTouchTap={browserHistory.push.bind(this, '/tours/'+props.tour.title)}
  />
)

const ToursPage = ({ LoadActivities, RemoveActivity, editActivities, role, tours, openTourModal }) => {
  if(!tours) LoadActivities('tours')
  if(tours) return (
    <div className='row'>
      <div className='col-md-2 col-xs-2'/>
      <div className='col-md-8 col-xs-8'>
        <Paper zDepth={5} className='paper'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-md-6 col-xs-6'>
                <List style={{ textAlign: 'left' }}>
                  {
                    tours
                    .filter(item => (!item.price))
                    .map(item => <FreeTour key={item.title} RemoveActivity={RemoveActivity} tour={item} access={role.editActivities}/>)
                  }
                </List>
              </div>
              <div className='col-md-6 col-xs-6'>
                <List style={{ textAlign: 'left' }}>
                {
                  tours
                  .filter(item => (item.price))
                  .map(item => <ExtraTour key={item.title} RemoveActivity={RemoveActivity} tour={item} access={role.editActivities}/>)
                }
                </List>
              </div>
            </div>

            {
              editActivities && <IconButton
                onTouchTap={() => { openTourModal() }}
                tooltip={'Add Club'}
                touch={true}
              >
                <AddCircle/>
              </IconButton>
            }
          </div>
          <TourModal/>
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
      role: state.role,
      editActivities: state.role.editActivities
    }
  }, { ...contentActions, ...modalActions })(ToursPage)
