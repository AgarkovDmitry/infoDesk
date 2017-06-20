import './assets/stylesheets/css.css'

import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRedirect, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'

import AdminPage from './components/Pages/AdminPage'
import ClubPage from './components/Pages/Club'
import TourPage from './components/Pages/TourPage'
import ClubsPage from './components/Pages/Clubs'
import ToursPage from './components/Pages/Tours'
import ExtrasPage from './components/Pages/Extras'
import Wrapper from './components/Pages/Wrapper'
import Home from './components/Pages/Home'
import store from './Redux/Store'

render(
    <Provider store = {store} >
      <Router history={browserHistory}>
        <Route path='/' component={Wrapper} >
          <IndexRedirect to='home' />
          <Route path='home' component={Home} />
          <Route path='clubs'>
            <IndexRoute component={ClubsPage}/>
            <Route path=':title' component={ClubPage} />
          </Route>
          <Route path='tours'>
            <IndexRoute component={ToursPage}/>
            <Route path=':title' component={TourPage} />
          </Route>
          <Route path='extras'>
            <IndexRoute component={ExtrasPage}/>
            <Route path=':title' component={ClubPage} />
          </Route>
          <Route path='admin' component={AdminPage} />
        </Route>
      </Router>
    </Provider>,
  document.getElementById('Main')
)
