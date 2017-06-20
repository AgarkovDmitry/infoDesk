import React from 'react'
import { connect } from 'react-redux'
import * as contentActions from '../../Redux/Actions/index'

import { getDate } from '../../Convert'

import { List, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import Paper from 'material-ui/Paper'

const UserItem = ({ user, date }) => {
  return (
    <ListItem
      leftAvatar={ user.file_url && <Avatar src={user.file_url} /> }
      primaryText={`${user.name} ${user.surname}(${user.role})`}
      secondaryText={`${getDate(date)}, ${user.airport}`}
    />
  )
}

const AdminPage = ({ LoadUsers, users, editUsers }) => {
  if(!users) LoadUsers()
  if(users && editUsers) return (
    <div className='row'>
      <div className='col-md-2 col-xs-2'/>
      <div className='col-md-8 col-xs-8'>
        <Paper zDepth={5} className='paper'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-md-6 col-xs-6'>
                Recent Arrivals
                <List style={{ textAlign: 'left' }}>
                  {
                    users
                    .filter(item => item.arrival)
                    .sort((obj1, obj2) => {
                      return (obj1.arrival > obj2.arrival)
                    })
                    .filter((item, key) => (key < 8))
                    .map((user, key, users) =>
                      <div key={user._id.$oid}>
                        <UserItem user={user} date={user.arrival}/>
                        {(key != users.length - 1 && <Divider/>)}
                      </div>
                    )
                  }
                </List>
              </div>
              <div className='col-md-6 col-xs-6'>
                Recent Departures
                <List style={{ textAlign: 'left' }}>
                  {
                    users
                    .filter(item => item.departure)
                    .sort((obj1, obj2) => {
                      return (obj1.departure > obj2.departure)
                    })
                    .filter((item, key) => (key < 8))
                    .map((user, key, users) =>
                      <div key={user._id.$oid}>
                        <UserItem user={user} date={user.departure}/>
                        {(key != users.length - 1 && <Divider/>)}
                      </div>
                    )
                  }
                </List>
              </div>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  )
  else return null
}

export default connect(
  state => {
    let users = state.content
    if(users)
      users = users
                .filter(user => (user.role != 'Admin'))
    return {
      [state.contentType]: users,
      editUsers: state.role.editUsers
    }
  }, contentActions)(AdminPage)
