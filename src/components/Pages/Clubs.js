import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import * as contentActions from '../../Redux/Actions/index'
import * as modalActions from '../../Redux/Actions/Club'

import { getSchedule } from '../../Convert'

import DeleteForever from 'material-ui/svg-icons/action/delete-forever'

const ClubItem = ({ club, RemoveActivity, editActivities, size }) => {
  let schedule = getSchedule(club.schedule)
  document.body.style = undefined

  return (
    <div className='objectContainer objectTransition' style={{ width: `${size}%` }}>
      <div className="objectNumber" onClick={() => { browserHistory.push('/clubs/' + club.title) }}>{club.ids.length}</div>
      <div className='objectImage' onClick={() => { browserHistory.push('/clubs/' + club.title) }} style={{
          background: `url(${club.file_url})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}/>
      <div className="objectTextArea">
        <div className="objectHeader">
            <div style={{ width: '30%' }}>{club.title} </div>
            <div style={{ width: '60%' }}/>
            {
              editActivities && <div style={{ width: '10%' }}><DeleteForever onClick={() => {
                RemoveActivity('clubs', club._id)
              }} className="objectButton" style={{ color: 'white', width: '30px', height: '30px' }}/> </div>
            }
        </div>
        <div className="objectExtra">
          <hr style={{ borderTopWidth: '3px' }}/>
          <div className="objectExtraItem">
            <div style={{ width: '5%' }}/>
            <div style={{ width: '18%' }}>{(schedule[0] && `${schedule[0].split('-')[0]}`)}</div>
            <div style={{ width: '18%' }}>{(schedule[1] && `${schedule[1].split('-')[0]}`)}</div>
            <div style={{ width: '18%' }}>{(schedule[2] && `${schedule[2].split('-')[0]}`)}</div>
            <div style={{ width: '18%' }}>{(schedule[3] && `${schedule[3].split('-')[0]}`)}</div>
            <div style={{ width: '18%' }}>{(schedule[4] && `${schedule[4].split('-')[0]}`)}</div>
          </div>
          <div className="objectExtraItem">
            <div style={{ width: '5%' }}/>
            <div style={{ width: '18%' }}>{(schedule[0] && `${schedule[0].split('-')[1]}`)}</div>
            <div style={{ width: '18%' }}>{(schedule[1] && `${schedule[1].split('-')[1]}`)}</div>
            <div style={{ width: '18%' }}>{(schedule[2] && `${schedule[2].split('-')[1]}`)}</div>
            <div style={{ width: '18%' }}>{(schedule[3] && `${schedule[3].split('-')[1]}`)}</div>
            <div style={{ width: '18%' }}>{(schedule[4] && `${schedule[4].split('-')[1]}`)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

class ClubsPage extends React.Component {
  render(){
    if(!this.props.clubs) this.props.LoadActivities('clubs')
    if(this.props.clubs){
      let rows
      if(this.props.clubs.length == 0) rows = 0
      else if(this.props.clubs.length == 1 || this.props.clubs.length == 2) rows = 1
      else if(this.props.clubs.length >= 3 && this.props.clubs.length <= 6) rows = 2
      else rows = 3
      let cols = Math.ceil(this.props.clubs.length / rows)

      return (
        <div style={{ height: '100%' }}>
          {
            rows > 0 && <div style={{ height: `${100/rows}%`, display: 'flex', flexWrap: 'wrap' }}>
            {
              this.props.clubs
              .sort((a, b) => (a.ids.length < b.ids.length) ? 1 : (a.ids.length > b.ids.length) ? -1 : 0)
              .map(club =>
                <ClubItem club={club} key={club._id.$oid} RemoveActivity={this.props.RemoveActivity} editActivities={this.props.editActivities} size={100/cols}/>
              )
            }
            </div>
          }
        </div>
      )
    }

    else return null
  }
}

export default connect(
  state => {
    return {
      [state.contentType]: state.content,
      editActivities: state.role.editActivities
    }
  }, { ...contentActions, ...modalActions })(ClubsPage)
