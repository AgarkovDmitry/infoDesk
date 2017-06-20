import React from 'react'
import { connect } from 'react-redux'
import * as contentActions from '../../Redux/Actions/index'
import * as modalActions from '../../Redux/Actions/Tour'

import TourDialog from '../Dialogs/TourDialog'

import { List, ListItem } from 'material-ui/List'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import PeopleOutline from 'material-ui/svg-icons/social/people-outline'
import Build from 'material-ui/svg-icons/action/build'
import Clear from 'material-ui/svg-icons/content/clear'
import AddCircle from 'material-ui/svg-icons/content/add-circle'
import RemoveCircle from 'material-ui/svg-icons/content/remove-circle'
import Avatar from 'material-ui/Avatar'

import { getDate, getAge } from '../../Convert'

const Sub = (params) => {
  return(
    <ListItem
      leftAvatar={ params.user.file_url && <Avatar src={params.user.file_url} /> }
      primaryText={`${params.user.name} ${params.user.surname}`}
      secondaryText={`${getAge(params.user.birthday)} ${params.user.country} ${params.user.english}`}
      disabled={true}
    />
  )
}

const Tour = (props) => {
  let descrips = []
  if(props.activity.description) descrips = props.activity.description.split('\n')

  return(
    <div>
      {
        descrips.map((item, key) => {
          return <p key={key} className='Description'>{item}</p>
        })
      }
      <p style={{ color: '#FF0000' }}>{props.activity.warning} </p>
      {
        <div style={{ textAlign: 'left' }}>
          {
            props.activity.ageLimit &&
              <div style={{ textAlign: 'left' }}>
                <span style={{ fontWeight: 'bold' }}>Cost:</span> { (props.activity.price) ? props.activity.price + '$' : 'FREE'}
              </div>
          }
          <div style={{ textAlign: 'left' }}>
            <span style={{ fontWeight: 'bold' }}>Runtime:</span> { getDate(props.activity.runtime)}
          </div>
          {
            props.activity.ageLimit &&
              <div style={{ textAlign: 'left' }}>
                <span style={{ fontWeight: 'bold' }}>Required age:</span> {props.activity.ageLimit + '+'}
              </div>
          }
        </div>
      }
      <div style={{ textAlign: 'left' }}>
        <span style={{ fontWeight: 'bold' }}>Members:</span> { props.activity.ids.length }
      </div>
    </div>
  )
}

const TourPage = ({ LoadActivity, LoadSubscribers, Subscribe, Unsubscribe, RemoveSubscribers, openTourModal, tour, role, user, params }) => {
  if(!tour || tour.title != params.title) LoadActivity('tours', params.title)
  if(tour && tour.title == params.title) {
     let isSubed = false
     if(user._id){
       for(let item of tour.ids){
         if(item.$oid == user._id.$oid){
           isSubed = true
           break
         }
       }
     }

    return (
      <div className='row'>
        <div className='col-md-2 col-xs-2'/>
        <div className='col-md-8 col-xs-8'>
          <Paper zDepth={5} className='paper'>
            <Card>
              <CardTitle
                title={
                  <div>
                    { tour.title }
                    { role.editActivities && <IconButton
                      onTouchTap={() => { openTourModal(tour) }}
                      tooltip="Edit"
                      touch={true}
                    >
                      <Build/>
                    </IconButton>}
                  </div>
                }
              />
              <CardText>
                {(tour) ? <Tour activity={tour}/> : null}
              </CardText>
              <CardActions>
                <div>
                  <div style={{ display: 'flex' }}>
                    <IconButton  tooltip={'Show Subscribers'} onTouchTap={() => LoadSubscribers('tours', tour) }>
                      <PeopleOutline/>
                    </IconButton>
                    {
                      (role.clearSubs &&
                        <IconButton  tooltip={'ClearSubs'} onTouchTap={() => RemoveSubscribers('tours', tour) }>
                          <Clear/>
                        </IconButton>)
                    }
                    {
                      (role.subscribe && isSubed &&
                        <IconButton  tooltip={'Unsubscribe'} onTouchTap={() => Unsubscribe('tours', tour, user._id) }>
                          <RemoveCircle/>
                        </IconButton>)
                    }
                    {
                      (role.subscribe && !isSubed &&
                        <IconButton  tooltip={'Subscribe'} onTouchTap={() => Subscribe('tours', tour, user._id) }>
                          <AddCircle/>
                        </IconButton>)
                    }
                  </div>
                  {
                    (tour.isShown == true && tour.subs &&
                      <div className='container-fluid' style={{ marginTop: 20, marginBottom: 20 }}>
                        <div className='row'>
                          <div className='col-md-4 col-xs-4'>
                            <List style={{ textAlign: 'left' }}>
                              {
                                tour.subs
                                .filter((item, key) => (key%3 == 0))
                                .map(sub => <Sub user={sub} key={sub._id.$oid}/> )
                              }
                            </List>
                          </div>
                          <div className='col-md-4 col-xs-4'>
                            <List style={{ textAlign: 'left' }}>
                              {
                                tour.subs
                                .filter((item, key) => (key%3 == 1))
                                .map(sub => <Sub user={sub} key={sub._id.$oid}/> )
                              }
                            </List>
                          </div>
                          <div className='col-md-4 col-xs-4'>
                            <List style={{ textAlign: 'left' }}>
                              {
                                tour.subs
                                .filter((item, key) => (key%3 == 2))
                                .map(sub => <Sub user={sub} key={sub._id.$oid}/> )
                              }
                            </List>
                          </div>
                        </div>
                      </div>)
                  }
                </div>
              </CardActions>
            </Card>
            <TourDialog/>
          </Paper>
        </div>
      </div>
    )
  }
  else return null
}

export default connect(
  state => {
    return {
      user: state.user,
      [state.contentType]: state.content,
      role: state.role,
      editActivities: state.role.editActivities
    }
  },  { ...contentActions, ...modalActions })(TourPage)
