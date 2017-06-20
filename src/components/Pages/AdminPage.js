import React from 'react'
import { connect } from 'react-redux'
import * as contentActions from '../../Redux/Actions/index'
import * as userActions from '../../Redux/Actions/User'
import * as filterActions from '../../Redux/Actions/Filter'

import { getAge, getDate } from '../../Convert'
import UserFilter from '../SideBars/UserFilter'
import UserDialog from '../Dialogs/UserDialog'

import { List, ListItem } from 'material-ui/List'
import IconButton from 'material-ui/IconButton'
import PersonAdd from 'material-ui/svg-icons/social/person-add'
import DeleteForever from 'material-ui/svg-icons/action/delete-forever'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import Paper from 'material-ui/Paper'

const UserItem = ({ user, editUser, RemoveUser }) => {
  return (
    <ListItem
      leftAvatar={ user.file_url && <Avatar src={user.file_url} /> }
      rightIconButton = {
        <IconButton onTouchTap={() => RemoveUser(user._id) }>
          <DeleteForever/>
        </IconButton>
      }
      primaryText={
        `${user.name} ${user.surname}(${user.role} ${user._id.$oid})`
      }
      secondaryText={
        <div className='row'>
            <div className='col-md-3 col-xs-3' style={{ padding: 0 }}> {`${user.gender}, ${getAge(user.birthday)} years, ${user.country}`} </div>
            <div className='col-md-1 col-xs-1'/>
            <div className='col-md-3 col-xs-3'> {getDate(user.arrival)} </div>
            <div className='col-md-3 col-xs-3'> {getDate(user.departure)} </div>
            <div className='col-md-2 col-xs-2'> {user.airport} </div>
        </div>}
      onTouchTap={() => editUser(user)}
    />
  )
}
const AdminPage = ({ LoadUsers, RemoveUser, users, editUsers, openUserModal, updateIndex, startIndex }) => {
  if(!users) LoadUsers()
  if(users && editUsers) return (
    <div className='row'>
      <div className='col-md-3 col-xs-3'>
        <Paper zDepth={5} className='paper'>
          <UserFilter/>
        </Paper>
      </div>
      <div className='col-md-8 col-xs-8'>
        <Paper zDepth={5} className='paper'>
          <List style={{ textAlign: 'left' }} onWheel={e => updateIndex(e.deltaY, users.length - 8)}>
              {
                users
                .slice(startIndex, startIndex + 8)
                .map((user, key, users) =>
                  <div key={user._id.$oid}>
                    <UserItem user={user} editUser={openUserModal} RemoveUser={RemoveUser}/>
                    {(key != users.length - 1 && <Divider/>)}
                  </div>
                )
              }
            </List>
          {
            editUsers && <IconButton
              onTouchTap={() => { openUserModal() }}
              tooltip={'Add User'}
              touch={true}
            >
              <PersonAdd/>
            </IconButton>
          }
          <UserDialog/>
        </Paper>
      </div>
    </div>
  )
  else return null
}

export default connect(
  state => {
    let users = state.content
    if(state.contentType == 'users'){
        users = users.filter(user => (user.role != 'Admin'))
        let filters = state.Filter

        if(filters.name)
          users = users.filter(user => `${user.name} ${user.surname}`.toLowerCase().includes(filters.name.toLowerCase()))

        if(filters.country)
          users = users.filter(user => user.country.toLowerCase().includes(filters.country.toLowerCase()))

        if(filters.airport)
          users = users
              .filter(user => user.airport)
              .filter(user => user.airport.toLowerCase().includes(filters.airport.toLowerCase()))

        if(filters.lowestAge)
          users = users.filter(user => getAge(user.birthday) >= filters.lowestAge)

        if(filters.highestAge)
          users = users.filter(user => getAge(user.birthday) <= filters.highestAge)

        if(!filters.applicants)
          users = users.filter(user => user.role != 'Applicant')

        if(!filters.students)
          users = users.filter(user => user.role != 'Student')

        if(!filters.assistants)
          users = users.filter(user => user.role != 'Assistant')

        if(filters.order == 'birthday')
          users = users.sort((a, b) => a.birthday < b.birthday ? 1 : a.birthday > b.birthday ? -1 : 0)

        if(filters.order == 'arrival')
          users = users.sort((a, b) => {
            let aarrival = (a.arrival) ? new Date(a.arrival) : new Date('2070-01-01')
            let barrival = (b.arrival) ? new Date(b.arrival) : new Date('2070-01-01')
            return aarrival > barrival ? 1 : aarrival < barrival ? -1 : 0
          })

        if(filters.order == 'departure')
          users = users.sort((a, b) => {
            let adeparture = (a.departure) ? new Date(a.departure) : new Date('2070-01-01')
            let bdeparture = (b.departure) ? new Date(b.departure) : new Date('2070-01-01')
            return adeparture > bdeparture ? 1 : adeparture < bdeparture ? -1 : 0
          })

    }


    return {
      [state.contentType]: users,
      startIndex: state.Filter.startIndex,
      editUsers: state.role.editUsers
    }
  }, { ...contentActions, ...userActions, ...filterActions })(AdminPage)
