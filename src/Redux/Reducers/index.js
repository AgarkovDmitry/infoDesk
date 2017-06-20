import { combineReducers } from 'redux'
import role from './roleReducer'
import user from './userReducer'
import contentType from './typeReducer'
import content from './contentReducer'
import loginModal from './loginReducer'
import ClubModal from './ClubModal'
import TourModal from './TourModal'
import UserModal from './UserModal'
import Filter from './Filter'
import Navigation from './Navigation'

export default combineReducers({
  contentType,
  content,
  role,
  user,
  loginModal,
  ClubModal,
  TourModal,
  UserModal,
  Filter,
  Navigation
})
