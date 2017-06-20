import React from 'react'
import { connect } from 'react-redux'
import * as contentActions from '../../Redux/Actions/index'
import * as modalActions from '../../Redux/Actions/Club'

import ClubDialog from '../Dialogs/ClubDialog'

import { List, ListItem } from 'material-ui/List'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import PeopleOutline from 'material-ui/svg-icons/social/people-outline'
import Clear from 'material-ui/svg-icons/content/clear'
import Build from 'material-ui/svg-icons/action/build'
import AddCircle from 'material-ui/svg-icons/content/add-circle'
import RemoveCircle from 'material-ui/svg-icons/content/remove-circle'
import Avatar from 'material-ui/Avatar'

import { getSchedule, getAge } from '../../Convert'

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

const Club = (props) => {
  let schedule = getSchedule(props.activity.schedule)
  let descrips = []
  if(props.activity.description) descrips = props.activity.description.split('\n')

  return (
    <div>
      {
        descrips.map((item, key) => {
          return <p key={key} className='Description'>{item}</p>
        })
      }
      <span style={{ color: '#FF0000', fontWeight: 'bold' }}>{props.activity.warning} </span>
      <br/>
      {
        <div className='container-fluid' style={{ marginTop: 20, marginBottom: 20 }} >
          <div className='row'>
            <div className='col-md-1 col-xs-1'/>
            <div className='col-md-2 col-xs-2'>Monday</div>
            <div className='col-md-2 col-xs-2'>Tuesday</div>
            <div className='col-md-2 col-xs-2'>Wesnesday</div>
            <div className='col-md-2 col-xs-2'>Thursday</div>
            <div className='col-md-2 col-xs-2'>Friday</div>
          </div>
          <div className='row'>
            <div className='col-md-1 col-xs-1'/>
            <div className='col-md-2 col-xs-2'>{schedule[0]}</div>
            <div className='col-md-2 col-xs-2'>{schedule[1]}</div>
            <div className='col-md-2 col-xs-2'>{schedule[2]}</div>
            <div className='col-md-2 col-xs-2'>{schedule[3]}</div>
            <div className='col-md-2 col-xs-2'>{schedule[4]}</div>
          </div>
        </div>
      }
      {
        props.activity.ageLimit &&
          <div style={{ textAlign: 'left' }}>
            <span style={{ fontWeight: 'bold' }}>Required age:</span> {props.activity.ageLimit + '+'}
          </div>
      }
      <div style={{ textAlign: 'left' }}>
        <span style={{ fontWeight: 'bold' }}>Members:</span> {props.activity.ids.length}
      </div>
    </div>
  )
}

const ClubPage = ({ LoadActivity, LoadSubscribers, Subscribe, Unsubscribe, RemoveSubscribers, openClubModal, club, role, user, params }) => {
  if(!club || club.title != params.title) LoadActivity('clubs', params.title)
  if(club && club.title == params.title) {
     let isSubed = false
     if(user._id){
       for(let item of club.ids){
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
                    { club.title }
                    { role.editActivities && <IconButton
                      onTouchTap={() => { openClubModal(club) }}
                      tooltip="Edit"
                      touch={true}
                    >
                      <Build/>
                    </IconButton>}
                  </div>
                }
              />
              <CardText>
                {(club) ? <Club activity={club}/> : null}
              </CardText>
              <CardActions>
                <div>
                  <div style={{ display: 'flex' }}>
                    <IconButton  tooltip={'Show Subscribers'} onTouchTap={() => LoadSubscribers('clubs', club) }>
                      <PeopleOutline/>
                    </IconButton>
                    {
                      (role.clearSubs &&
                        <IconButton  tooltip={'ClearSubs'} onTouchTap={() => RemoveSubscribers('clubs', club) }>
                          <Clear/>
                        </IconButton>)
                    }
                    {
                      (role.subscribe && isSubed &&
                        <IconButton  tooltip={'Unsubscribe'} onTouchTap={() => Unsubscribe('clubs', club, user._id) }>
                          <RemoveCircle/>
                        </IconButton>)
                    }
                    {
                      (role.subscribe && !isSubed &&
                        <IconButton  tooltip={'Subscribe'} onTouchTap={() => Subscribe('clubs', club, user._id) }>
                          <AddCircle/>
                        </IconButton>)
                    }
                  </div>
                  {
                    (club.isShown == true && club.subs &&
                      <div className='container-fluid' style={{ marginTop: 20, marginBottom: 20 }}>
                        <div className='row'>
                          <div className='col-md-4 col-xs-4'>
                            <List style={{ textAlign: 'left' }}>
                              {
                                club.subs
                                .filter((item, key) => (key%3 == 0))
                                .map(sub => <Sub user={sub} key={sub._id.$oid}/> )
                              }
                            </List>
                          </div>
                          <div className='col-md-4 col-xs-4'>
                            <List style={{ textAlign: 'left' }}>
                              {
                                club.subs
                                .filter((item, key) => (key%3 == 1))
                                .map(sub => <Sub user={sub} key={sub._id.$oid}/> )
                              }
                            </List>
                          </div>
                          <div className='col-md-4 col-xs-4'>
                            <List style={{ textAlign: 'left' }}>
                              {
                                club.subs
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
            <ClubDialog/>
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
  },  { ...contentActions, ...modalActions })(ClubPage)
