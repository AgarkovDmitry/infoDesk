import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import * as contentActions from '../../Redux/Actions/index'
import * as modalActions from '../../Redux/Actions/Club'

import { getDate } from '../../Convert'

import DeleteForever from 'material-ui/svg-icons/action/delete-forever'

const ExtraItem = ({ extra, RemoveActivity, editActivities, size }) => {
  return (
    <div className='objectContainer objectTransition' style={{ width: `${size}%` }}>
      <div className="objectNumber" onClick={() => { browserHistory.push('/tours/' + extra.title) }}>{extra.ids.length}</div>
      <div className='objectImage' onClick={() => { browserHistory.push('/tours/' + extra.title) }} style={{
          background: `url(${extra.file_url})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}/>
      <div className="objectTextArea">
        <div className="objectHeader">
            <div style={{ width: '30%' }}>{extra.title} </div>
            <div style={{ width: '60%' }}/>
            {
              editActivities && <div style={{ width: '10%' }}><DeleteForever onClick={() => {
                RemoveActivity('tours', extra._id)
              }} className="objectButton" style={{ color: 'white', width: '30px', height: '30px' }}/> </div>
            }
        </div>
        <div className="objectExtra">
          <hr style={{ borderTopWidth: '3px' }}/>
          <div className="objectExtraItem">
            <div style={{ width: '35%' }}>{getDate(extra.runtime)}</div>
            <div style={{ width: '18%' }}>{`${extra.price}$`}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

class ExtrasPage extends React.Component {
  render(){
    if(!this.props.tours) this.props.LoadActivities('tours')
    if(this.props.tours){
      const extras = this.props.tours.filter(tour => tour.price)
      let rows
      if(extras.length == 0) rows = 0
      else if(extras.length == 1 || extras.length == 2) rows = 1
      else if(extras.length >= 3 && extras.length <= 6) rows = 2
      else rows = 3
      let cols = Math.ceil(extras.length / rows)

      return (
        <div style={{ height: '100%' }}>
          {
            rows > 0 && <div style={{ height: `${100/rows}%`, display: 'flex', flexWrap: 'wrap' }}>
            {
              extras
              .filter(tour => tour.price)
              .sort((a, b) => (a.ids.length < b.ids.length) ? 1 : (a.ids.length > b.ids.length) ? -1 : 0)
              .map(extra =>
                <ExtraItem extra={extra} key={extra._id.$oid} RemoveActivity={this.props.RemoveActivity} editActivities={this.props.editActivities} size={100/cols}/>
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
  }, { ...contentActions, ...modalActions })(ExtrasPage)
