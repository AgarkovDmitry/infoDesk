import React from 'react'

import TimePicker from 'material-ui/TimePicker'

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

const ClubData = ({ mes, errs, update }) => (
  <div>
    {
      [0,1,2,3,4].map(function(item){
        return (
          <div key={item}>
            <div className = 'row'>
              <div className = 'col-md-1'/>
              <div className = 'col-md-2' style={{ paddingTop: '35px' }}>
                {days[item]}
              </div>
              <div className = 'col-md-4'>
                <TimePicker
                  textFieldStyle={{ width: 'auto' }}
                  floatingLabelText={'From'}
                  errorText={ errs.schedule[item].Start }
                  format='24hr'
                  defaultTime={
                    (mes.schedule[item].Start != undefined) ?
                      new Date('01-01-1970 ' + mes.schedule[item].Start):
                      undefined
                  }
                  onChange = {(event, value)=>{
                    let hour = value.getHours()
                      if(hour < 10) hour = '0' + hour

                    let min = value.getMinutes()
                      if(min < 10) min = '0' + min

                    update(item, 'Start', hour + ':' + min)
                  }}
                />
              </div>
              <div className = 'col-md-4'>
                <TimePicker
                  textFieldStyle={{ width: 'auto' }}
                  floatingLabelText={'To'}
                  errorText={ errs.schedule[item].End }
                  format='24hr'
                  defaultTime={
                    (mes.schedule[item].End) ?
                      new Date('01-01-1970 ' + mes.schedule[item].End):
                      undefined
                  }
                  onChange = {(event, value)=>{
                    let hour = value.getHours()
                      if(hour < 10) hour = '0' + hour

                    let min = value.getMinutes()
                      if(min < 10) min = '0' + min

                    update(item, 'End', hour + ':' + min)
                  }}
                />
              </div>
            </div>
          </div>
        )
      })
    }
  </div>
)

export default ClubData
