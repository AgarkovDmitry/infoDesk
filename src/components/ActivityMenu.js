import React from 'react'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'

import { browserHistory } from 'react-router'
import { getMenu } from '../Api'

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      openMenu: false,
      acts: []
    }

    this.handleOpenMenu = this.handleOpenMenu.bind(this)
    this.handleOnRequestChange = this.handleOnRequestChange.bind(this)
  }
  handleClick(url){
    browserHistory.push(url)
    this.setState({ openMenu: false, acts: [] })
  }

  handleOpenMenu(){
    let url = this.props.url

    let setActivities = (activities) => {
      return new Promise(() => {
        let acts = []

        for(let key in activities){
          acts.push(
            <MenuItem
              key = {activities[key]._id.$oid}
              value={activities[key].title}
              primaryText={activities[key].title}
              secondaryText={activities[key].ids.length}
              onClick={
                this.handleClick.bind(this, '/' + url + '/' + activities[key].title)
              }
            />
          )
        }
        this.setState({ openMenu: true, acts: acts })
      })
    }

    getMenu(url)
    .then( res => res.json())
    .then( activities => setActivities(activities) )
  }

  handleOnRequestChange(){
    this.setState({ openMenu: false, acts: [] })
  }

  render() {
    return (
        <IconMenu
            iconButtonElement={<IconButton tooltip={this.props.label} touch={true} tooltipPosition="bottom-center"><NavigationExpandMoreIcon /></IconButton>}
            open={this.state.openMenu}
            onTouchTap={this.handleOpenMenu}
            onRequestChange={this.handleOnRequestChange}
          >
            {this.state.acts}
          </IconMenu>

    )
  }
}
