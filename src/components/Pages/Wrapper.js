import React from 'react'
import Anime from 'react-anime'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import * as contentActions from '../../Redux/Actions/index'
import * as clubActions from '../../Redux/Actions/Club'
import * as tourActions from '../../Redux/Actions/Tour'
import * as authActions from '../../Redux/Actions/Auth'
import * as navActions from '../../Redux/Actions/Navigation'

import AddCircle from 'material-ui/svg-icons/content/add-circle'
import FingerPrint from 'material-ui/svg-icons/action/fingerprint'
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import KeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up'
import KeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left'

import LoginDialog from '../Dialogs/LoginDialog'
import ClubDialog from '../Dialogs/ClubDialog'
import TourDialog from '../Dialogs/TourDialog'

class Wrapper extends React.Component {
  parentPage(){ browserHistory.push(this.props.nav.parentPage) }

  prevPage(){ if(this.props.nav.prevPage) browserHistory.push(this.props.nav.prevPage) }

  nextPage(){ if(this.props.nav.nextPage) browserHistory.push(this.props.nav.nextPage) }

  shouldComponentUpdate(nextProps) {
    const navChange = (
      this.props.nav.prevPage != nextProps.nav.prevPage ||
      this.props.nav.nextPage != nextProps.nav.nextPage ||
      this.props.nav.addClub != nextProps.nav.addClub ||
      this.props.nav.addTour != nextProps.nav.addTour ||
      this.props.nav.parentPage != nextProps.nav.parentPage
    )

    let userChange = false
    if(this.props.user._id && !nextProps.user._id || !this.props.user._id && nextProps.user._id) userChange = true
    else if(this.props.user._id && nextProps.user._id){
      if(this.props.user._id.$oid != nextProps.user._id.$oid) userChange = true
    }

    return navChange || userChange
  }

  componentWillMount() {
    this.props.setLocations(this.props.location.pathname, this.props.role)
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.location.pathname != nextProps.location.pathname)
      this.props.setLocations(nextProps.location.pathname, this.props.role)
  }

  render(){
    const nav = this.props.nav
    return (
      <div style={{ height: window.innerHeight }}
        onWheel={ e => {
          if(e.deltaY == -100) this.prevPage()
          else if(e.deltaY == 100) this.nextPage()
        }}
      >
        { nav.addClub && <button onClick={() => this.props.openClubModal() }  className='navButtonAdd'> <AddCircle style={{ color: 'orange', width: '48px', height: '48px' }}/> </button> }
        { nav.addTour && <button onClick={() => this.props.openTourModal() }  className='navButtonAdd'> <AddCircle style={{ color: 'orange', width: '48px', height: '48px' }}/> </button> }
        <Anime
          easing="easeInSine"
          opacity={[0, 1]}
          duration={300}
          loop={false}
        >
          <div style={{ height: '100%' }}> {this.props.children} </div>
        </Anime>
        {
          !this.props.user._id ?
            <button onClick={() => this.props.openLoginModal() }  className='navButtonLogin'> <FingerPrint style={{ color: 'orange', width: '48px', height: '48px' }}/> </button> :
            <button onClick={() => this.props.LogOut() }  className='navButtonLogin'> <KeyboardArrowDown style={{ color: 'white', width: '48px', height: '48px' }}/> </button>
        }
        {
          nav.parentPage && <Anime
            easing="easeInSine"
            opacity={[0, 1]}
            translateX={[10, 0]}
            direction="alternate"
            duration={1000}
            loop={true}
          >
            <button onClick={() => this.parentPage() }  className='navButtonLeft'> <KeyboardArrowLeft style={{ color: 'white', width: '72px', height: '72px' }}/> </button>
          </Anime>
        }
        {
          nav.prevPage && <Anime
            easing="easeInSine"
            opacity={[0, 1]}
            translateY={[10, 0]}
            direction="alternate"
            duration={1000}
            loop={true}
          >
            <button onClick={() => this.prevPage() }  className='navButtonUp'> <KeyboardArrowUp style={{ color: 'orange', width: '72px', height: '72px' }}/> </button>
          </Anime>
        }
        {
          nav.nextPage &&
          <Anime
            easing="easeInSine"
            opacity={[0, 1]}
            translateY={[-10, 0]}
            direction="alternate"
            duration={1000}
            loop={true}
          >
            <button onClick={() => this.nextPage() } className='navButtonDown'> <KeyboardArrowDown style={{ color: 'orange', width: '72px', height: '72px' }}/> </button>
          </Anime>

        }
        <LoginDialog/>
        <ClubDialog/>
        <TourDialog/>
      </div>
    )
  }

}


export default connect(
  state => {
    return {
      nav: state.Navigation,
      user: state.user,
      [state.contentType]: state.content,
      role: state.role,
    }
  },  { ...contentActions, ...authActions, ...navActions, ...clubActions, ...tourActions })(Wrapper)
