import React from 'react'

export default class PageController extends React.Component {
  shouldComponentUpdate(next){
    if(next.location.pathname == this.props.location.pathname)
      return false
    return true
  }

  render(){
    return(
      <div className="container-fluid">
        {this.props.children}
      </div>
    )
  }
}
