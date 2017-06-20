import React from 'react'

import TextField from 'material-ui/TextField'

const WarningData = ({ mes, update }) => (
  <div>
    <div className='row'>
      <div className='col-md-12'>
        <TextField
          floatingLabelText={'Warning'}
          defaultValue={mes.warning}
          multiLine={true}
          rows={4}
          fullWidth={true}
          onChange = {(event, value)=>{update('warning', value, () => true, '')}}
        />
      </div>
    </div>
  </div>
)

export default WarningData
