import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import * as contentActions from '../../Redux/Actions/index'
import * as modalActions from '../../Redux/Actions/Club'

import { getDate } from '../../Convert'

import DeleteForever from 'material-ui/svg-icons/action/delete-forever'

const TourItem = ({ tour, RemoveActivity, editActivities, size }) => {
  return (
    <div className='objectContainer objectTransition' style={{ width: `${size}%` }}>
      <div className="objectNumber" onClick={() => { browserHistory.push('/tours/' + tour.title) }}>{tour.ids.length}</div>
      <div className='objectImage' onClick={() => { browserHistory.push('/tours/' + tour.title) }} style={{
          background: `url(${tour.file_url})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}/>
      <div className="objectTextArea">
        <div className="objectHeader">
            <div style={{ width: '30%' }}>{tour.title} </div>
            <div style={{ width: '60%' }}/>
            {
              editActivities && <div style={{ width: '10%' }}><DeleteForever onClick={() => {
                RemoveActivity('tours', tour._id)
              }} className="objectButton" style={{ color: 'white', width: '30px', height: '30px' }}/> </div>
            }
        </div>
        <div className="objectExtra">
          <hr style={{ borderTopWidth: '3px' }}/>
          <div className="objectExtraItem">
            <div style={{ width: '35%' }}>{getDate(tour.runtime)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

class ToursPage extends React.Component {
  render(){
    if(!this.props.tours) this.props.LoadActivities('tours')
    if(this.props.tours){
      const tours = this.props.tours.filter(tour => !tour.price)
      let rows
      if(tours.length == 0) rows = 0
      else if(tours.length == 1 || tours.length == 2) rows = 1
      else if(tours.length >= 3 && tours.length <= 6) rows = 2
      else rows = 3
      let cols = Math.ceil(tours.length / rows)
      return (
        <div style={{ height: '100%' }}>
          {
            rows > 0 && <div style={{ height: `${100/rows}%`, display: 'flex', flexWrap: 'wrap' }}>
            {
              tours
              .filter(tour => !tour.price)
              .sort((a, b) => (a.ids.length < b.ids.length) ? 1 : (a.ids.length > b.ids.length) ? -1 : 0)
              .map(tour =>
                <TourItem tour={tour} key={tour._id.$oid} RemoveActivity={this.props.RemoveActivity} editActivities={this.props.editActivities} size={100/cols}/>
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
  }, { ...contentActions, ...modalActions })(ToursPage)
