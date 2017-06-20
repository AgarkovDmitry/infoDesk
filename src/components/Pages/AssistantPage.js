import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../Redux/Actions/index'

import { getAge, getDate } from '../../Convert'

import { List, ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Paper from 'material-ui/Paper'

const StudentItem = ({ student }) => {
  return (
    <ListItem
      disabled={true}
      leftAvatar={ student.file_url && <Avatar src={student.file_url} /> }
      primaryText={student.name + ' ' + student.surname}
      secondaryText={
        <div className='row'>
          <div className='col-md-3 col-xs-3' style={{ padding: 0 }}> {`${student.gender}, ${getAge(student.birthday)} years, ${student.country}`} </div>
          <div className='col-md-1 col-xs-1'/>
          <div className='col-md-3 col-xs-3'> {getDate(student.arrival)} </div>
          <div className='col-md-3 col-xs-3'> {getDate(student.departure)} </div>
          <div className='col-md-2 col-xs-2'> {student.airport} </div>
        </div>
      }
    />
  )
}

const AssistantPage = ({ LoadStudents, students, seeStudents }) => {
  if(!students) LoadStudents()
  if(students && seeStudents) return (
    <Paper zDepth={5} className='paper'>
      <List style={{ textAlign: 'left' }}>
        { students.map(student => <StudentItem student={student} key={student._id.$oid}/> ) }
      </List>
    </Paper>
  )
  else return null
}

export default connect(
  state => {
    return {
      [state.contentType]: state.content,
      seeStudents: state.role.seeStudents
    }
  }, actions)(AssistantPage)
