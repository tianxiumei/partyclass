import { combineReducers } from 'redux'
import home from './todos'

const todoApp = combineReducers({
  home,
})

export default todoApp